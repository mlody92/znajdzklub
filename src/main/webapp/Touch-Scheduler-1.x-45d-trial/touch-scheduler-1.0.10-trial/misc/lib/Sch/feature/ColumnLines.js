/**
@class Sch.feature.ColumnLines
@extends Sch.plugin.Lines

A simple feature adding column lines (to be used when using the SingleTimeAxis column).

*/
Ext.define("Sch.feature.ColumnLines", {
    extend : 'Sch.plugin.Lines',

    requires : [
        'Ext.data.JsonStore',
        'Sch.model.Date'
    ],
    
    
    cls                     : 'sch-column-line',
    
    showTip                 : false,
    
    timeAxisViewModel       : null,
    
    renderingDoneEvent      : 'columnlinessynced',

    
    init : function (panel) {
        this.timeAxis           = panel.getTimeAxis();
        this.timeAxisViewModel  = panel.timeAxisViewModel;
        this.panel              = panel;

        this.store = new Ext.data.Store({
            model   : 'Sch.model.Date'
        });

        // Sencha Touch normalization
        this.store.loadData = this.store.loadData || this.store.setData;

        this.callParent(arguments);

        panel.on({
            modechange          : this.populate,
            scope               : this
        });

        this.timeAxisViewModel.on('update', this.populate, this);
        
        this.populate();
    },

    destroy : function() {
        this.timeAxisViewModel.un('update', this.populate, this);

        // Required for Sencha Touch where all stores get registered in the global Ext.StoreManager
        if (this.store.destroyStore) {
            this.store.destroyStore();
        } else {
            this.store.destroy();
        }

        this.callParent(arguments);
    },

    populate: function() {
        this.store.loadData(this.getData());
    },
    
    getElementData : function() {
        var sv = this.schedulerView;

        if (sv.isHorizontal() && sv.store.getCount() > 0) {
            return this.callParent(arguments);
        }

        return [];
    },

    getData : function() {
        var panel = this.panel,
            ticks = [];

        if (panel.isHorizontal()) {
            var timeAxisViewModel   = this.timeAxisViewModel;
            var linesForLevel       = timeAxisViewModel.columnLinesFor;
            var hasGenerator        = !!(timeAxisViewModel.headerConfig && timeAxisViewModel.headerConfig[linesForLevel].cellGenerator);

            if (hasGenerator) {
                var cells = timeAxisViewModel.getColumnConfig()[linesForLevel];

                for (var i = 1, l = cells.length; i < l; i++) {
                    ticks.push({ Date : cells[i].start });
                }
            } else {
                timeAxisViewModel.forEachInterval(linesForLevel, function(start, end, i) {
                    if (i > 0) {
                        ticks.push({ Date : start });
                    }
                });
            }
        }

        return ticks;
    }
});