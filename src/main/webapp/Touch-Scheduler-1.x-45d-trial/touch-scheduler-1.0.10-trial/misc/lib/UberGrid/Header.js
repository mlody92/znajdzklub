/**
@class UberGrid.Header
@aside guide ubergrid_getting_started

This class represents the header of the grid {@link UberGrid.SubGrid section}. Usually you don't need to instatiate it manually, as it will be done for you
by the {@link UberGrid.SubGrid section class}.

* **Please note** that all `header*` events will be bubbled up to the main panel.

*/
Ext.define('UberGrid.Header', {

    extend      : 'Ext.Component',

    alias       : 'widget.UberGrid-Header',

    requires    : [
        'UberGrid.column.Column',
        'Ext.XTemplate'
    ],

    config      : {
        /**
         * @cfg {String} sortTriggerEvent The event that should trigger a column sort. Defaults to 'headersingletap'.
         */
        sortTriggerEvent : 'headersingletap'
    },

    /**
     * @property {UberGrid.model.TabularView} tabularView A reference to the {@link UberGrid.model.TabularView tabular view} of the main panel.  
     */
    tabularView         : null,
    
    /**
     * @property {UberGrid.column.Column} columns A root column for this section. Note, that it will contain only the columns of the current grid section.  
     */
    columns             : null,
    
    /**
     * @property {Ext.data.Store} store A reference to the store of the main panel.  
     */
    store               : null,

    /**
     * @property {Ext.dom.Element} wrapperElement A reference to a DOM element, containing a &lt;table&gt; with column headers.  
     */
    wrapperElement      : null,

    renderTpl           : [
        '<table style="width : {totalWidth}px;" class="ubergrid-header-table {cls}">',
            '<tpl for="widths">',
                '{% if (values === 0) continue; %}',
                '<col style="width:{.}px">',
            '</tpl>',
            '<tpl for="structure">',
                '<tr>',
                    '<tpl for=".">',
                        '{% if (values.column.hidden) continue; %}',
        //                                                                           HACK - accessing "system" variable of template
                        '<td colspan="{colSpan}" rowspan="{rowSpan}" class="ubergrid-header-column {[ c0.sortClasses[ values.column.id ] ]} {cls}" style="{style}" {attr}>{caption}</td>',
                    '</tpl>',
                '</tr>',
            '</tpl>',
        '</table>'
    ],

    baseIdColumns       : null,
    baseIdTotalWidth    : null,
    
    styleTag            : null,
    styleSheet          : null,
    
    rulesCache          : null,
    rulesCreated        : false,
    
    widthDistributed    : false,

    
    initialize : function () {
        var config      = this.config
        
        // was known as Ext.apply(this, config) previously
        for (var name in config) {
            if (config.hasOwnProperty(name) && name !== 'xtype' && name !== 'xclass' && !this.hasConfig(name)) {
                this[ name ] = config[ name ];
            }
        }
        
        this.renderTpl      = new Ext.XTemplate(this.renderTpl)
        
        this.rulesCache     = {}
        
        if (!(this.columns instanceof UberGrid.column.Column))      throw "`columns` attribute for `UberGrid.Header` should be an instance of `UberGrid.column.Column`";
        
        this.columns.on('columnwidthchange', this.onColumnWidthChange, this)
        this.columns.on('columnchange', this.onColumnWidthChange, this)
        this.columns.on('columnremove', this.onColumnRemove, this)
        
//        this.on('painted', this.onFirstPainted, this, { single : true })
        
        this.callParent()

        this.bindStore(this.store);
        
        this.translateEvents([ 
            'tap', 'singletap', 'doubletap', 
            'longpress', 'taphold', 
            'swipe',
            'pinch', 'pinchstart', 'pinchend',
            'rotate', 'rotatestart', 'rotateend'
        ])

        this.addCls('ubergrid-header-ct');
        this.on(this.getSortTriggerEvent(), this.onHeaderTap, this);
    },

    bindStore : function(store) {
        var listeners = {
            sort            : this.onStoreSort,

            scope           : this
        };

        if (this.store) {
            this.store.un(listeners);
            this.store = null;
        }

        if (store) {
            store.on(listeners);
            this.store = store;
        }
    },
    
    
    onStoreSort : function () {
        // refresh to reflect sort changes
        this.refresh()
    },
    
    
    onColumnRemove : function (parent, column) {
        if (!this.rulesCreated) return
        
        var styleSheet      = this.getStyleSheet()
        var cssRules        = styleSheet.cssRules
        
        var rule            = this.rulesCache[ column.id ]
        
        var index
        
        for (var i = 0; i < cssRules.length; i++) 
            if (cssRules[ i ] == rule) {
                index   = i
                break
            }
        
        styleSheet.deleteRule(index)
    },
    
    
    // also works as handler for columns structure change
    onColumnWidthChange : function () {
        if (!this.rulesCreated) return
        
        var me              = this
        var columns         = this.columns
        var rulesCache      = this.rulesCache
        
        var changedColumns  = this.distributeAvailableWidth()
        
        changedColumns.forEach(function (column) {
            if (!rulesCache[ column.id ]) 
                me.createCSSRuleFor(column)
            else
                rulesCache[ column.id ].style.width = column.getWidth() + 'px'
        })
        
        if (changedColumns.length) {
            rulesCache.$totalWidth.style.width = columns.getTotalWidth() + 'px'
            
            if (this.tabularView.buffered) {
                var leafs               = columns.getLeafs();
                // we'll possibly cache "getLocalIndex" in the future
                var firstChangedIndex   = changedColumns[ 0 ].getLocalIndex()
                
                for (var i = firstChangedIndex; i < leafs.length; i++) {
                    rulesCache[ leafs[ i ].id ].style.left = columns.getLeafOffset(i) + 'px'
                }
            }
        }
        
        this.refresh()
    },
    
    
    /**
     * @event headertap This event is fired when a "tap" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headersingletap This event is fired when a "singletap" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerdoubletap This event is fired when a "doubletap" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerlongpress This event is fired when a "longpress" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headertaphold This event is fired when a "taphold" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerswipe This event is fired when a "swipe" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerpinch This event is fired when a "pinch" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of Ethe xt.event.Event for this event
     */
    /**
     * @event headerpinchstart This event is fired when a "pinchstart" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerpinchend This event is fired when a "pinchend" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerrotate This event is fired when a "rotate" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerrotatestart This event is fired when a "rotatestart" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    /**
     * @event headerrotateend This event is fired when a "rotateend" happens on the header element of some grid section.
     * @param {UberGrid.Header} header A header on which the event has happened
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell (&lt;td&gt;)
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */
    
    /** @ignore */
    translateEvents : function (eventNames) {
        var me          = this
        var element     = this.element
        
        Ext.each(eventNames, function (eventName) {
            me.enableBubble('header' + eventName)
            
            element.on(eventName, function (event) {
                var headerEl        = event.getTarget('.ubergrid-header-column', 10, false)
                if (!headerEl) return
                
                var match           = headerEl.className.match(/ubergrid-header-columnid-(\S*)/);
                if (!match) return
                
                var column          = me.columns.getById(match[ 1 ])
                
                var simpleGridEl    = element.parent('.ubergrid-simple', true)
                if (!simpleGridEl || !column) throw "Can't find simple grid or column of header: " + headerEl
                
                var simpleGrid      = Ext.getCmp(simpleGridEl.id)
                
                me.fireEvent('header' + eventName, me, column, headerEl, simpleGrid, event)
            // `delegate` doesn't seem to work on DOM listeners in ST
            }, me/*, { delegate : '.ubergrid-header-column' }*/)
        })
    },

    
    onHeaderTap : function (header, column, headerEl, event, simpleGrid) {
        if (!column.sortable) return
        
        var field           = column.getField()

        // TODO - do we need to support multiple sorters? like grid is sorted in several columns and we change the
        // sorting direction in one of them
        if (field) {
            var store       = this.store,
                firstSorter = store.getSorters()[ 0 ];

            if (firstSorter && firstSorter.getProperty() === field) {
                store.sort(field, firstSorter.getDirection() == 'ASC' ? 'DESC' : 'ASC');
            } else {
                store.sort({
                    property    : field,
                    direction   : 'ASC'
                });
            }
        }
    },
    
    
//    onFirstPainted : function () {
////        console.log('header painted')
//        
//        this.createCSSRules()
//        
//        this.refresh()
//    },
    
    
    createCSSRules : function () {
        var me              = this
        
        this.columns.forEachLeaf(function (column, index) {
            me.createCSSRuleFor(column)
        })
        
        // a "total width" rule 
        var styleSheet      = this.getStyleSheet()
        var cssRules        = styleSheet.cssRules
        
        if (this.tabularView.buffered)
            styleSheet.insertRule('#' + this.baseIdColumns + ' > div > .ubergrid-row {}', cssRules.length)
        else
            styleSheet.insertRule('#' + this.baseIdTotalWidth + ' {}', cssRules.length)

        var rule            = this.rulesCache.$totalWidth = cssRules[ cssRules.length - 1 ]
        
        rule.style.width    = this.columns.getTotalWidth() + 'px'
        
        this.rulesCreated   = true
    },
    
    
    createCSSRuleFor : function (column) {
        var selector
        var buffered        = this.tabularView.buffered
        
        if (buffered)
            selector        = '#' + this.baseIdColumns + ' > div > div > .ubergrid-column-' + column.id
        else
            selector        = '#' + this.baseIdColumns + ' > .ubergrid-column-' + column.id
            
        var styleSheet      = this.getStyleSheet()
        var cssRules        = styleSheet.cssRules
        
        styleSheet.insertRule(selector + ' {}', cssRules.length)

        var rule            = this.rulesCache[ column.id ] = cssRules[ cssRules.length - 1 ]
        
        if (buffered) 
            rule.style.left = this.columns.getLeafOffset(column) + 'px'
            
        rule.style.width    = column.getWidth() + 'px'
        
        return rule
    },
    
    
    getStyleSheet : function () {
        if (this.styleSheet) return this.styleSheet
        
        var styleTag        = this.styleTag = document.createElement('style')
        
        styleTag.setAttribute('type', 'text/css')
        styleTag.setAttribute('rel', 'stylesheet')
        
        document.getElementsByTagName('head')[ 0 ].appendChild(styleTag)
        
        return this.styleSheet  = styleTag.sheet
    },
    
    
    getElementConfig: function() {
        return {
            reference   : 'element',
            className   : 'x-container',

            children    : [
                {
                    // XXX do we need this innerElement? perhaps its just an extra wrapper 
                    reference   : 'innerElement',
                    className   : 'x-inner',

                    children    : [
                        {
                            reference   : 'wrapperElement',
                            className   : 'ubergrid-header-wrap'
                        }
                    ]
                }
            ]
        };
    },
    
    
    distributeAvailableWidth : function () {
        this.widthDistributed   = true
        
        return this.columns.distributeAvailableWidth(this.element.getWidth())
    },
    
    
    refreshColumnWidths : function () {
        if (!this.isPainted() || !this.widthDistributed || !this.rulesCreated) return
        
        this.onColumnWidthChange()
    },


    /**
     * This method refreshes the DOM element of the header and fires the {@link #event-refresh} event.
     */
    refresh : function () {
        if (!this.isPainted()) return
        
        if (!this.widthDistributed) this.distributeAvailableWidth()
        if (!this.rulesCreated) this.createCSSRules()
        
        var columns     = this.columns

        this.wrapperElement.setStyle('width', columns.getTotalWidth() + 'px')

        this.renderTpl.overwrite(this.wrapperElement, {
            structure       : columns.snapshotRenderData(),
            widths          : columns.gatherWidths(),
            totalWidth      : columns.getTotalWidth(),
            sortClasses     : this.gatherSortClasses()
        });

        /**
         * @event refresh
         * @param {UbeGrid.Header} header A header that was refreshed.
         */
        this.fireEvent('refresh', this);
    },


    syncHeaderPosition : function (x, y) {
        this.wrapperElement.translate(-x, 0, 0);
    },
    
    
    gatherSortClasses : function () {
        var sorters                 = this.store.getSorters()
        
        var sortClassesByColumnId   = {}
        var sortersByField          = {}
        
        sorters.forEach(function (sorter) {
            var property    = sorter.getProperty()
            
            if (property) sortersByField[ property ] = sorter
        })
        
        this.columns.forEachLeaf(function (column) {
            var field       = column.getField()
            
            if (column.sortable && field && sortersByField[ field ]) sortClassesByColumnId[ column.id ] = 'ubergrid-header-sort-' + sortersByField[ field ].getDirection()
        })
        
        return sortClassesByColumnId
    },
    
    
    destroy : function () {
        var styleTag        = this.styleTag
        
        if (styleTag) {
            styleTag.parentNode.removeChild(styleTag)
            this.styleTag   = this.styleSheet = null
        }
        
        this.rulesCache     = null

        this.bindStore(null);

        this.callParent()
    },

    forEachLeaf : function(iterator, scope) {
        scope = scope || this;

        this.columns.forEachLeaf(iterator, scope);
    }
});
