/**
@class UberGrid.model.Row

This class represents a data row in the grid. Note that this is a "model" row, and not its visual presentation. 
A row contains {@link #columnsData cells for all columns}. All grid sections share the same row instance, but renders
only a relevant part of it.

*/
Ext.define('UberGrid.model.Row', {
    
    /**
     * @property {Number} offsetTop
     * 
     * Vertical offset of the top row pixel. This property is only maintained in the buffered rendering mode.
     */
    offsetTop               : 0,
    
    /**
     * @property {Number} offsetBottom
     * 
     * Vertical offset of the bottoms row pixel. This property is only maintained in the buffered rendering mode.
     * 
     * Note, that a row of 1px height will have same values for {@link #offsetTop} and `offsetBottom`.
     */
    offsetBottom            : null,

    /**
     * @property {String} cls One or several CSS classes separated with space to be added to this row's DOM element  
     */
    cls                     : null,
    
    /**
     * @property {Number} height A height of this row  
     */
    height                  : 0,
    
    /**
     * @property {Array[ Object ]} columnsData An array of data for rendering data cells. Every element is an object with the following properties:
     * @property {UberGrid.column.Column} columnsData.column A column instance
     * @property {String} columnsData.value An value for data cell - HTML string
     * @property {String} columnsData.cellCls A string with one or several CSS classes to be added to the cell's DOM element
     * @property {String} columnsData.cellStyle A string with CSS style declarations to be added to the cell's DOM element
     * @property {String} columnsData.cellAttr A string with additional attributes to be added to the cell's DOM element
     * @property {Object} columnsData.meta A "meta" object passed to the column's {@link UberGrid.column.Column#renderer renderer}
     */
    columnsData             : null,

    /**
     * @property {String} recordInternalId A value of `internalId` property of the record this row is based on.
     */
    recordInternalId        : null,
    
    /**
     * @property {Ext.data.Model} record A record instance this row is based on.
     */
    record                  : null,
    
    
//    domCache                : null,
    
    
    /** @ignore */
    constructor : function (config) {
        Ext.apply(this, config)
        
        if (this.record) this.recordInternalId = this.record.internalId;
        
        if (this.offsetBottom == null) this.offsetBottom = this.offsetTop + this.height - 1
        
//        this.domCache       = {}
    },
    
    
    /**
     * This method updates both {@link #offsetTop} and {@link #offsetBottom}, based on the current {@link #height}
     * 
     * @param {Number} value New offset top value
     */
    setOffsetTop : function (value) {
        this.offsetTop      = value
        this.offsetBottom   = value + this.height - 1
    }
});
