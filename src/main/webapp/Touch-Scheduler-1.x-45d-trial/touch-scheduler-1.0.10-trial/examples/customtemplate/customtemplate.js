Ext.setup({
    
    onReady: function () {

        var resourceStore = new Sch.data.ResourceStore({
            data: [
                { Id : 1, Name : 'Johnny Johnson' },
                { Id : 2, Name : 'Don Johnson' },
                { Id : 3, Name : 'Steve' },
                { Id : 4, Name : 'Pamela' },
                { Id : 5, Name : 'Johnny' },
                { Id : 14, Name : 'Azamat Bagatov' }
            ]
        })

        var eventStore = new Sch.data.EventStore({
            data: [
                {
                    Id: 1,
                    ResourceId: 1,
                    Name: 'Task #1',
                    StartDate: new Date(2012, 2, 1, 12),
                    EndDate: new Date(2012, 2, 4)
                },
                {
                    Id: 2,
                    ResourceId: 3,
                    Name: 'Task #2',
                    StartDate: new Date(2012, 2, 2),
                    EndDate: new Date(2012, 2, 4, 12)
                },
                {
                    Id: 3,
                    ResourceId: 4,
                    Name: 'Task #3',
                    StartDate: new Date(2012, 2, 3),
                    EndDate: new Date(2012, 2, 5)
                }
            ]
        })

        var scheduler = new Sch.panel.SchedulerGrid({
            id : 'firstScheduler',
            startDate: new Date(2012, 2, 1),
            endDate: new Date(2012, 2, 16),
            title : 'First Schedule',
            lockedWidth: 180,
            rowHeight : 65,
            viewPreset: 'dayAndWeek',
            eventBodyTemplate : '<div class="remove"></div>'+ 
                                '<dl>' + 
                                    '<dt>{[values.Name || "New task" ]}</dt>' + 
                                    '<dd>Starts: {[Ext.Date.format(values.StartDate, "M d g:i A")]}</dd>' + 
                                    '<dd>Ends: {[Ext.Date.format(values.EndDate, "M d g:i A")]}</dd>' + 
                                '</dl>',
            columns: [
                {
                    header: 'Name',
                    field: 'Name',
                    locked: true,
                    width: 200
                },
                {
                    header: 'Foo column',
                    renderer : function() { return 'foo'; },
                    locked: true,
                    width: 100
                },
                {
                    header: 'Bar column',
                    renderer : function() { return 'bar'; },
                    locked: true,
                    width: 100
                }
            ],

            barMargin: 10,
            resourceStore: resourceStore,
            eventStore: eventStore
        })

        var scheduler2 = new Sch.panel.SchedulerGrid({
            startDate: new Date(2012, 2, 1),
            endDate: new Date(2012, 2, 16),
            title : 'Second Schedule',
            lockedWidth: 200,
            rowHeight : 35,
            viewPreset: 'dayAndWeek',
            eventBodyTemplate : '{Id}: {Name}',
            columns: [
                {
                    header: 'Name',
                    field: 'Name',
                    locked: true,
                    width: 200
                }
            ],

            barMargin: 2,
            resourceStore: resourceStore,
            eventStore: eventStore
        })

        Ext.Viewport.add([
            {
                xtype : 'tabpanel',
                items : [
                    scheduler,
                    scheduler2
                ]
            }
        ]);

        scheduler.on({
            eventtap : function(sch, rec, t, e) {
                
                if (e.getTarget('.remove')) {
                    eventStore.remove(rec);
                    e.stopPropagation()
                }
            }
        });
    }
});


