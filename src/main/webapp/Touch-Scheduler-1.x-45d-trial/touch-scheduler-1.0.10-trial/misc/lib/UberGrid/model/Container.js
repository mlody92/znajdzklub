/**
@class UberGrid.model.Container

This class represents a reusable container for a data row in the grid. This abstraction is only used in buffered rendering mode.

* ** Please do not rely on the existance of this class, as it is likely to be refactored out in one of the future releases.**

*/

(function () {

    var ID      = 1;

    Ext.define('UberGrid.model.Container', {
        
        /**
         * @property {Number} id An auto-generated id of this container
         */
        id                      : null,

        /**
         * @property {UberGrid.model.Row} row A reference to the current row. Can be set to `null` if container has no rows (is not used), but still kept in the DOM.
         */
        row                     : null,

        /**
         * @property {UberGrid.model.TabularView} tabularView A reference to the tabular view
         */
        tabularView             : null,


        /**
         * A constructor for the container. Will {@link UberGrid.model.TabularView#fireRowAction fire} a `onNewContainer` row action on the provided tabular view.
         */
        constructor : function (config) {
            Ext.apply(this, config)

            if (!this.id) {
                this.id       = ID++;
            }

            if (this.tabularView.buffered) this.tabularView.fireRowAction('onNewContainer', this)
        },


        /**
         * This method sets the current row instance for this container. It will {@link UberGrid.model.TabularView#fireRowAction fire} 
         * a `onContainerSetRow` row action on the provided tabular view.
         * 
         * @param {UberGrid.model.Row} row A new row instance for this container or `null` if container should be emptied (but kept in DOM).
         */
        setRow : function (row) {
            this.row        = row

            if (this.tabularView.buffered) this.tabularView.fireRowAction('onContainerSetRow', this, row)
        },
        
        
        /**
         * This method should be called once, when this container should be removed from the DOM. It will {@link UberGrid.model.TabularView#fireRowAction fire} 
         * a `onContainerRemoved` row action on the provided tabular view.
         */
        remove : function () {
            this.tabularView.fireRowAction('onContainerRemoved', this)
        }
    });
    
})();

