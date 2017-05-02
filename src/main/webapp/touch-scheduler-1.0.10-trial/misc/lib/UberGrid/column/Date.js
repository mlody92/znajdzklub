/**
@class UberGrid.column.Date

This is a subclass of the base {@link UberGrid.column.Column} class, which provides a default {@link UberGrid.column.Column#renderer}, simplifying rendering of the dates.
You can directly specify the {@link #format} to render the date in.

*/

Ext.define('UberGrid.column.Date', {
    extend      : 'UberGrid.column.Column',
    
    requires    : [
        'Ext.DateExtras'
    ],
    
    /**
     * @cfg {String} format The format to render the date in. See <a href="http://docs.sencha.com/touch/2-1/#!/api/Ext.Date">Ext.Date</a> documentation for details about supported formats.
     */
    format      : null,
    
    
    constructor : function () {
        this.callParent(arguments)
        
        this.format     = this.format || Ext.Date.defaultFormat
        
        // still allow user to override the renderer
        if (!this.renderer) {
            this.renderer   = this.dateRenderer
            this.scope      = this
        }
    },
    
    
    dateRenderer : function (value) {
        // value is a date? 
        if (value && value.toLocaleTimeString) return Ext.Date.format(value, this.format)
    }

});