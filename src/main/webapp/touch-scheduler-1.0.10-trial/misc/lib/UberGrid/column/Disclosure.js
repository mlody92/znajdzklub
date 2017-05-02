/**
@class UberGrid.column.Disclosure

This is a subclass of the base {@link UberGrid.column.Column} class, which shows a disclosure icon. On tap, the containing grid panel will fire
 a 'disclose' event to let the world know. On such an event, you typically show the details of a row in a form or popup.

*/

Ext.define('UberGrid.column.Disclosure', {
    extend      : 'UberGrid.column.Column',

    width       : 50,

    // Only count taps on the disclosure icon
    targetDelegate : '.ubergrid-disclosure',

    config      : {
        /**
         * @cfg {String} disclosureProperty
         * A property to check on each record to display the disclosure on a per record basis.  This
         * property must be false to prevent the disclosure from being displayed on the item.
         * @accessor
         */
        disclosureProperty: 'disclosure'
    },

    constructor : function () {
        this.callParent(arguments)

        if (!this.renderer) {
            this.renderer   = this.disclosureRenderer
            this.scope      = this
        }
    },

    disclosureRenderer : function (value, meta, record, rowIndex, colIndex, store, column) {

        var prop = this.getDisclosureProperty();

        if (prop && record.data[prop] === false) {
            return '';
        }

        return '<div class="ubergrid-disclosure"></div>';
    },

    onCellTap : function(record, rowIndex, grid, subGrid, event) {
        grid.fireEvent('disclose', grid, record, rowIndex, event);
    }
});