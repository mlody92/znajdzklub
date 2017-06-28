Ext.setup({

    onReady : function () {

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data : [
                { Id : 1, Name : 'Mike' },
                { Id : 2, Name : 'Anna' },
                { Id : 3, Name : 'Dan' },
                { Id : 4, Name : 'Andrew' },
                { Id : 5, Name : 'Frida' },
                { Id : 6, Name : 'Kate' },
                { Id : 7, Name : 'Don' },
                { Id : 8, Name : 'Doug' },
                { Id : 9, Name : 'Peter' }
            ]
        });

        var blockedDatesStore = new Sch.data.EventStore({
            data : [
                {
                    ResourceId : 1,
                    StartDate  : new Date(2011, 0, 6),
                    EndDate    : new Date(2011, 0, 7),
                    Cls        : 'myAvailability'
                },
                {
                    ResourceId : 4,
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 9),
                    Cls        : 'someAvailability'
                },
                {
                    ResourceId : 3,
                    StartDate  : new Date(2011, 0, 8),
                    EndDate    : new Date(2011, 0, 12),
                    Cls        : 'someAvailability'
                }
            ]
        });

        var eventStore = new Sch.data.EventStore({
            data : [
                {
                    ResourceId : 1,
                    StartDate  : new Date(2011, 0, 5),
                    EndDate    : new Date(2011, 0, 8),
                    Name       : 'Meeting'
                },
                {
                    ResourceId : 1,
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 7),
                    Name       : 'Team outing'
                },
                {
                    ResourceId : 2,
                    StartDate  : new Date(2011, 0, 6),
                    EndDate    : new Date(2011, 0, 8),
                    Name       : 'Travel to Chicago'
                },
                {
                    ResourceId : 3,
                    StartDate  : new Date(2011, 0, 7),
                    EndDate    : new Date(2011, 0, 9),
                    Name       : 'Shanghai Conference'
                },
                {
                    ResourceId : 5,
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 6),
                    Name       : 'Google expo'
                }
            ]
        });

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate   : new Date(2011, 0, 3),
            endDate     : new Date(2011, 0, 13),
            viewPreset  : 'dayAndWeek',
            orientation : 'vertical',
            barMargin   : 3,
            compactMode     : true,

            timeAxisColumnCfg : {
                text  : 'Date',
                width : 150
            },

            resourceColumnWidth : 200,

            columns : [
                { header : 'Name', sortable : true, width : 100, field : 'Name' }
            ],

            resourceZones : blockedDatesStore,
            resourceStore : resourceStore,
            eventStore    : eventStore,

            eventRenderer          : function (event, resource, tplData, row) {

                tplData.cls = resource.getName() + '-event';

                return event.get('Name') || '';
            }
        });

        Ext.Viewport.add(scheduler);
    }
});
