/**
@class Sch.column.HorizontalScheduler
@extends UberGrid.column.Column
@private

A private custom column class encapsulating the rendering of the vertical time axis header.
*/
Ext.define('Sch.column.VerticalScheduler', {
    extend          : 'UberGrid.column.Column',
    alias           : 'widget.verticalschedulercolumn',

    requires        : [
        'Sch.view.HorizontalTimeAxis'
    ],

    align               : 'right',
    locked              : true,
    timeAxisViewModel   : null,
    timeAxis            : null,
    scheduler           : null,
    flex                : 1,
    headerCmp           : null,
    headerCls           : 'sch-verticaltimeaxis-header',
    
    cellTopBorderWidth      : null,
    cellBottomBorderWidth   : null,
    

    constructor     : function(config) {
        this.callParent(arguments);
        this.cellCls = (this.cellCls || '') + ' sch-verticaltimeaxis-cell';
        this.scope = this;

        this.totalBorderWidth = this.cellTopBorderWidth + this.cellBottomBorderWidth;

        this.scheduler.on('resize', this.onContainerResize, this);
    },

    onContainerResize : function (el) {
        this.timeAxisViewModel.setAvailableWidth(this.scheduler.lockedGrid.bodyCmp.element.getHeight());
    },

    renderer : function (val, meta, record, rowIndex) {
        var bottomHeader    = this.timeAxisViewModel.getBottomHeader();

        meta.style          = 'height:' + (this.timeAxisViewModel.getTickWidth() - this.totalBorderWidth) + 'px';

        if (bottomHeader.renderer) {
            return bottomHeader.renderer.call(bottomHeader.scope || this, record.data.start, record.data.end, meta, rowIndex);
        } else {
            return Ext.Date.format(record.data.start, bottomHeader.dateFormat);
        }
    }
});



