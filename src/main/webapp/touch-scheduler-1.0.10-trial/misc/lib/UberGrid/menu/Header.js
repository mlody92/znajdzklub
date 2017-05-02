/**
@class UberGrid.menu.Header
This plugin allows to toggle columns visibility.

    var ubergrid = new UberGrid.Panel({
        columns     : [
            {
                header      : 'Name',
                headerCls   : 'app-header-name',

                cellCls     : 'app-data-name',

                renderer    : function (value, meta, record, rowIndex, colIndex, store, column) { ... },
            },
            new UberGrid.column.Date({
                header      : 'Start date',
                field       : 'startDate'
            }),
            {
                xclass      : 'UberGrid.column.Date',
                header      : 'End date',
                field       : 'endDate'
            }
        ],

        plugins : new UberGrid.menu.Header()
    });

 */
Ext.define('UberGrid.menu.Header', {
    extend : 'Ext.ActionSheet',
    alias  : 'plugin.headermenu',

    config : {
        docked       : 'bottom',
        triggerEvent : 'headertap',
        menuItems    : null,
        grid         : null,
        /**
         * @cfg {String} okText The text to show on the ok button
         */
        okText       : 'OK'
    },

    /**
     * @event beforeshow Fires before the menu is shown, return false to prevent the menu from showing.
     * @param {UberGrid.menu.Header} this
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */

    /**
     * @event show Fires after the menu has been shown
     * @param {UberGrid.menu.Header} this
     * @param {UberGrid.column.Column} column A column instance on which the event has happened
     * @param {HTMLElement} headerEl A DOM element of the header cell
     * @param {UberGrid.SubGrid} simpleGrid A grid section instance
     * @param {Ext.event.Event} event An instance of the Ext.event.Event for this event
     */

    init : function (grid) {
        this.setGrid(grid);

        grid.on(this.getTriggerEvent(), this.onActivate, this);
    },

    refreshMenuItems : function () {
        var grid = this.getGrid();
        var me = this;
        var headers = grid.query('UberGrid-Header');

        this.removeAll(true);

        headers.forEach(function (header) {
            header.forEachLeaf(function (column) {
                var field = new Ext.field.Toggle({
                    label : column.getHeader(),
                    value : column.isHidden() ? 0 : 1
                });

                field.column = column;

                me.add(field);

                field.on({
                    change : me.onToggleChange,
                    scope  : me
                });
            });
        });

        this.add({
            text    : this.getOkText(),
            ui      : 'confirm',
            handler : function () {
                me.hide();
            }
        });
    },

    onToggleChange : function (field, newValue) {
        field.column[newValue ? 'show' : 'hide']();
    },

    onActivate : function (header, column, el, subGrid, ev) {
        var grid = this.getGrid();

        if (column.isLeaf() && this.fireEvent('beforeshow', this, column, el, subGrid, ev) !== false) {
            if (!this.getParent()) {
                grid.add(this);
            }

            this.refreshMenuItems();
            this.show();
            this.fireEvent('show', this, column, el, subGrid, ev);
        }
    }
});