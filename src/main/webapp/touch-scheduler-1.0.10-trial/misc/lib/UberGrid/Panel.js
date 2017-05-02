/**
@class UberGrid.Panel
@aside guide ubergrid_getting_started

This document is a class reference. For a more gentle introduction, please refer to <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a>.

`UberGrid.Panel` is a main class, representing the whole grid instance. Note, that ubergrid consists from one or several sub-grids, which represent the 
sections of the grid - areas that can be scrolled horizontally independently, but have synchronized vertical scrolling.

* **Please note**, that in addition to own events panel will also fire the bubbled `header*` events from all grid {@link UberGrid.Header headers}.

{@img panel-intro.png}

Synopsys
========

    var grid = new UberGrid.Panel({
        rowHeight           : 50,

        lockedWidth         : 350,
        buffered            : true,

        columns             : [
            {
                header      : 'Id',
                dataIndex   : 'Id',
                width       : 40,
                cellCls     : 'id',

                locked      : true
            },
            {
                header      : 'Title',
                dataIndex   : 'Title',
                width       : 250,

                locked      : true
            },
            {
                header      : 'Note',
                dataIndex   : 'Note',
                width       : 200,

                locked      : true
            },
            {
                header      : 'Details',

                children    : [
                    {
                        xclass      : 'UberGrid.column.Date',
                        header      : 'Start Date',
                        dataIndex   : 'StartDate',
                        width       : 200
                    },
                    {
                        header      : 'Location',
                        dataIndex   : 'Location',
                        flex        : 1
                    }
                ]
            }
        ],

        store : new Ext.data.Store({
            ...
        })
    })

    Ext.Viewport.add(grid);

*/
Ext.define('UberGrid.Panel', {

    extend      : 'Ext.Container',

    alias       : 'widget.ubergrid',

    requires    : [
        'Ext.layout.VBox',
        'Ext.layout.HBox',
        'Ext.data.Store',
        'UberGrid.column.Column',
        'UberGrid.model.TabularView',
        'UberGrid.SubGrid',
        
        'UberGrid.override.PaintMonitor',
        'UberGrid.override.SizeMonitor',
        
        // TODO remove after dropping support for ST 2.1.x
        'UberGrid.override.Element'
    ],

    /**
     * @cfg {Array[UberGrid.column.Column/Object]/UberGrid.column.Column} columns 
     * This is a required attribute. Usually an array of config objects for {@link UberGrid.column.Column}. In the config objects you can specify a custom column class with `xclass` property.
     * 
        var panel    = new UberGrid.Panel({
            columns  : [
                {
                    header       : "Id",
                    field        : "id",
                    width        : 50
                },
                {
                    xclass       : "UberGrid.column.Date",
                    header       : "Start date",
                    field        : "startDate",
                    format       : 'Y-m-d',
                    width        : 150
                }
            ]
        })
        
     * 
     * Note, that after grid instatiation, the array will be converted to a root {@link UberGrid.column.Column} instance, with the child columns from the provided array.
     * This root column will be available as `this.columns` property of the grid panel. 
     * 
     * See {@link UberGrid.column.Column} for supported column config options and classes in `UberGrid.column.*` namespace for a list of available columns.
     * See also a <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a> for more information.
     */
    columns             : null,
    
    /**
     * @cfg {Ext.data.Store/String} store A store instance (or store id) from which the data will be visualized. This is a required attribute.
     */
    store               : null,

    
    /**
     * @cfg {Number} rightWidth Width of the "right" section, in pixels. Only used if your columns contains "right" columns. 
     * See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    rightWidth          : null,
    
    /**
     * @cfg {Number} rightFlex Flex value of the "right" section, in pixels. Only used if your columns contains "right" columns. 
     * See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    rightFlex           : null,
    
    /**
     * @cfg {Number} lockedWidth Width of the "locked" section, in pixels. Only used if your columns contains "locked" columns. 
     * See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    lockedWidth         : null,
    
    /**
     * @cfg {Number} lockedFlex Flex value of the "locked" section, in pixels. Only used if your columns contains "locked" columns. 
     * See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    lockedFlex          : null,
    
    /**
     * @cfg {Number} normalFlex Flex value of the "normal" section, in pixels. Only used if your columns contains "right" or "locked" columns, otherwise
     * "normal" section just takes the full width of the grid. See a {@link UberGrid.column.Column#type type} config of the column class for details. 
     */
    normalFlex          : null,
    
    /**
     * @cfg {Object} lockedGridConfig A config object that will be applied to the "locked" subgrid before instantiation. "Locked" grid will be an instance of
     * {@link UberGrid.SubGrid}
     */
    lockedGridConfig    : null,
    
    /**
     * @cfg {Object} normalGridConfig A config object that will be applied to the "normal" subgrid before instantiation. "Normal" grid will be an instance of
     * {@link UberGrid.SubGrid}
     */
    normalGridConfig    : null,
    
    /**
     * @cfg {Object} rightGridConfig A config object that will be applied to the "right" subgrid before instantiation. "Right" grid will be an instance of
     * {@link UberGrid.SubGrid}
     */
    rightGridConfig     : null,

    /**
     * @cfg {Number} headerHeight Height of the header, in pixels. 
     */
    headerHeight        : 80,
    
    /**
     * @cfg {Number} rowHeight Default height of the row, in pixels. Each row may have individual row height, which can be specified as `rowHeight` property
     * of the "meta" object inside of the column's {@link UberGrid.column.Column#renderer renderer}. Note, that row height could not be derived from the row 
     * DOM element. 
     * 
     */
    rowHeight           : 30,
    
    /**
     * @cfg {Boolean} rowHeightIsFixed Boolean value, indicating whether the height of all rows is the same. If it is, UberGrid will apply some optimizations to the scrolling process.
     */
    rowHeightIsFixed    : false,

    /**
     * @cfg {Object} headerConfig A config object that will be applied to the {@link UberGrid.Header header} for this grid.
     */
    headerConfig        : null,

    /**
     * @cfg {String} sortTriggerEvent The event that should trigger a column sort. Defaults to 'headersingletap'.
     */
    sortTriggerEvent : 'headersingletap',

    /**
     * @cfg {Function} getRowCls A function, which, if provided, will be called for each row. 
     * It will receive a record being rendered as the only argument and should return a string with one or several 
     * CSS class names, separated with space. These classes will be added to a row element. 
     * If this function returns `null` or `undefined` the value is simply ignored. 
     * 
        var panel    = new UberGrid.Panel({
            getRowCls : function (record) {
                if (record.get('someField') > 10) return "app-row-with-big-value"
            },
            ...
        })

     * The function will be executed with the panel as a scope (`this` will be a panel) 
     */
    getRowCls           : null,

    /**
     * @property {UberGrid.SubGrid} lockedGrid A reference to the "locked" sub-grid. See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    lockedGrid          : null,
    
    /**
     * @property {UberGrid.SubGrid} normalGrid A reference to the "normal" sub-grid. See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    normalGrid          : null,
    
    /**
     * @property {UberGrid.SubGrid} rightGrid A reference to the "right" sub-grid. See a {@link UberGrid.column.Column#type type} config of the column class for details.
     */
    rightGrid           : null,

    /**
     * @property {Array[UberGrid.SubGrid]} simpleGrids An array of sub-grids of this grid. Each subgrid is an instance of {@link UberGrid.SubGrid} 
     */
    simpleGrids         : null,
    
    /**
     * @cfg {Boolean} columnLines Boolean value, indicating whether the column lines should be rendered.
     */
    columnLines         : true,
    
    /**
     * @cfg {Boolean} stripeRows Boolean value, indicating whether the odd and even rows should be visually different. If this option is enabled, odd and even rows will have accordingly 
     * `ubergrid-row-odd` and `ubergrid-row-even` CSS classes applied.
     */
    stripeRows          : true,

    /**
     * @property {UberGrid.model.TabularView} tabularView Reference to the {@link UberGrid.model.TabularView} instance for this grid.
     */
    tabularView             : null,

    /**
     * @cfg {String} tabularViewClass Class name for the {@link UberGrid.model.TabularView} instance of this grid.
     */
    tabularViewClass        : 'UberGrid.model.TabularView',
    
    /**
     * @cfg {Object} tabularViewConfig A config object for the {@link UberGrid.model.TabularView} instance of this grid.
     */
    tabularViewConfig       : null,
    
    // private
    viewReady               : false,
    
    /**
     * @cfg {Boolean} buffered Rendering mode for this grid. Please note, that because of performance considerations the DOM markup of the grid differs significantly
     * between buffered and non-buffered rendering modes. You should probably design your code around a single rendering mode (though supporting both should not be too hard). 
     * 
     * In non-buffered mode, UberGrid renders a whole dataset in a single &lt;table&gt; and rows and cells of the grid corresponds to regular &lt;tr&gt; and &lt;td&gt; elements.
     * 
     * In buffered mode, UberGrid renders only currently visible area and uses absolutely positioned &lt;div&gt; elements for that.
     */
    buffered                : false,
    
    
    /**
     * @cfg {Boolean} scrollToTopOnHeaderTap A boolean, indicating whether the grid should scroll to the top after header tap 
     */
    scrollToTopOnHeaderTap  : true,
    
    /**
     * @cfg {Number} lookupDepth Maximum depth to lookup ubergrid row from event target
     */
    lookupDepth             : 10,
    
    // The 'painted' event and thus `onFirstPainted` call is async. Meanwhile grid is added to DOM synchronously (native `isPainted()` method).
    // This means that right after instatiation of the grid (it will be already in the DOM, but `painted` event will not be fired yet)
    // someone can call `refresh` method, which should do nothing, as we want the 1st refresh to happen as part of the `onFirstPainted`
    // listener
    isReallyPainted         : false,


    initialize : function () {
        var config      = this.config
        
        // was known as Ext.apply(this, config) previously
        for (var name in config) {
            if (config.hasOwnProperty(name) && name !== 'xtype' && name !== 'xclass' && !this.hasConfig(name)) {
                this[ name ] = config[ name ];
            }
        }

        this.simpleGrids    = []


        this.callParent()

        this.setLayout({ type : 'hbox', align : 'stretch' });

        this.doInitialize();

        this.on('painted', this.onFirstPainted, this, { single : true })
//        this.on('resize', this.onFirstResized, this, { single : true })
        this.on('resize', this.myOnResize, this)

        this.on({
            'scroll-animation-start'    : this.onBodyScrollAnimationStart,
            'scroll-animation-end'      : this.onBodyScrollAnimationEnd,
            'scroll-idle'               : this.onBodyScrollIdle,

            'headerdoubletap'           : this.onHeaderDoubleTap,

            scope                       : this
        })

        this.translateEventFromRows([
            'tap', 'singletap', 'doubletap',
            'longpress', 'taphold',
            'swipe',
            'pinch', 'pinchstart', 'pinchend',
            'rotate', 'rotatestart', 'rotateend'
        ]);


        this.addCls('ubergrid-panel');
    },

    doInitialize : function() {
        // Clear array first
        this.simpleGrids.length = 0

        var columns         = this.columns;
        var store           = this.store = Ext.StoreMgr.lookup(this.store);

        if (!columns)           throw "`columns` attribute is required for `UberGrid.Panel`";
        if (!store)             throw "`store` attribute is required for `UberGrid.Panel`";

        if (Ext.isArray(columns))
            this.columns    = columns = new UberGrid.column.Column({
                children        : columns
            })
        else
        if (!(columns instanceof UberGrid.column.Column))
            this.columns    = columns = new UberGrid.column.Column(columns)

        columns.on({
            columnchange        : this.onColumnChange,
            columnwidthchange   : this.onColumnWidthChange,

            scope               : this
        });

        var tabularViewClass    = Ext.ClassManager.get(this.tabularViewClass)
        var tabularViewConfig   = Ext.apply({}, this.tabularViewConfig)

        var tabularView         = this.tabularView = new tabularViewClass(Ext.apply(tabularViewConfig, {
            store               : store,
            columns             : columns,

            rowHeight           : this.rowHeight,
            rowHeightIsFixed    : this.rowHeightIsFixed,

            getRowCls           : this.getRowCls,
            getRowClsScope      : this,

            stripeRows          : this.stripeRows,

            buffered            : this.buffered
        }))

        this.setupInternalLayout(columns, tabularView)

        this.relayEvents(this.tabularView, [
            /**
             * @event refresh This event is fired each time the underlying tabular view is refreshed.
             * @param {UberGrid.model.TabularView} view The tabular view
             */
            'refresh'
        ]);
    },
    
    /**
     * Return a store instance of this grid.
     * @return {Ext.data.Store}
     */
    getStore : function() { 
        return this.store; 
    },    
    
    
    // on column structure change do a full refresh
    onColumnChange : function() {
        this.refresh();
    },
    
    
    // If a column width changes, scroller should be refreshed (new max width etc);
    onColumnWidthChange : function () {
        // TODO once row wrapping of cells for buffered mode will be implemented need to update the row width 
        this.refreshScrollers()
    },
    

    getRecordByInternalId : function(id) {
        return (this.store.snapshot || this.store.data).findBy(function (record) {
            return record.internalId == id
        })
    },    
    
    
    /**
     * @event rowtap This event is triggered when a "tap" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowsingletap This event is triggered when a "singletap" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event An instance of Ext.event.Event for this event
     */ 
    /**
     * @event rowdoubletap This event is triggered when a "doubletap" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event An instance of Ext.event.Event for this event
     */ 
    /**
     * @event rowlongpress This event is triggered when a "longpress" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event An instance of Ext.event.Event for this event
     */ 
    /**
     * @event rowtaphold This event is triggered when a "taphold" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event An instance of Ext.event.Event for this event
     */ 
    /**
     * @event rowswipe This event is triggered when a "swipe" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowpinch This event is triggered when a "pinch" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowpinchstart This event is triggered when a "pinchstart" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowpinchend This event is triggered when a "pinchend" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowrotate This event is triggered when a "tap" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowrotatestart This event is triggered when a "rotatestart" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */ 
    /**
     * @event rowrotateend This event is triggered when a "rotateend" happens on the row of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    
    
    /**
     * @event celltap This event is triggered when a "tap" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellsingletap This event is triggered when a "singletap" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event celldoubletap This event is triggered when a "doubletap" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event celllongpress This event is triggered when a "longpress" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event celltaphold This event is triggered when a "taphold" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellswipe This event is triggered when a "swipe" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellpinch This event is triggered when a "pinch" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellpinchstart This event is triggered when a "pinchstart" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellpinchend This event is triggered when a "pinchend" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellrotate This event is triggered when a "rotate" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellrotatestart This event is triggered when a "rotatestart" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    /**
     * @event cellrotateend This event is triggered when a "rotateend" happens on the cell of this grid panel
     * @param {UberGrid.Panel} panel The panel instance
     * @param {Ext.data.Model} record The corresponding data record of the store
     * @param {Number} rowIndex The index of the row
     * @param {Number} cellIndex The index of the cell in the subgrid it belongs to. Only "leaf" columns will count for this index, not group columns.
     * @param {Number} globalIndex The index of the cell among all leaf columns of the whole grid (including all subgrids)
     * @param {UberGrid.column.Column} column The column instance the cell belongs to
     * @param {UberGrid.SubGrid} simpleGrid The instance of the sub-grid in which the event happened
     * @param {Ext.event.Event} event The instance of the Ext.event.Event
     */
    
    
    /** @ignore */
    translateEventFromRows : function (eventNames) {
        var me          = this
        var element     = this.element
        var store       = this.store
        
        Ext.each(eventNames, function (eventName) {
            element.on(eventName, function (event) {
                var rowEl           = event.getTarget('.ubergrid-row', me.lookupDepth, false)

                if (!rowEl || !rowEl.parentNode) {
                    // This row element may no longer be part of the DOM (a previous event could have refreshed the row)
                    return;
                }

                var simpleGridEl    = Ext.fly(rowEl).parent('.ubergrid-simple', true)
                // probably a table/row has been already removed from DOM
                if (!simpleGridEl) return
                
                var simpleGrid      = Ext.getCmp(simpleGridEl.id)
                
                var recordId        = rowEl.getAttribute('recordId')
                var record          = me.getRecordByInternalId(recordId)
                var rowIndex        = me.getStore().indexOf(record);
                
                me.fireEvent('row' + eventName, me, record, rowIndex, simpleGrid, event) 

                var cell            = event.getTarget('.ubergrid-cell', 10, false);

                if (cell) {
                    var cellIndex   = Array.prototype.slice.apply(cell.parentNode.children).indexOf(cell);
                    var column      = simpleGrid.columns.getLeafs()[ cellIndex ]
                    var cbName      = "onCell" + eventName.charAt(0).toUpperCase() + eventName.slice(1);

                    me.fireEvent('cell' + eventName, me, record, rowIndex, cellIndex, column.getIndex(), column, simpleGrid, event);

                    if (column[cbName] && (!column.targetDelegate || event.getTarget(column.targetDelegate))) {
                        column[cbName](record, rowIndex, me, simpleGrid, event);
                    }
                }
            // `delegate` doesn't seem to work on DOM listeners in ST
            }, me/*, { delegate : '.ubergrid-row' }*/)
        })
    },

    
    /**
     * Returns `true` if this grid was rendered and DOM is fully populated. See also {@link #viewready} event.
     * 
     * @return {Boolean}
     */
    isReady : function() {
        return this.viewReady;
    },
    
    
    onHeaderDoubleTap : function () {
        if (this.scrollToTopOnHeaderTap) this.scrollToTop()
    },

    
    onFirstPainted : function () {
        this.isReallyPainted    = true;
//        if (!this.tabularView.buffered) this.tabularView.renderAllRows()
        
        this.refresh(true)
        
        this.refreshScrollers()
        
        this.viewReady = true;
        /**
         * @event viewready This event is fired first time when grid is fully rendered and placed in the DOM. 
         * @param {UberGrid.Panel} grid The gridpanel that has been rendered  
         */
        this.fireEvent('viewready', this);
        
//        var tabularView     = this.tabularView
//        
//        attempt to "warm up" the scrolling which seems to experience a slight delay in the beginning
//        tabularView.scrollViewportTo(tabularView.viewportScrollTop + 5)
//        
//        setTimeout(function () {
//            tabularView.scrollViewportTo(tabularView.viewportScrollTop - 5)
//        }, 50)
    },
    
    
    myOnResize : function () {
        this.forEachGrid(function (simpleGrid) {
            simpleGrid.headerCmp.refreshColumnWidths()
        })
        
        this.refreshScrollers()
        
        this.tabularView.setViewportHeight(this.simpleGrids[ 0 ].getBodyElHeight())
    },
    
    
    /**
     * This method refreshes the rendered content of the grid.
     * 
     * @param {Boolean} resetScrollPosition Pass `true` to reset the scroll position to 0. Otherwise grid will try to maintain the current scroll position (it still may be changed
     * in a case when viewable area goes outside of the scrollable range).
     */
    refresh : function (completeRefresh) {
        if (!this.isPainted() || !this.isReallyPainted) return
        
        // will refresh headers and create CSS rules for column widths
        this.forEachGrid(function (simpleGrid) {
            simpleGrid.headerCmp.refresh()
        })
        
        this.tabularView.refresh({
            viewportHeight          : this.simpleGrids[ 0 ].getBodyElHeight(),
            completeRefresh         : completeRefresh
        })
    },

    
    onBodyScrollIdle : function () {
    },
    
    
    onBodyScrollAnimationStart : function () {
        this.tabularView.onAnimationStarted()
    },
    
    
    onBodyScrollAnimationEnd : function () {
        this.tabularView.onAnimationFinished()
    },


    setupInternalLayout : function (columns, tabularView) {
        var store               = this.store
        var sections            = columns.groupChildrenByType()

        if (sections) {
            var childrenColumns = columns.children

            this.add([].concat(
                sections.locked ? 
                    this.lockedGrid = this.createSimpleGrid(Ext.apply({
                        type                : 'locked',
    
                        columns             : childrenColumns[ 0 ],
    
                        // "lockedWidth" takes priority over "lockedFlex"
                        width               : Ext.isNumber(this.lockedWidth) ? this.lockedWidth : (Ext.isNumber(this.lockedFlex) ? null : childrenColumns[ 0 ].getTotalWidth()),
                        flex                : this.lockedFlex
                    }, this.lockedGridConfig || {}))
                :
                    [],
                
                this.normalGrid = this.createSimpleGrid(Ext.apply({
                    type                : 'normal',

                    columns             : childrenColumns[ 1 ],

                    flex                : this.normalFlex || 1
                }, this.normalGridConfig || {})),
                
                sections.right ? 
                    this.rightGrid  = this.createSimpleGrid(Ext.apply({
                        type                : 'right',
    
                        columns             : childrenColumns[ 2 ],
                        // "rightWidth" takes priority over "rightFlex"
                        width               : Ext.isNumber(this.rightWidth) ? this.rightWidth : (Ext.isNumber(this.rightFlex) ? null : childrenColumns[ 2 ].getTotalWidth()),
    
                        flex                : this.rightFlex
                    }, this.rightGridConfig || {}))
                :
                    []
            ));

            this.lockedGrid && this.lockedGrid.addCls('ubergrid-simple-locked')
            this.normalGrid.addCls('ubergrid-simple-normal')
            this.rightGrid && this.rightGrid.addCls('ubergrid-simple-right')
        } else {
            this.add([
                this.normalGrid = this.createSimpleGrid(Ext.apply({
                    flex                : 1,
                    columns             : columns
                }, this.normalGridConfig || {}))
            ]);
        }
    },


    createSimpleGrid : function (config) {
        Ext.apply(config, {
            headerHeight                    : this.headerHeight,    
            
            store                           : this.store,
            tabularView                     : this.tabularView,
            
            columnLines                     : this.columnLines,
            stripeRows                      : this.stripeRows,
            headerConfig                    : this.headerConfig,
            sortTriggerEvent                : this.sortTriggerEvent
        })
        
        var grid    = Ext.factory(config, 'UberGrid.SubGrid')

        this.simpleGrids.push(grid)

        return grid
    },


    /**
     * This is an iterator for all the sub-grids this grid has. Sub-grids are iterated from left to right.
     * 
     * @param {Function} func A function to call for each sub-grid.
     * @param {UberGrid.SubGrid} func.simpleGrid A sub-grid instance 
     * @param {Function} func.index The index of the sub-grid instance
     * @param {Object} scope A scope for `func`
     */
    forEachGrid : function (func, scope) {
        var simpleGrids     = this.simpleGrids

        for (var i = 0; i < simpleGrids.length; i++) func.call(scope || this, simpleGrids[ i ], i)
    },


    /**
     * This is a backward iterator for all the sub-grids this grid has. Sub-grids are iterated from right to left.
     * 
     * @param {Function} func A function to call for each sub-grid.
     * @param {UberGrid.SubGrid} func.simpleGrid A sub-grid instance 
     * @param {Function} func.index The index of the sub-grid instance
     * @param {Object} scope A scope for `func`
     */
    forEachGridR : function (func, scope) {
        var simpleGrids     = this.simpleGrids

        for (var i = simpleGrids.length - 1; i >= 0; i--) func.call(scope || this, simpleGrids[ i ], i)
    },


    /**
     * Scrolls the grid content to top.
     */
    scrollToTop : function () {
        // TODO support animation (if its possible, since we actullay don't know the real "top" position until its rendered)
        this.tabularView.scrollToTop()
    },
    
    
    // Not yet supported
    // TODO support animation (if its possible, since we actullay don't know the real "top" position until its rendered)
    scrollToBottom : function () {
        this.tabularView.scrollToBottom()
    },
    
    
    /**
     * Scrolls the grid content vertically to the provided coordinate.
     * 
     * @param {Number} y The y-coordinate to scroll to.
     * @param {Boolean} animated Pass `true` to make the scrolling smooth. Depending on this argument this method works synchronously (not animated) or asynchronously (animated).
     * Provide a `callback` in 2nd case if you need to know when scrolling is complete. 
     * @param {Function} callback A function which will be called when scrolling is complete (only for animated case)
     */
    scrollVerticallyTo : function (y, animated, callback) {
        var scroller    = this.simpleGrids[ this.simpleGrids.length - 1 ].bodyCmp.getScroller()
        
        // In case there is an ongoing scroll
        scroller.stopAnimation();
        
        if (animated) scroller.on('scroll-animation-end', function () { callback && callback() }, null, { single : true })

        scroller.scrollTo(scroller.position.x, this.tabularView.minScrollRange + y, animated); 
    },

    
    /**
     * Scrolls the grid content horizontally to the provided coordinate. 
     * 
     * @param {Number} x The x-coordinate to scroll to.
     * @param {Boolean} animated Pass `true` to make the scrolling smooth. Depending on this argument this method works synchronously (not animated) or asynchronously (animated).
     * Provide a `callback` in 2nd case if you need to know when scrolling is complete.
     * @param {Number} subGridIndex The index of the sub-grid which content will be scrolled. If not provided, the right-most sub-grid is scrolled.
     * @param {Function} callback A function which will be called when scrolling is complete (only for animated case)
     */
    scrollHorizontallyTo : function (x, animated, subGridIndex, callback) {
        var simpleGrids     = this.simpleGrids
        
        if (typeof subGridIndex !== 'number') subGridIndex = simpleGrids.length - 1
        
        var scroller    = simpleGrids[ subGridIndex ].bodyCmp.getScroller()
        
        // In case there is an ongoing scroll
        scroller.stopAnimation();
        
        if (animated) scroller.on('scroll-animation-end', function () { callback && callback() }, null, { single : true })

        scroller.scrollTo(x, scroller.position.y, animated); 
    },
    
    
    refreshScrollers : function() {
        this.forEachGrid(function (simpleGrid) {
            simpleGrid.bodyCmp.refreshScroller()
        })
    },

    
    destroy : function() {
        this.tabularView.destroy();
        this.columns.destroy();

        this.callParent(arguments);
    },

    
    /**
     * Returns a dom element for some record or `null` if it can not be found..
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex The index of the record in the {@link #store} or the record instance itself. 
     * @param {Number/UberGrid.SubGrid} [subGridIndex] The index of the sub-grid to take the row from or sub grid instance itself. If not provided the left-most sub-grid is used.
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element. 
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getRow : function (recordIndex, subGridIndex, returnElement) {
        if (!(subGridIndex instanceof UberGrid.SubGrid)) subGridIndex = this.simpleGrids[ subGridIndex || 0 ]
        
        return subGridIndex.getRow(recordIndex, returnElement)
    },
    
    
    /**
     * Returns a record, corresponding to the row at the provided page coordinates `x, y` and `null` if there are no rows at that point.
     * 
     * @param {Number} x Page coordinate X
     * @param {} y Page coordinate Y
     * 
     * @return {Ext.data.Model}
     */
    getRecordFromXY : function (x, y) {
        var record          = null
        
        // TODO subtract the scrollLeft/Top of body from x/y ?
        
        this.forEachGrid(function (simpleGrid) {
            var bodyCmp     = simpleGrid.bodyCmp
            var region      = bodyCmp.element.getPageBox(true)
            
            // inside of body
            if (!region.isOutOfBoundX(x) && !region.isOutOfBoundY(y)) {
                var tabularView         = this.tabularView
                var visibleContainers   = tabularView.visibleContainers
                var contentOffset       = y - region.top + tabularView.viewportScrollTop
                
                // in non-buffered mode we do not maintain offsetTop/offsetBottom attributes of rows, so can't count on them
                // we can only use `getContentScrollTop` of tabular view and row heights
                var currentOffsetTop    = tabularView.getContentScrollTop()
                
                for (var i = 0; i < visibleContainers.length; i++) {
                    var rowHeight       = visibleContainers[ i ].row.height
                    
                    if (currentOffsetTop <= contentOffset && contentOffset <= currentOffsetTop + rowHeight) {
                        record          = visibleContainers[ i ].row.record
                        
                        return false
                    }
                    
                    currentOffsetTop    += rowHeight
                }
            }
        })
        
        return record
    },

    
    /**
     * Returns a sub grid instance by the column reference.
     * 
     * @param {String/Number/UberGrid.column.Column} reference Can be 1) a string with column id, 2) a number with index of the column 
     * (among all leaf columns of all subgrids), 3) a column instance itself
     * 
     * @return {UberGrid.SubGrid} A sub grid instance containing a referenced column or `null` if it can't be found
     */
    getSubGridByColumn : function (cellIndex) {
        var columns     = this.columns
        
        if (typeof cellIndex == 'string') {
            cellIndex   = columns.getById(cellIndex)
        }
        
        if (cellIndex instanceof UberGrid.column.Column) {
            cellIndex   = columns.getLeafs().indexOf(cellIndex)
        }
        
        var subGridIndex = -1;

        this.forEachGrid(function (grid, index) {
            if (grid.columns.getFirstLeafIndex() <= cellIndex && cellIndex <= grid.columns.getLastLeafIndex()) {
                subGridIndex = index;
                return false;
            }
        });

        return subGridIndex >= 0 ? this.simpleGrids[ subGridIndex ] : null
    },
    
    
    /**
     * Returns a subgrid instance, by its index or type.
     * 
     * @param {String/Number} subGridIndexOrType Can be one of the strings 'locked/normal/right' or number with subgrid index.
     * 
     * @return {UberGrid.SubGrid}
     */
    getSubGrid : function (subGridIndexOrType) {
        if (subGridIndexOrType instanceof UberGrid.SubGrid) return subGridIndexOrType
        
        if (subGridIndexOrType == 'locked') return this.lockedGrid
        if (subGridIndexOrType == 'normal') return this.normalGrid
        if (subGridIndexOrType == 'right')  return this.rightGrid
        
        return this.subGrids[ subGridIndexOrType ]
    },
    
    /**
     * Returns a DOM element for a cells in the grid. Note, that depending from the `cellIndex` parameter, a DOM element can be returned from one grid section or another.
     * Returns `null` if corresponding DOM element for the cell can not be found.
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex The index of the record in the {@link #store} or the record instance itself.
     * @param {Number/String/UberGrid.column.Column} cellIndex Can be a number - index of column **between all leaf columns**, 
     * a string with column {@link UberGrid.column.Column#id id} or a column instance itself.
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element.
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getCell : function (recordOrIndex, cellIndex, returnElement) {
        var subGrid     = this.getSubGridByColumn(cellIndex)
            
        return subGrid 
            ? 
                subGrid.getCell(
                    recordOrIndex, 
                    typeof cellIndex == 'number' ? cellIndex - subGrid.columns.getFirstLeafIndex() : cellIndex, 
                    returnElement
                ) 
            : 
                null;
    },
    
    
    /**
     * Returns a cell from a subgrid. Sub grid is resolved using the {@link #getSubGrid} method.
     * 
     * @param {String/Number} subGridIndexOrType Can be one of the strings 'locked/normal/right' or number with subgrid index.
     * @param {Number/Ext.data.Model} recordOrIndex The index of the record in the {@link #store} or the record instance itself.
     * @param {Number/String/UberGrid.column.Column} cellIndex Can be a number - index of column **between all leaf columns of the subgrid**, 
     * a string with column {@link UberGrid.column.Column#id id} or a column instance itself.
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element.
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getSubGridCell : function (subGrid, recordOrIndex, cellIndex, returnElement) {
        subGrid     = this.getSubGrid(subGrid)
        
        return subGrid ? subGrid.getCell(recordOrIndex, cellIndex, recordOrIndex) : null
    },
    
    
    /**
     * Triggers a refresh of the passed row in the grid.
     * 
     * Please note, that in buffered mode, refreshing a row which is not currently visible will basically do nothing.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of a record in the {@link #store} or the record instance itself.
     */
    refreshRow : function () {
        this.tabularView.refreshRow.apply(this.tabularView, arguments)
    },
    
    
    /**
     * Return a default row height value. Each row may have individual row height, using the `rowHeight` property of the "meta" object in the
     * column's {@link UberGrid.column.Column#renderer renderer}.
     * 
     * @return {Number}
     */
    getRowHeight : function () {
        return this.tabularView.rowHeight
    },
    
    
    /**
     * Sets a default row height value. Each row still may have individual row height, using the `rowHeight` property of the "meta" object in the
     * column's {@link UberGrid.column.Column#renderer renderer}.
     * 
     * @param {Number} newRowHeight New default row height
     * 
     */
    setRowHeight : function (value) {
        this.tabularView.setRowHeight(value)
    },

    /**
     * Reconfigures the grid with a new store and a new set of columns.
     *
     * @param {Ext.data.Store} store (optional)
     * @param {Array[UberGrid.column.Column/Object]/UberGrid.column.Column} columns (optional)
     */
    reconfigure : function(store, columns) {
        if (store) {
            this.store = store;
            
            // if we change only the store then we need to update the store on tabular view
            // and sub-grids manually, otherwise (if columns are supplied), full re-creation of internal state
            // will happen below
            if (!columns) {
                this.tabularView.bindStore(store);
    
                this.forEachGrid(function (grid) {
                    grid.bindStore(store);
                });
            }
        }

        if (columns) {
            // first destroy the tabular view which will flush the possibly outstanding queued updates
            this.tabularView.destroy();
            
            // Destroy all columns
            this.columns.destroy();

            this.columns = columns;

            // Destroy all subgrids
            this.removeAll(true);

            this.doInitialize();
        }

        this.refresh();
    }
}, function () {
    
    Ext.apply(UberGrid, {
        /*VERSION*/
    });
});