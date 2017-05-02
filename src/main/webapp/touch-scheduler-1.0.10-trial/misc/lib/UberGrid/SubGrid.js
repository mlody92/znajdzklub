/**
@class UberGrid.SubGrid
@aside guide ubergrid_getting_started

This class represents a section (or "subgrid") of the whole {@link UberGrid.Panel}. Usually you don't need to instatiate it manually, as the main panel will do it for you.

*/
Ext.define('UberGrid.SubGrid', {

    extend      : 'Ext.Container',

    alias       : 'widget.UberGrid-Simple',

    requires    : [
        'UberGrid.Header',
        'UberGrid.column.Column',
        'UberGrid.Body'
    ],
    
    config      : {
        /**
         * @ignore
         */
        baseCls     : 'ubergrid-simple',

        /**
         * @cfg {String} sortTriggerEvent The event that should trigger a column sort. Defaults to 'headersingletap'.
         */
        sortTriggerEvent : 'headersingletap'
    },

    /**
     * @property {String} type A type of this section. Can be one of the "normal/locked/right". Section will contain only the columns of a matching type.
     */
    type                : 'normal',

    /**
     * @property {UberGrid.column.Column} columns A root column for this section. Note, that it will contain only the columns of a matching type.  
     */
    columns             : null,
    
    /**
     * @property {Ext.data.Store} store A reference to a store of the main panel.  
     */
    store               : null,
    
    /**
     * @property {UberGrid.model.TabularView} tabularView A reference to a {@link UberGrid.model.TabularView tabular view} of the main panel.  
     */
    tabularView         : null,

    /**
     * @property {Number} headerHeight A header height. This value is translated from the {@link UberGrid.Panel#headerHeight headerHeight} config of the main panel.
     */
    headerHeight        : 80,

    /**
     * @property {UberGrid.Header} headerCmp A reference to the {@link UberGrid.Header header} instance of this grid section
     */
    headerCmp           : null,
    
    /**
     * @property {UberGrid.Body} bodyCmp A reference to the {@link UberGrid.Body body} instance of this grid section 
     */
    bodyCmp             : null,

    /**
     * @property {Object} headerConfig A config object for the {@link UberGrid.Header header} for this grid.
     */
    headerConfig        : null,

    /**
     * @property {Object} scrollConfig An object defining the scrollable behavior of the grid body.
     */
    scrollConfig        : null,

    prevX               : null,
    
    columnLines         : true,
    stripeRows          : true,
    

    initialize : function () {
        var config      = this.config
        
        // was known as Ext.apply(this, config) previously
        for (var name in config) {
            if (config.hasOwnProperty(name) && name !== 'xtype' && name !== 'xclass' && !this.hasConfig(name)) {
                this[ name ] = config[ name ];
            }
        }        

        this.callParent()

        var columns             = this.columns
        var store               = this.store

        if (!columns)           throw "`columns` attribute is required for `UberGrid.SubGrid`";
        if (!store)             throw "`store` attribute is required for `UberGrid.SubGrid`";

        this.setLayout('vbox')
        
        var baseIdColumns       = this.getId() + '-columns'
        var baseIdTotalWidth    = this.getId() + '-total'
        
        var tabularView         = this.tabularView

        this.add([
            Ext.apply({
                xclass              : 'UberGrid.Header',

                height              : this.headerHeight,

                tabularView         : tabularView,
                columns             : columns,
                store               : store,
                
                baseIdColumns       : baseIdColumns,
                baseIdTotalWidth    : baseIdTotalWidth
            }, this.headerConfig),
            {
                xclass              : 'UberGrid.Body',

                flex                : 1,
                
                columnLines         : this.columnLines,
                stripeRows          : this.stripeRows,

                store               : store,
                columns             : columns,
                tabularView         : tabularView,
                
                baseIdColumns       : baseIdColumns,
                baseIdTotalWidth    : baseIdTotalWidth,
                scrollConfig        : this.scrollConfig
            }
        ])

        this.headerCmp      = this.items.getAt(0)
        this.bodyCmp        = this.items.getAt(1)

        tabularView.addScrollObserver(this)
    },
    
    
    bindStore : function (store) {
        this.headerCmp.bindStore(store)
    },


    onUserBodyTranslate : function (methodName, x, y, sourceBody) {
        if (sourceBody == this.bodyCmp && this.prevX != x) {
            this.headerCmp.syncHeaderPosition(-x, -y)
            this.prevX      = x
        }
    },


    getBubbleTarget: function () {
        return this.parent
    },

    /**
     * This method returns the current height of the body's DOM element.
     * 
     * @return {Number}
     */
    getBodyElHeight : function () {
        return this.bodyCmp.element.getHeight()
    },
    
    
    /**
     * Returns a dom element of some record's row or `null` if it can not be found.
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of the record in the {@link #store} or the record instance itself. 
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element. 
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getRow : function (rowIndex, returnElement) {
        return this.bodyCmp.getRow(rowIndex, returnElement)
    },
    
    
    /**
     * Returns a DOM element for a cell in this sub grid or `null` if it can not be found.
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of the record in the {@link #store} or the record instance itself.
     * @param {Number/String/UberGrid.column.Column} cellIndex Can be a number - index of column **between all columns of this subgrid only**, 
     * a string with column {@link UberGrid.column.Column#id id} or a column instance itself.
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element.
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getCell : function (rowIndex, cellIndex, returnElement) {
        return this.bodyCmp.getCell(rowIndex, cellIndex, returnElement)
    }
});
