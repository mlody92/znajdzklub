/***
 *
 * @class Sch.column.HorizontalScheduler
 * @extends UberGrid.column.Column
 * @private
 *
 * A private custom column class encapsulating the rendering of the {@link Sch.view.HorizontalTimeAxis time axis} header.
 */
Ext.define('Sch.column.HorizontalScheduler', {
    extend          : 'UberGrid.column.Column',
    alias           : 'widget.horizontalschedulercolumn',

    requires        : [
        'Sch.view.HorizontalTimeAxis'
    ],
    
    headerCls           : 'sch-simple-timeaxis',
    
    cellCls             : 'sch-timetd',

    headerView          : null,
    
    timeAxisViewModel   : null,
    timeAxis            : null,
    scheduler           : null,

    headerCmp           : null,
    height              : null,
//    ctEl            : null,

    /**
     * @cfg {Int} compactCellWidthThreshold The minimum width for a bottom row header cell to be considered 'compact', which adds a special CSS class to the row. 
     */
    compactCellWidthThreshold : 26,
    
    
    constructor     : function(config) {
        this.callParent(arguments);
        
        var scheduler               = this.scheduler;
        
        this.headerView             = new Sch.view.HorizontalTimeAxis({
            trackHeaderOver             : false,
            height                      : this.height,
            baseCls                     : 'sch-column-header',
            tableCls                    : 'sch-header-row-table',
            model                       : this.timeAxisViewModel,
            compactCellWidthThreshold   : this.compactCellWidthThreshold
        });

        this.headerRenderer         = this.headerRendererFunc;
        this.headerRendererScope    = this;
        
        this.timeAxisViewModel.on({
            update      : this.onModelUpdate,
            scope       : this
        });
    },

    headerRendererFunc : function (text, meta, column) {
        var html            = this.headerView.getHTML();
        
        return html;
    },

    setAvailableWidth : function (value) {
        // will trigger an update in model and in turn - set our width
        this.timeAxisViewModel.setAvailableWidth(value);
    },
    
    
    onModelUpdate : function () {
        this.scheduler.getSchedulingView().refreshKeepingScroll();
        this.setWidth(this.timeAxisViewModel.getTotalWidth());
    },

    destroy : function() {
        this.headerView.destroy();

        this.callParent(arguments);
    }
});



