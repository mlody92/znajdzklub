Ext.define('TitleLabel', {
    extend : 'Ext.Label',

    dateTpl : new Ext.XTemplate('<dl class="titlelabel"><dt>Week {[fm.date(values.date, "W")]}</dt><dd>{[fm.date(values.date, "F Y")]}</dd></dl>'),

    update : function (date) {
        this.setHtml(this.dateTpl.apply({date : date}));
    }
});

/*
 * Simple experimental sample to create a smart phone friendly view on a smaller screen
 * */
Ext.setup({

    onReady : function () {
        var preset = Sch.preset.Manager.getPreset('weekDateAndMonth');
        preset.defaultSpan = 1;
        preset.headerConfig.bottom = { unit : 'd', dateFormat : 'd' };

        var resourceStore = new Sch.data.ResourceStore({
            data : [
                { Id : 1, Name : 'John' },
                { Id : 2, Name : 'Don' },
                { Id : 3, Name : 'Steve' },
                { Id : 4, Name : 'Dave' }
            ]
        })

        var eventStore = new Sch.data.EventStore();

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate : new Date(),

            // Force compact mode, normally only enabled when viewing on a phone
            compactMode : true,

            viewPreset : 'weekDateAndMonth',

            resourceStore : resourceStore,
            eventStore : eventStore,
            forceFit : true,

            leftSidePullConfig : {
                shiftSteps  : [
                    { amount : -1, unit : Sch.util.Date.WEEK },
                    { amount : -5, unit : Sch.util.Date.WEEK }
                ]
            },
            rightSidePullConfig : {
                shiftSteps  : [
                    { amount :  1, unit : Sch.util.Date.WEEK },
                    { amount :  5, unit : Sch.util.Date.WEEK }
                ]
            }
        });

        var titleLabel = new TitleLabel({
        });

        scheduler.on('viewchange', function (scheduler) {
            titleLabel.update(scheduler.getStart());
        });

        Ext.Viewport.add([
            {
                xtype : 'toolbar',
                ui : 'light',
                docked : 'top',
                padding : '5px 0',
                items : [
                    {
                        ui : 'grey',
                        cls : 'nav-button',
                        iconCls : 'arrow-right flip-horizontal',
                        handler : function () {
                            scheduler.shiftPrevious();
                        }
                    },
                    {
                        xtype : 'spacer'
                    },
                    titleLabel,
                    {
                        xtype : 'spacer'
                    },
                    {
                        ui : 'grey',
                        cls : 'nav-button',
                        iconCls : 'arrow-right',
                        handler : function () {
                            scheduler.shiftNext();
                        }
                    },
                ]
            },
            scheduler
        ]);

        var start = scheduler.getStart();

        eventStore.add([
            new Sch.model.Event({
                Id : 1,
                ResourceId : 1,
                Name : 'Task 1',
                StartDate : Ext.Date.add(start, Ext.Date.DAY, 1),
                EndDate : Ext.Date.add(start, Ext.Date.DAY, 3)
            }, 1),
                new Sch.model.Event({
                Id : 2,
                ResourceId : 2,
                Name : 'Task 2',
                StartDate : Ext.Date.add(start, Ext.Date.DAY, 4),
                EndDate : Ext.Date.add(start, Ext.Date.DAY, 6)
            }, 2),
            new Sch.model.Event({
                Id : 3,
                ResourceId : 3,
                Name : 'Task 3',
                StartDate : Ext.Date.add(start, Ext.Date.DAY, 2),
                EndDate : Ext.Date.add(start, Ext.Date.DAY, 3)
            }, 3)
        ]);

        titleLabel.update(scheduler.getStart());
    }
});


