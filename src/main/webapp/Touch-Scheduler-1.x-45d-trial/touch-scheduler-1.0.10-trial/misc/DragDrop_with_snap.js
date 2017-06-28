/**
 *
 * @class Sch.feature.DragDrop
 *
 * A class implementing the event drag drop feature. If enabled on the main scheduler panel, this class will make sure events can be dragged and
 * rescheduled in the schedule.
 */
Ext.define('Sch.feature.DragDrop', {

    requires : [
        'Ext.util.Draggable'
    ],

    /*
     * @cfg {String} direction The allowed drag directions, defaults to 'both'.
     * Possible values: 'vertical', 'horizontal', or 'both'
     * @accessor
     */
    direction: 'both',

    /*
     * @cfg {String} triggerEvent The event that is should trigger a drag drop operation to start.
     * @accessor
     */
    triggerEvent    : 'semilongpress',

    // HACK
    dragging        : false,
    eventsDraggable : null,
    scheduler       : null,

    // 30 percent of the top/bottom will trigger move to new row container for the drag proxy
    snapThreshold   : 0.3,

    constructor: function (config) {
        Ext.apply(this, config);

        var scheduler       = this.scheduler,
            view            = this.view,
            eventSelector   = view.eventSelector,
            me              = this;

        var eventsDraggable = this.eventsDraggable = new Ext.util.Draggable({
            constraint  : null,
            direction   : this.direction,


            // ST chooses another non-working scroll transform for android drag drop, force it to use CSS instead
            translatable: new Ext.util.translatable.CssTransform()
        });

        eventsDraggable.doDrag = function(m, e, offsetX, offsetY) {
            // Make event snap to row area
            var yValueSnapped;
            var view = this.view;
            var startOffset = this.dragStartOffset;
            var ctx = me.dragContext;

            if (ctx) {
                var startNodeRegion = ctx.nodeRegion;
                var startRowRegion = ctx.startRowRegion;
                var nodeCenterY = startNodeRegion.top + Math.round((startNodeRegion.bottom - startNodeRegion.top)/2);

                var rowRegion = me.getRowPositionFromPoint(0, nodeCenterY + offsetY);

                var val = m.setOffset(offsetX, rowRegion.top - startRowRegion.top, {
                    duration : 500
                });
                m.setOffset = Ext.emptyFn;

                return val;
            }

            return Ext.util.Draggable.prototype.doDrag.apply(this, arguments);
        };

        eventsDraggable.on({
            dragend     : this.onDragEnd,
            drag        : this.onDrag,
            scope       : this
        });

        eventsDraggable.container = scheduler.getSchedulingView().getEl();
        
        scheduler.on('dragstart', function(body, event) {
            if (!scheduler.isReadOnly()  && this.dragging) {
                event.stopPropagation();
            }
        }, this);

        scheduler.element.on(this.triggerEvent, this.onLongPress, this, { delegate : eventSelector });
        
        this.callParent(arguments);
    },

    onLongPress : function (event, target) {
        var view = this.view;
        var eventNode   = event.delegatedTarget;
        var scheduler = this.scheduler;
        var eventRecord = view.resolveEventRecord(event.delegatedTarget);
        var resource = eventRecord.getResource();
        var scroller = scheduler.getScheduleScroller();

        delete Ext.Element.cache[ eventNode.id ];

        if (scroller.isDragging || scheduler.isReadOnly() || scheduler.fireEvent('beforeeventdrag', scheduler, eventRecord, event) === false) {
            return;
        }

        if (!eventRecord.isDraggable()) {
            view.highlightElement(eventNode);
            return;
        }

        this.dragging = true;

        // Prevent bubbling to reach view scroller.
        event.stopPropagation();

        var eventsDraggable = this.eventsDraggable;
        var nodeEl = Ext.get(eventNode);
        var viewEl = this.scheduler.getSchedulingView().getEl();
        var viewOffsets = Ext.fly(eventNode).getOffsetsTo(viewEl);
        var touchXY = [event.touches[0].pageX, event.touches[0].pageY];
        var eventBarXY = nodeEl.getXY();
        var ta = scheduler.timeAxis;

        nodeEl.setTop(viewOffsets[1]);
        nodeEl.setLeft(viewOffsets[0]);
        viewEl.appendChild(nodeEl);

        // To finalize a drag operation if drag never starts after a long press
        nodeEl.on('tap', function(e) {
            eventsDraggable.onDragEnd.apply(eventsDraggable, arguments);
        }, null, { single : true });

        eventsDraggable.setElement(eventNode);
        var translatable    = eventsDraggable.getTranslatable();
        translatable.setElement(eventNode);
        eventsDraggable.setOffset(0, 0);

        // Constrain to scheduling view element
        this.constrainProxy(touchXY, nodeEl);

        this.dragContext = {
            eventRecords : [eventRecord],
            newResource  : resource,
            startDate    : eventRecord.getStartDate(),
            endDate      : eventRecord.getEndDate(),
            duration     : eventRecord.getEndDate() - eventRecord.getStartDate(),
            startsOutsideView : ta.getStart() > eventRecord.getStartDate(),
            endsOutsideView : ta.getEnd() < eventRecord.getEndDate(),
            startXY       : eventBarXY,
            nodeRegion   : nodeEl.getPageBox(true),
            startRowRegion : this.getRowPositionFromPoint(0, eventBarXY[1]),
            touchOffsets : [touchXY[0] - eventBarXY[0], touchXY[1] - eventBarXY[1]]
        };

        scheduler.fireEvent('eventdragstart', scheduler, [eventRecord]);

        eventsDraggable.onDragStart(event);
    },

    constrainProxy : function(touchXY, eventBarEl) {
        var constraint = { min : {}, max : {} };
        var view = this.view;
        var viewEl = view.getEl();
        var viewOffsets = eventBarEl.getOffsetsTo(viewEl);

        constraint.min.x = -(touchXY[0] - viewEl.getX()); // -viewOffsets[0];
        constraint.max.x = view.getViewportWidth() - viewOffsets[0]; //Math.max(0, view.getViewportWidth() - viewOffsets[0] - nodeEl.getWidth() - view.eventBorderWidth);

        constraint.min.y = Math.min(0, -viewOffsets[1]);
        constraint.max.y = view.getViewportResourceAreaHeight() - viewOffsets[1] + view.getScroll().top - eventBarEl.getHeight() - view.eventBorderWidth;

        this.eventsDraggable.setConstraint(constraint);
    },

    onDrag : function(draggable, e) {

        // Skip if noone is listening to 'eventdrag' to save some CPU cycles
        if (this.scheduler.hasListener('eventdrag')) {
            var dd = this.dragContext;
            var start = dd.startDate;
            var resource = dd.newResource;

            this.updateDragContext(e);

            if (dd.startDate - start !== 0 || resource !== dd.newResource) {
                this.scheduler.fireEvent('eventdrag', this.scheduler, dd.eventRecords, dd.startDate, dd.newResource, dd);
            }
        }
    },

    updateDragContext : function(e) {
        var dd          = this.dragContext,
            el          = this.eventsDraggable.getElement(),
            view        = this.view,
            node,
            eventY      = el.getY() + el.getHeight()/ 2;

        var resource = view.resolveResourceFromCoordinate(el.getX() + dd.touchOffsets[0], eventY);
        var startEnd = this.resolveStartEndDates(el.getPageBox());

        if (resource && startEnd) {
            dd.newResource = resource;
            dd.startDate = startEnd.startDate;
            dd.endDate = startEnd.endDate;
        }
    },

    onDragEnd : function (body, event) {
        this.updateDragContext(event);

        var scheduler       = this.scheduler,
            translatable    = this.eventsDraggable.getTranslatable(),
            doFinalize      = true,
            dd              = this.dragContext,
            valid           = false;

        this.dragging = false;

        // Make sure the drag operation actually started
        if (!Ext.isNumber(translatable.x) || !Ext.isNumber(translatable.y)) {
            return;
        }

        if (dd.newResource) {
            this.dragContext.finalize = function() { me.finalize.apply(me, arguments); };
            valid = true;
            doFinalize = this.scheduler.fireEvent('beforeeventdropfinalize', this, dd, event) !== false;
        }

        if (doFinalize) {
            this.finalize(valid);
        }
    },

    finalize : function(updateRecord) {
        var modifiedByDrop;
        var view = this.view;
        var scheduler = this.scheduler;
        var context = this.dragContext;
        var eventRecord = context.eventRecords[0];

        if (updateRecord) {
            var oldStart = eventRecord.getStartDate();
            var oldEnd = eventRecord.getEndDate();
            var oldResource = eventRecord.getResource();

            eventRecord.beginEdit();
            eventRecord.setStartDate(context.startDate);
            eventRecord.setEndDate(context.endDate);
            eventRecord.setResourceId(context.newResource.getId());
            eventRecord.endEdit();

            modifiedByDrop = oldStart - eventRecord.getStartDate() !== 0 ||
                             oldEnd - eventRecord.getEndDate() !== 0 ||
                             oldResource !== eventRecord.getResource();
        }

        // Force manual resource update if event was not modified by the drop action
        if (!modifiedByDrop) {
            view.repaintEventsForResource(eventRecord.getResource());
        }
        Ext.destroy(this.eventsDraggable.getElement());

        scheduler.fireEvent('aftereventdrop', scheduler, context.eventRecords);

        delete this.dragContext;
    },

    resolveStartEndDates : function(proxyRegion) {
        var dd = this.dragContext,
            startEnd,
            start = dd.startDate,
            end = dd.endDate;

        if (!dd.startsOutsideView && proxyRegion.left >= this.view.getEl().getPageBox().left) {
            start = this.view.getDateFromCoordinate(proxyRegion.left, 'round');
            if (start) {
                end = Sch.util.Date.add(start, Sch.util.Date.MILLI, dd.duration);
            }
        } else if (!dd.endsOutsideView) {
            end = this.view.getDateFromCoordinate(proxyRegion.right, 'round');
            if (end) {
                start = Sch.util.Date.add(end, Sch.util.Date.MILLI, -dd.duration);
            }
        }

        return {
            startDate : start,
            endDate : end
        };
    },

    getRowPositionFromPoint : function (x, y) {
        var tabularView = this.scheduler.normalGrid.tabularView;
        var bodyCmp     = this.scheduler.normalGrid.bodyCmp;
        var region      = bodyCmp.element.getPageBox(true)

        if (!region.isOutOfBoundY(y)) {
            var visibleContainers   = tabularView.visibleContainers
            var contentOffset       = y - region.top + tabularView.viewportScrollTop

            // in non-buffered mode we do not maintain offsetTop/offsetBottom attributes of rows, so can't count on them
            // we can only use `getContentScrollTop` of tabular view and row heights
            var currentOffsetTop    = tabularView.getContentScrollTop()

            for (var i = 0; i < visibleContainers.length; i++) {
                var rowHeight       = visibleContainers[ i ].row.height

                if (currentOffsetTop <= contentOffset && contentOffset <= currentOffsetTop + rowHeight) {

                    return {
                        top     : currentOffsetTop - tabularView.getViewportScrollTop() + region.top,
                        height  : rowHeight
                    };
                }

                currentOffsetTop    += rowHeight;
            }
        }

        return null;
    }
});
