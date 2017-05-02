Ext.setup({
    
    onReady: function () {

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data : [
                { Id : 1, Name : 'Mike' },
                { Id : 2, Name : 'Anna' },
                { Id : 3, Name : 'Dan' }
            ]
        });
    
        // Store holding all the events
        var blockedDatesStore = new Sch.data.EventStore({
            data : [
                {
                    ResourceId : 1,
                    StartDate : new Date(2011, 0, 6),
                    EndDate : new Date(2011, 0, 7),
                    Cls  : 'myAvailability'
                },
                {
                    ResourceId : 2,
                    StartDate : new Date(2011, 0, 3),
                    EndDate : new Date(2011, 0, 4),
                    Cls  : 'someAvailability'
                },
                {
                    ResourceId : 3,
                    StartDate : new Date(2011, 0, 8),
                    EndDate : new Date(2011, 0, 12),
                    Cls  : 'someAvailability'
                }
            ]
        });

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate : new Date(2011, 0, 3),
            endDate : new Date(2011, 0, 13), 
            viewPreset : 'dayAndWeek',
                
            // Setup static columns
            columns : [
                { header : 'Name', sortable:true, width:100, field : 'Name' }
            ],
            
            resourceZones : blockedDatesStore,
            resourceStore : resourceStore,
            eventStore : new Sch.data.EventStore({
                data : [
                    {
                        ResourceId : 3,
                        StartDate : new Date(2011, 0, 3),
                        EndDate : new Date(2011, 0, 5),
                        Name : 'Some task'
                    }
                ]
            })
        });
        
        Ext.Viewport.add(scheduler);
    }
});
