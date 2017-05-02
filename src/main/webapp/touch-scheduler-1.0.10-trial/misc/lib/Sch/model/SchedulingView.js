/**
 * @class Sch.model.SchedulingView
 *
 * A class which provides additional functionality and configuration options for the scheduling area. Configure this class by using the
 * {@link Sch.panel.SchedulerGrid#viewConfig viewConfig} property on the Scheduler Panel.
 *
 */
Ext.define('Sch.model.SchedulingView', {
    
    mixins : [
        'Ext.mixin.Observable',
        'Sch.mixin.AbstractTimelineView',
        'Sch.mixin.AbstractSchedulerView'
    ],

    cellBorderWidth         : 1,
    cellTopBorderWidth      : 1,
    cellBottomBorderWidth   : 0,
    eventBorderWidth        : 1,

    timeCellRenderer        : null,
    
    panel                   : null,
    _translateVal           : 0,

    constructor : function (config) {
        Ext.apply(this, config)
        
        this.callParent(arguments);
        
        this._initializeTimelineView();
        this._initializeSchedulerView();

        var tplString = Ext.Array.clone(this.eventTpl).join('').replace('{{evt-prefix}}', this.eventPrefix);
        this.eventTpl = Ext.create('Ext.XTemplate', tplString);
        
        this.bindEventStore(this.eventStore, true);

        this.panel.on({
            viewready  : this.onGridReady,

            // To maintain compatibility with shared code from Ext JS Scheduler
            refresh    : function () {
                this.fireEvent('refresh', this);
            },

            scope : this
        });
    },

    onUserBodyTranslate : function (methodName, x, y, sourceBody) {

        // React only t scrolls from "normal" body
        if (sourceBody == this.panel.normalGrid.bodyCmp) {
            if (this.getOrientation()[0] === 'h' && this._translateVal !== x) {
                this.getSecondaryCanvasEl().translate(x, 0, 0);
                this._translateVal = x;
            } else if (this.getOrientation()[0] === 'v' && this._translateVal !== y){
                this.getSecondaryCanvasEl().translate(0, y, 0);
                this._translateVal = y;
            }
        }
    },

    onGridReady : function() {
        this.panel.tabularView.addScrollObserver(this);

        this.panel.tabularView.on({
            // HACK 'itemadd' will trigger update in AbstractTimeSpan
            rowsadd        : function () { this.fireEvent('itemadd', this) },
            rowsremove     : function () { this.fireEvent('itemadd', this) },
            rowupdate      : function () { this.fireEvent('itemadd', this) },

            scope      : this
        });

        if (this.rowHeight <= this.panel.compactRowHeightThreshold) {
            this.panel.addCls('sch-compact-rowheight');
        } else {
            this.panel.removeCls('sch-compact-rowheight');
        }
    },

    // this method is called any time an event is refreshed, which requires the entire row to be refreshed
    repaintEventsForResource : function(resource) {
        if (this.getOrientation() === 'vertical') {
            // For vertical we draw all events in the first row
            resource = this.panel.store.first();
        }

        this.panel.tabularView.refreshRow(resource);
    },

    columnRenderer : function(value, meta, record, rowIndex, colIndex) {

        var retVal = this[this.getOrientation()].columnRenderer(value, meta, record, rowIndex, colIndex);

        if (this.timeCellRenderer) {
            this.timeCellRenderer(meta, record);
        }
        return retVal;
    },

    findRowByChild : function(t) {
        return Ext.fly(t).up('.ubergrid-row');
    },

    getRecordForRowNode : function(rowEl) {
        var recordId = rowEl.getAttribute('recordId');

        return this.panel.getRecordByInternalId(recordId);
    },

    // Returns the table element containing the rows of the schedule
    getRowNode: function (resourceRecord) {
        return this.panel.getRow(this.resourceStore.indexOf(resourceRecord), 1);
    },
    
    
    getSecondaryCanvasEl : function () {
        if (!this.__canvasEl) {
            var canvasContainer = this.panel.normalGrid.bodyCmp.element;

            this.__canvasEl = canvasContainer.createChild({
                cls : 'sch-secondary-canvas'
            }, canvasContainer.first());
        }

        return this.__canvasEl;
    },

    getEl : function() {
        if (!this.__el) {
            this.__el = this.panel.normalGrid.bodyCmp.element.down('.x-body');
        }

        return this.__el;
    },

    getTableRegion: function () {
        return this.getEl().getPageBox();
    },

    setRowHeight: function (height, preventRefresh) {
        height = Math.max(this.panel.minRowHeight, Math.floor(height))

        if (height === this.rowHeight) return;

        this.panel.tabularView.rowHeight = height;
        
        this.timeAxisViewModel.setViewRowHeight(height, preventRefresh); 

        if (this.getOrientation() === 'horizontal') {
            if (this.rowHeight <= this.panel.compactRowHeightThreshold) {
                this.panel.addCls('sch-compact-rowheight');
            } else {
                this.panel.removeCls('sch-compact-rowheight');
            }
        }
    },
    
    refresh : function() {
        this.panel.refresh();
    },

    refreshKeepingScroll : function() {
        this.panel.refresh();
    },

    scrollHorizontallyTo : function(x, animate) {
        this.panel.scrollHorizontallyTo(x, animate);
    },

    scrollVerticallyTo : function(y, animate) {
        this.panel.scrollVerticallyTo(y, animate);
    },

    scrollTo : function(x, y, animate) {
        this.scrollHorizontallyTo(x, animate);
        this.scrollVerticallyTo(y, animate);
    },

    getHorizontalScroll : function() {
        return this.panel.getScheduleScroller().position.x;
    },

    getVerticalScroll : function() {
        return this.panel.getScheduleScroller().position.y;
    },

    getScroll : function() {
        var pos = this.panel.getScheduleScroller().position;

        return {
            left : pos.x,
            top  : pos.y
        };
    },

    /**
     * Highlights an element briefly
     * @param {HtmlElement/Ext.Element} el The element
     * @param {String} color The highlight color, defaults to red (can be specified as normal CSS: #000, or rgba(255,255, 128, 1)).
     */
    highlightElement : function(el, color) {
        if (Ext.Anim) {
            Ext.Anim.run(
                el, 

                new Ext.Anim({ 
                    duration    : 1000,
                    from        : { "box-shadow": "0 0 50px " + (color || "red") },
                    to          : { "box-shadow": "0 0 0" }
                })
            );
        }
    },

    addCls : function() {
        var el = this.getEl();
        el.addCls.apply(el, arguments);
    },

    removeCls : function() {
        var el = this.getEl();
        el.addCls.apply(el, arguments);
    },

    getOuterEl : function() {
        if (!this.__outerEl) {
            this.__outerEl = this.panel.normalGrid.bodyCmp.element;
        }

        return this.__outerEl;
    },

    getRowContainerEl : function() {
        return this.getEl();
    },
    
    
    getScrollEventSource : function () {
        return this.panel.getScheduleScroller();
    },

    getViewportScroll : function () {
        var scroll = this.panel.bodyCmp.getViewportScroll();

        return {
            left : scroll.left,
            top  : scroll.top
        }
    },

    getViewportEl : function () {
        return this.getEl();
    },

    getViewportWidth : function () {
        return this.panel.normalGrid.bodyCmp.element.getWidth();
    },
    
    getViewportHeight : function () {
        return this.panel.normalGrid.bodyCmp.element.getHeight();
    },

    getViewportResourceAreaHeight : function () {
        var tabularView     = this.panel.tabularView;
        
        var renderedHeight  = tabularView.getContentScrollBottom() - tabularView.viewportScrollTop;
        
        if (renderedHeight > tabularView.viewportHeight) renderedHeight = tabularView.viewportHeight;
        
        return renderedHeight;
    },

    // Overridden since it we can't trust e.getXY()
    // http://www.sencha.com/forum/showthread.php?252850-2.1-e.getXY%28%29-returning-0-0-on-Nexus-7
    getDateFromDomEvent : function(e, roundingMethod) {
        return this.getDateFromXY([e.pageX, e.pageY], roundingMethod);
    },
    
    destroy : function() {
        this.bindEventStore(null);

        Ext.destroy(this.getSecondaryCanvasEl());

        this.callParent(arguments);
    },

    getScheduleCell : function(row, col) {
        return this.panel.normalGrid.getCell(row, col);
    },

    // HACK: Touch handles selection a bit differently, this behavior is mixed into the main panel component
    getSelectionModel : function() {
        return this.panel;
    }
});
