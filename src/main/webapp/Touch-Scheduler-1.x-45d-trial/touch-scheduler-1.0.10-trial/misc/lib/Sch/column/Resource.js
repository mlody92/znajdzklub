/*
 @class Sch.column.Resource
 @extends Ext.grid.Column
 @private

 A Column representing a resource, used only in vertical orientation

 */
Ext.define("Sch.column.Resource", {
    extend          : 'UberGrid.column.Column',

    alias           : "widget.resourcecolumn",
    headerCls       : 'sch-resourcecolumn-header',

    /**
     * Default resource column properties
     */
    align           : 'center',
    sortable        : false,
    locked          : false,
    lockable        : false,
    draggable       : false,
    cellCls         : 'sch-timetd',

    // associated resource instance
    model           : null
});