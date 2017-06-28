/**
@class Sch.panel.SchedulerGrid
@extends UberGrid.Panel
@mixin Sch.mixin.Selectable
@mixin Sch.mixin.AbstractTimelinePanel
@mixin Sch.mixin.AbstractSchedulerPanel

A scheduler panel based on the {@link UberGrid.Panel} class which allows you to visualize and manage "resources" and their scheduled "events".

Please refer to the <a href="#!/guide/scheduler_getting_started">getting started guide</a> for a detailed introduction.

{@img scheduler/images/scheduler.png}

*/
Ext.define('Sch.panel.SchedulerGrid', {

    extend : 'UberGrid.Panel',

    alias              : 'widget.schedulerpanel',
    alternateClassName : 'Sch.SchedulerPanel',

    mixins : [
        'Sch.mixin.Selectable',
        'Sch.mixin.AbstractTimelinePanel',
        'Sch.mixin.AbstractSchedulerPanel'
    ],

    requires : [
        'Sch.feature.DragDrop',
        'Sch.feature.EventPinch',
        'Sch.feature.Create',
        'Sch.feature.PullRefresh',
        'Sch.feature.SchedulePinch',
        'Sch.recognizer.SemiLongPress',
        'Sch.model.SchedulingView',
        'Sch.column.HorizontalScheduler',
        'Sch.column.VerticalScheduler',
        'Sch.column.Resource'
    ],

    /**
     * @cfg {Boolean} deselectOnContainerClick
     * When set to true, tapping on the schedule background (i.e. not on
     * an event in the SchedulerView) will deselect any currently selected items.
     * @accessor
     */
    deselectOnContainerClick : true,

    /**
     * @cfg {Boolean} compactMode
     * True to show a compact version of the Scheduler without the left grid. This mode is more suitable for phones
     * with a small display.
     */
    compactMode : Ext.os.deviceType === 'Phone',

    /**
     * @cfg {Boolean} singleHeaderRow
     * True to only show one header row, enabled by default for phone devices
     */
    singleHeaderRow : true,

    /**
     * @cfg {Boolean} enableEventDragDrop
     * Controls if dragging and dropping events should be enabled, defaults to true.
     */
    enableEventDragDrop : true,

    /**
     * @cfg {Object} eventDragDropConfig
     * A custom config object used to configure the {@link Sch.feature.DragDrop DragDrop} behavior.
     */
    eventDragDropConfig : null,

    /**
     * @cfg {Boolean} enableEventPinch
     * Controls if pinching events (resizing) should be enabled, defaults to true.
     */
    enableEventPinch : true,

    /**
     * @cfg {Object} eventPinchConfig
     * A custom config object used to configure the {@link Sch.feature.EventPinch EventPinch} behavior.
     */
    eventPinchConfig : null,

    /**
     * @cfg {Boolean} enableEventCreate
     * Controls if creating events by long pressing should be enabled, defaults to true.
     */
    enableEventCreate : true,

    /**
     * @cfg {Object} eventCreateConfig
     * A custom config object used to configure the {@link Sch.feature.EventCreate EventCreate} behavior.
     */
    eventCreateConfig : null,

    /**
     * @cfg {Boolean} enableSidePull
     * Controls if pulling the schedule edges should traverse the time axis. Defaults to true.
     */
    enableSidePull : true,

    /**
     * @cfg {Object} leftSidePullConfig
     * A custom config object used to configure the left side {@link Sch.feature.PullRefresh PullRefresh} behavior.
     */
    leftSidePullConfig : null,

    /**
     * @cfg {Object} rightSidePullConfig
     * A custom config object used to configure the right side {@link Sch.feature.PullRefresh PullRefresh} behavior.
     */
    rightSidePullConfig : null,

    /**
     * @cfg {String/Boolean} enableSchedulePinch
     * Controls if pinching the schedule should enabled, possible values are ('horizontal', 'vertical', true, and false). Defaults to true.
     */
    enableSchedulePinch : true,

    /**
     * @cfg {Object} schedulePinchConfig
     * A custom config object used to configure the {@link Sch.feature.SchedulePinch SchedulePinch} behavior.
     */
    schedulePinchConfig : null,

    /**
     * @cfg {Int} minRowHeight
     * The minimum row height for the scheduler
     */
    minRowHeight              : 10,

    // Below this threshold, make font smaller
    compactRowHeightThreshold : 30,

    rowHeight           : 50,
    barMargin           : 0,

    resourceStore       : null,
    eventStore          : null,
    readOnly            : false,
    eventBodyTemplate   : null,
    eventRenderer       : null,

    onEventCreated      : null,
    timeCellRenderer    : null,
    eventBarTextField   : null,

    // internal properties
    timeAxis            : null,
    schedulingView      : null,
    timeAxisViewModel   : null,

    timeAxisColumn      : null,

    suspendRefresh      : 0,


    initialize : function () {
        this.addEvents(
            // Scheduled events: click events --------------------------

            /**
             * @event eventtap
             * Fires when an event is tapped
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} eventRecord The event record of the tapped event
             * @param {Ext.EventObject} e The event object
             */
            'eventtap',

            /**
             * @event eventsingletap
             * Fires when an event is single tapped
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} eventRecord The event record of the tapped event
             * @param {Ext.EventObject} e The event object
             */
            'eventsingletap',

            /**
             * @event eventdoubletap
             * Fires when an event is double tapped
             * @param {Sch.panel.SchedulerGrid} view The scheduler panel instance
             * @param {Sch.model.Event} eventRecord The event record of the tapped event
             * @param {Ext.EventObject} e The event object
             */
            'eventdoubletap',

            // Resizing events start --------------------------

            /**
             * @event beforeeventresize
             * Fires before a pinch operation starts, return false to stop the execution
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} record The record about to be resized
             * @param {Ext.EventObject} e The event object
             */
            'beforeeventresize',

            /**
             * @event eventpinchstart
             * Fires when a pinch action starts
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} record The event record
             */
            'eventresizestart',

            /**
             * @event beforeeventresizefinalize
             * Fires before a succesful resize operation is finalized. Return false from a listener function to prevent the finalizing to
             * be done immediately, giving you a chance to show a confirmation popup before applying the new values.
             * To finalize the operation, call the 'finalize' method available on the context object.
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Object} resizeContext An object containing, 'start', 'end', 'eventRecord' properties.
             * @param {Ext.EventObject} e The event object
             */
            'beforeeventresizefinalize',

            /**
             * @event eventresizeend
             * Fires after a succesful resize operation
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} record The event record
             */
            'eventresizeend',
            // Resizing events end --------------------------

            // Drag drop events start --------------------------
            /**
             * @event beforeeventdrag
             * Fires before a dnd operation is initiated, return false to cancel it
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event} record The record corresponding to the node that's about to be dragged
             * @param {Ext.EventObject} e The event object
             */
            'beforeeventdrag',

            /**
             * @event eventdragstart
             * Fires when a dnd operation starts
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Array} records the records being dragged
             */
            'eventdragstart',


            /**
             * @event beforeeventdropfinalize
             * Fires before a succesful drop operation is finalized. If you return false from a listener of this event, you
             * must call the 'finalize' method found on the dragContext argument to finalize the drag drop operation. This way you
             * can show a confirmation dialog prior to completing the drag-drop operation.
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Object} dragContext An object containing 'eventRecord', 'start', 'end', 'newResource', 'finalize' properties.
             * @param {Ext.EventObject} e The event object
             */
            'beforeeventdropfinalize',

            /**
             * @event eventdrop
             * Fires after a succesful drag and drop operation
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event[]} records The dropped records
             */
            'eventdrop',

            /**
             * @event aftereventdrop
             * Always fires after a drag and drop operation, even when if the drop was deemed invalid.
             * @param {Sch.panel.SchedulerGrid} panel The scheduler panel instance
             * @param {Sch.model.Event[]} records The dropped records
             */
            'aftereventdrop',
            // Drag drop events end --------------------------

            /**
             * @event timeheadertap
             * Fires after a tap on a time header cell
             * @param {Sch.panel.SchedulerGrid} column The scheduler instance
             * @param {Date} startDate The start date of the header cell
             * @param {Date} endDate The start date of the header cell
             * @param {Ext.EventObject} e The event object
             */
            'timeheadertap',

            /**
             * @event timeheaderdoubletap
             * Fires after a double tap on a time header cell
             * @param {Sch.panel.SchedulerGrid} column The scheduler instance
             * @param {Date} startDate The start date of the header cell
             * @param {Date} endDate The start date of the header cell
             * @param {Ext.EventObject} e The event object
             */
            'timeheaderdoubletap'

        );

        if (Sch.recognizer && Sch.recognizer.SemiLongPress) {
            var touchPublisher = Ext.event.Dispatcher.getInstance().getPublishers().touchGesture;
            var found = false;

            touchPublisher.getActiveRecognizers().forEach(function (rec) {
                if (rec instanceof Sch.recognizer.SemiLongPress) {
                    found = true;
                    return false;
                }
            });

            if (!found) {
                touchPublisher.registerRecognizer(new Sch.recognizer.SemiLongPress());
            }
        }

        var me = this,
            config = this.config;

        // was known as Ext.apply(this, config) previously
        for (var name in config) {
            if (config.hasOwnProperty(name) && name !== 'xtype' && name !== 'xclass' && !this.hasConfig(name)) {
                this[ name ] = config[ name ];

                // HACK we need to remove these configs to avoid them being re-applied in the superclass init method
                delete config[name];
            }
        }

        this.columns = this.columns || [];

        this.columns.forEach(function (col) {
            col.locked = true;
        });

        if (this.compactMode && this.getOrientation() === 'horizontal') {
            this.applyCompactSettings();
        }

        var viewPreset = Sch.preset.Manager.getPreset(me.viewPreset);

        if (!viewPreset) throw "Invalid `viewPreset` configuration option";

        me._initializeTimelinePanel();
        me._initializeSchedulerPanel();

        me.schedulingView = new Sch.model.SchedulingView(Ext.apply({
            eventStore        : me.eventStore,
            resourceStore     : me.resourceStore,
            timeAxis          : me.timeAxis,
            timeAxisViewModel : me.timeAxisViewModel,
            mode              : me.getMode(),
            rowHeight         : me.rowHeight,

            panel               : me,

            barMargin         : me.barMargin,
            eventBodyTemplate : me.eventBodyTemplate,
            eventRenderer     : me.eventRenderer,
            timeCellRenderer  : me.timeCellRenderer,
            eventBarTextField : me.eventBarTextField || me.eventStore.getModel().prototype.nameField,

            onEventCreated : me.onEventCreated || Ext.emptyFn,

            readOnly : me.readOnly
        }, this.viewConfig || {}));

        if (this.getOrientation() === 'horizontal') {
            this.setupHorizontal();
        } else {
            this.setupVertical();
        }

        this.registerRenderer(me.schedulingView.columnRenderer, me.schedulingView);

        if (!me.columns) {
            throw 'Must specify a columns array for the Scheduler panel';
        }

        me.callParent(arguments);

        if (this.resourceZones) {
            var resourceZoneStore = Ext.StoreManager.lookup(this.resourceZones);
            resourceZoneStore.setResourceStore(this.resourceStore);

            this.resourceZonesPlug = new Sch.plugin.ResourceZones(Ext.apply({
                store : resourceZoneStore
            }, this.resourceZonesConfig));

            this.resourceZonesPlug.init(this);
        }

        me.setupFeatures();

        me.setupCssClasses();

        me.setupListeners();

        me.mixins.sch_selectable.constructor.apply(me, arguments);
        me.mixins.sch_selectable.updateStore.call(me, me.eventStore);

        me.switchViewPreset(me.viewPreset, me.startDate, me.endDate, true);

        this.getSchedulingView().on('refresh', this.onSchedulingViewRefresh, this);
    },


    onFirstPainted : function () {
        var normalGridEl    = this.normalGrid.headerCmp.element;
        var availableSpace  = this.getOrientation() === 'horizontal' ? normalGridEl.getWidth() : this.normalGrid.bodyCmp.element.getHeight();

        // For compat with Ext JS codebase
        this.getSchedulingView().viewReady = true;

        this.suspendRefresh++;

        this.timeAxisViewModel.setAvailableWidth(availableSpace)

        this.suspendRefresh--;

        this.callParent()
    },


    refresh : function () {
        if (this.suspendRefresh) return;

        this.callParent(arguments);
    },


    applyCompactSettings : function () {
        var compactConfigs = this.getCompactModeSettings();

        Ext.apply(this, compactConfigs);
        Ext.apply(this.config, compactConfigs);

        this.addCls('sch-timelinepanel-compact');

        if (this.singleHeaderRow) {
            this.addCls('sch-timelinepanel-oneheader');
        }
    },

    getCompactModeSettings : function () {
        return {
            headerHeight : Math.floor(this.headerHeight / 2),
            rowHeight    : 30,
            barMargin    : 5,

            // Locked section should be minimized, TODO remove it completely?
            lockedWidth  : 1,
            columns      : [
                {
                    locked : true,
                    width  : 1
                }
            ],

            timeCellRenderer : function (meta, record) {
                meta.cellAttr = { resourcename : record.data.Name || '' };
            }
        };
    },

    setupFeatures : function () {
        var isHorizontal = this.getOrientation() === 'horizontal';

        if (this.columnLines) {
            this.columnLinesFeature = new Sch.feature.ColumnLines();
            this.columnLinesFeature.init(this);
        }

        if (this.enableEventDragDrop) {
            this.dragDrop = new Sch.feature.DragDrop(Ext.apply({
                scheduler     : this,
                view          : this.getSchedulingView(),
                eventSelector : this.getSchedulingView().eventSelector
            }, this.eventDragDropConfig));
        }

        if (this.enableEventPinch) {
            this.eventPinch = new Sch.feature.EventPinch(Ext.apply({
                scheduler : this
            }, this.eventPinchConfig));
        }

        if (this.enableEventCreate) {
            this.eventCreate = new Sch.feature.Create(Ext.apply({
                scheduler : this
            }, this.eventCreateConfig));
        }

        if (this.enableSidePull) {
            this.leftPull = new Sch.feature.PullRefresh(Ext.apply({
                scheduler    : this,

                shiftSteps   : [
                    { amount : -1 },
                    { amount : -3 },
                    { amount : -7 }
                ],
                side         : isHorizontal ? 'left' : 'top',
                handler      : this.timeAxis.shift,
                scope        : this.timeAxis,
                timeAxis     : this.timeAxis
            }, this.leftSidePullConfig));

            this.rightPull = new Sch.feature.PullRefresh(Ext.apply({
                scheduler    : this,
                shiftSteps   : [
                    { amount : 1 },
                    { amount : 3 },
                    { amount : 7 }
                ],
                side         : isHorizontal ? 'right' : 'bottom',
                handler      : this.timeAxis.shift,
                scope        : this.timeAxis,
                timeAxis     : this.timeAxis
            }, this.rightSidePullConfig));
        }

        if (this.enableSchedulePinch !== false) {
            this.schedulePinch = new Sch.feature.SchedulePinch(Ext.apply({
                enableHorizontal : !this.forceFit && (this.enableSchedulePinch === true || this.enableSchedulePinch === 'horizontal'),
                enableVertical   : this.enableSchedulePinch === true || this.enableSchedulePinch === 'vertical',
                scheduler        : this
            }, this.schedulePinchConfig));
        }
    },

    setupCssClasses : function () {
        this.addCls('sch-schedulerpanel');

        this.normalGrid.bodyCmp.addCls(['sch-timelineview', 'sch-schedulerview']);
    },

    setupListeners : function () {
        var view = this.getSchedulingView();

        this.normalGrid.bodyCmp.element.on({
            tap : function (e) {
                var rec = view.getEventRecordFromDomId(e.delegatedTarget.id);
                this.selectWithEvent(rec);
                this.fireEvent('eventtap', this, rec, e.delegatedTarget, e);
            },

            singletap  : this.eventBarEventHandler('singletap'),
            doubletap  : this.eventBarEventHandler('doubletap'),
            pinchstart : this.eventBarEventHandler('pinchstart'),
            pinchend   : this.eventBarEventHandler('pinchend'),

            swipe : function (e) {
                delete Ext.Element.cache[ e.delegatedTarget.id ]
                var rec = view.getEventRecordFromDomId(e.delegatedTarget.id);
                this.fireEvent('eventswipe', this, rec, e.direction, e.delegatedTarget, e);
            },

            delegate : view.eventSelector,
            scope    : this
        });

        // Need to update time axis view model if the size changes
        this.normalGrid.bodyCmp.on({
            resize : function(cmp) {
                this.timeAxisViewModel.setAvailableWidth(cmp.getWidth());
            },

            scope  : this
        });

        this.on({
            celltap       : this.cellEventHandler('tap'),
            celldoubletap : this.cellEventHandler('doubletap'),
            celllongpress : this.cellEventHandler('longpress'),

            scope : this
        });

        this.normalGrid.headerCmp.element.on({
            tap       : this.onHeaderTap,
            doubletap : this.onHeaderDblTap,

            delegate : '.sch-column-header',
            scope    : this
        });

        this.normalGrid.bodyCmp.element.on({
            tap           : this.onContainerTap,
            semilongpress : this.onContainerSemiLongPress,
            scope         : this
        });
    },

    eventBarEventHandler : function (name) {
        var me = this,
            view = me.getSchedulingView();

        return function (e, target) {
            delete Ext.Element.cache[ e.delegatedTarget.id ]
            var record = view.getEventRecordFromDomId(e.delegatedTarget.id);
            me.fireEvent('event' + name, me, record, e.delegatedTarget, e);
        };
    },

    cellEventHandler : function (name) {
        var view = this.getSchedulingView(),
            timeCellSelector = view.timeCellSelector;

        return function (sched, record, rowIndex, cellIndex, globalIndex, column, simpleGrid, e) {
            if (e.getTarget(timeCellSelector, 1)) {
                var date = view.getDateFromDomEvent(e);
                this.fireEvent('schedule' + name, sched, record, date, e);
            }
        };
    },

    getSchedulingView : function () {
        return this.schedulingView;
    },

    /* SELECTION MODEL */

    // apply to the selection model to maintain visual UI cues
    onContainerTap    : function (e) {
        var me = this;

        if (!e.target) return;

        if (e.getTarget('.sch-event')) {
            return;
        }

        if (me.deselectOnContainerClick) {
            me.deselectAll();
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect      : function (record, suppressEvent) {
        var me = this;
        if (suppressEvent) {
            me.doItemSelect(me, record);
        } else {
            me.fireAction('select', [me, record], 'doItemSelect');
        }
    },

    // invoked by the selection model to maintain visual UI cues
    doItemSelect      : function (me, record) {
        if (!me.isDestroyed) {
            var node = me.getSchedulingView().getEventNodeByRecord(record);

            if (node) {
                Ext.fly(node).addCls(me.getSchedulingView().selectedEventCls);
            }
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect    : function (record, suppressEvent) {
        var me = this;
        if (!me.isDestroyed) {
            if (suppressEvent) {
                me.doItemDeselect(me, record);
            }
            else {
                me.fireAction('deselect', [me, record, suppressEvent], 'doItemDeselect');
            }
        }
    },

    doItemDeselect : function (me, record) {
        var item = me.getSchedulingView().getEventNodeByRecord(record);

        if (item) {
            Ext.fly(item).removeCls(me.getSchedulingView().selectedEventCls);
        }
    },

    onSelectionStoreUpdate : function (view, record) {
        // HACK how to deal with the cache
        Ext.Element.cache = {};
        this.refreshSelection();
    },

    /* EOF SelectionModel impl. */

    onContainerSemiLongPress : function (e, t) {
        if (e.getTarget('.sch-timetd', 1)) {
            var view = this.getSchedulingView();
            var date = view.getDateFromDomEvent(e);
            var resource = view.resolveResource(t);
            this.fireEvent('schedulesemilongpress', this, resource, date, e);
        }
    },

    onSchedulingViewRefresh : function () {
        this.refreshSelection();
    },

    getLockedScroller : function () {
        return this.lockedGrid.bodyCmp.getScroller();
    },

    getScheduleScroller : function () {
        return this.normalGrid.bodyCmp.getScroller();
    },

    onHeaderTap : function (event) {
        if (event.getTarget('.sch-column-header')) {
            this.getSchedulingView().scrollVerticallyTo(0);

            this.fireTimeHeaderEvent('tap', event);
        }
    },

    onHeaderDblTap : function (event) {
        if (event.getTarget('.sch-column-header')) {
            this.fireTimeHeaderEvent('doubletap', event);
        }
    },

    fireTimeHeaderEvent : function (eventName, event) {
        var target = event.delegatedTarget;

        var position = Ext.fly(target).getAttribute('headerPosition'),
            index = Ext.fly(target).getAttribute('headerIndex'),
            headerConfig = this.timeAxisViewModel.getColumnConfig()[position][index];

        this.fireEvent('timeheader' + eventName, this, headerConfig.start, headerConfig.end, event);
    },

//    mainRenderer            : function (val, meta, resource, rowIndex, colIndex) {
//        var rend = this.renderers,
//            retVal = '';
//
//        for (var i = 0; i < rend.length; i++) {
//            retVal += rend[i].fn.call(rend[i].scope || this, val, meta, resource, rowIndex, colIndex) || '';
//        }
//
//        var view = this.getSchedulingView();
//
//        meta.style = 'height:' + ((meta.rowHeight || view.getRowHeight()) - view.cellTopBorderWidth - view.cellBottomBorderWidth) + 'px';
//
//        return retVal;
//    },

    mainRenderer            : function (val, meta, rowRecord, rowIndex, colIndex) {
        var rend = this.renderers,
            isHorizontal = this.getOrientation() === 'horizontal',
        // Deduct one for the locked timeaxis column
            resource = isHorizontal ? rowRecord : this.resourceStore.getAt(colIndex - 1),
            retVal = '&nbsp;'; // To ensure cells always consume correct height

        // Ext doesn't clear the meta object between cells
        meta.rowHeight = null;

        for (var i = 0; i < rend.length; i++) {
            retVal += rend[i].fn.call(rend[i].scope || this, val, meta, resource, rowIndex, colIndex) || '';
        }

        if (this.variableRowHeight) {
            // Set row height
            var view = this.getSchedulingView();
            var defaultRowHeight = view.timeAxisViewModel.getViewRowHeight();

            // the `cellBottomBorderWidth and cellTopBorderWidth` seems not be required in touch
            meta.rowHeight = (meta.rowHeight || defaultRowHeight)// - view.cellTopBorderWidth - view.cellBottomBorderWidth;
        }

        return retVal;
    },

    // Applies the start and end date to each event store request
    applyStartEndParameters : function (eventStore, operation) {
        var params = {};

        params[this.startParamName] = this.getStart();
        params[this.endParamName] = this.getEnd();

        operation.setParams(params);
    },

    setupHorizontal : function () {
        var me = this;
        var timeAxisCol = this.timeAxisColumn = new Sch.column.HorizontalScheduler({
            scheduler           : me,
            timeAxisViewModel   : me.timeAxisViewModel,

            // Set hardcoded height in IE since it doesn't support flex box properly
            height              : Ext.browser.is.IE ? this.headerHeight : null,
            renderer            : me.mainRenderer,
            scope               : me
        });

        me.columns.push(timeAxisCol);
    },

    setupVertical : function () {

        // Fit not required in vertical mode
        this.timeAxisViewModel.suppressFit = !this.timeAxisViewModel.forceFit;

        var timeAxisCol = Ext.create('Sch.column.VerticalScheduler', Ext.apply({
            scheduler             : this,
            timeAxis              : this.timeAxis,
            timeAxisViewModel     : this.timeAxisViewModel,
            cellTopBorderWidth    : this.cellTopBorderWidth,
            cellBottomBorderWidth : this.cellBottomBorderWidth
        }, this.timeAxisColumnCfg || {}));

        var resourceColumns = this.createResourceColumns(this.resourceColumnWidth || Sch.preset.Manager.getPreset(this.viewPreset).resourceColumnWidth);

        // Inject empty placeholder column
        if (resourceColumns.length === 0) {
            resourceColumns.push({ flex : 1 });
        }

        this.columns = [timeAxisCol].concat(resourceColumns);

        this.store = this.timeAxis;

        this.resourceStore.on({
            refresh       : this.refreshResourceColumns,
            addrecords    : this.refreshResourceColumns,
            updaterecord  : this.refreshResourceColumns,
            loadrecords   : this.refreshResourceColumns,
            removerecords : this.refreshResourceColumns,
            scope         : this
        });

        this.timeAxisViewModel.on('columnwidthchange', this.refreshResourceColumns, this);

        if (!this.hasOwnProperty('stripeRows')) {
            this.stripeRows = false;
        }
    },

    refreshResourceColumns : function () {
        var headerCt = this.normalGrid.columns;
        headerCt.suspendEvents();
        headerCt.removeAllColumns();
        headerCt.resumeEvents(true);

        headerCt.appendColumn(this.createResourceColumns(this.timeAxisViewModel.resourceColumnWidth));
    },

    destroy : function() {

        var view = this.getSchedulingView();

        if (view) {
            view.destroy();
        }

        if (this.leftPull) {
            this.leftPull.destroy();
        }

        if (this.rightPull) {
            this.rightPull.destroy();
        }

        if (this.columnLinesFeature) {
            this.columnLinesFeature.destroy();
        }

        this.callParent(arguments);
    }

}, function () {
    Ext.apply(Sch.panel.SchedulerGrid, {
        /*VERSION*/
    })
});

