Ext.Loader.setPath({
    "App" : 'lib'
});

Ext.setup({
    requires : [
        'App.model.Task',
        'App.model.Resource'
    ],

    onReady : function () {

        var resStore = new Sch.data.ResourceStore({
            model : "App.model.Resource",

            data : [
                { Id : 1, Name : 'Ben' },
                { Id : 2, Name : 'Bob' },
                { Id : 3, Name : 'Kate' }
            ]
        });

        var eventStore = new Sch.data.EventStore({
            model    : "App.model.Task",
            autoLoad : true,
            proxy    : {
                type   : 'ajax',
                url    : 'data.js',
                reader : {
                    type : 'json'
                }
            }
        });

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate : new Date(2012, 2, 1, 5),
            endDate   : new Date(2012, 2, 1, 20),

            stripeRows          : false,
            rowHeight           : 60,
            viewPreset          : 'hourAndDay',
            enableEventDragDrop : false,
            enableEventPinch    : false,
            enableEventCreate   : false,
            columns             : [
                {
                    header    : 'Name',
                    dataIndex : 'Name',
                    locked    : true,
                    width     : 100,
                    align     : 'left'
                },
                {
                    dataIndex : 'Capacity',
                    locked    : true,
                    width     : 100,
                    renderer  : function (v, m, r) {
                        return '<div>Planned</div><div>Actual</div>';
                    }
                }
            ],

            viewConfig    : {
                managedEventSizing : false,
                dynamicRowHeight   : false
            },
            barMargin     : 0,
            resourceStore : resStore,
            eventStore    : eventStore
        });

        Ext.Viewport.add([
            scheduler
        ]);
    }
});

