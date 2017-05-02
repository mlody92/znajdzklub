Ext.define('MyResource', {
    extend : 'Sch.model.Resource',
    config : {
        fields : [
            'Cls' // an extra field for our resources
        ]
    }
})

Ext.setup({

    onReady : function () {
        var generateRows = function (count) {
            var retVal = [];

            for (var i = 0; i < count; i++) {
                retVal.push({
                    Id   : i + 1,
                    Cls  : 'someCls',        // Enable row based styling
                    Name : 'Employee #' + i
                });
            }
            return retVal;
        };


        var resourceStore = new Sch.data.ResourceStore({
            model : 'MyResource',
            data  : generateRows(8)
        })

        var eventStore = new Sch.data.EventStore({
            data : (function () {
                // Add a stable first task for testing
                var events = [{
                    StartDate  : new Date(2012, 2, 1, 0),
                    EndDate    : new Date(2012, 2, 1, 3),
                    Name       : 'Test Task',
                    ResourceId : 1,
                    Cls        : 'icon-1'
                }];

                for (var i = 0; i < resourceStore.getCount(); i++) {
                    var startH = Math.floor(16 * Math.random()) + 1;
                    var endH = startH + Math.floor(3 * Math.random()) + 3;

                    events.push({
                        StartDate  : new Date(2012, 2, 1, startH),
                        EndDate    : new Date(2012, 2, 1, endH),
                        Name       : 'Some Task',
                        ResourceId : i + 1,
                        Cls        : 'icon-' + (i % 5 + 1)
                    });
                }
                return events;
            })()
        });

        var resourceTemplate = new Ext.Template('<img src="images/user.png"/><dl><dt>{Name}</dt><dd>Web Developer</dd></dl>')

        var scheduler = new Sch.panel.SchedulerGrid({

            startDate : new Date(2012, 2, 1),
            endDate   : new Date(2012, 2, 2),

            eventRenderer : function (event) {
                return event.getName();
            },

            rowHeight                 : 65,
            compactRowHeightThreshold : 40,
            minRowHeight              : 40,
            viewPreset                : 'hourAndDay',
            headerHeight              : 65,
            columns                   : [
                {
                    header   : 'Name',
                    field    : 'Name',
                    locked   : true,
                    width    : 200,
                    renderer : function (v, m, r) {
                        m.cellCls = 'Name';
                        return resourceTemplate.apply(r.data);
                    }
                }
            ],

            getRowCls : function (rec) {
                return rec.get('Cls');
            },

            onEventCreated : function (newEventRecord) {
                // Supply default record values etc.
                newEventRecord.set({
                    Name : 'New task'
                });
            },

            barMargin     : 3,
            resourceStore : resourceStore,
            eventStore    : eventStore
        })

        Ext.Viewport.add([
            // Docked toolbar
            {
                xtype  : 'toolbar',
                docked : 'top',

                // Give it 1 item which is a segmented button
                items  : [
                    {
                        text    : 'Compact rows',
                        handler : function () {
                            scheduler.getSchedulingView().setRowHeight(40);
                        }
                    },
                    {
                        text    : 'Large rows',
                        handler : function () {
                            scheduler.getSchedulingView().setRowHeight(80);
                        }
                    }
                ]
            },
            scheduler
        ]);
    }
});
