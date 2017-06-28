StartTest(function (t) {
    var resourceStore = Ext.create('Sch.data.ResourceStore', {
        data : [
            { Id : 1, Name : 'Mike' },
            { Id : 2, Name : 'Anna' },
            { Id : 3, Name : 'Dan' }
        ]
    });

    // Store holding all the events
    var resourceZoneStore = new Sch.data.EventStore({
        data : [
            {
                ResourceId : 1,
                StartDate  : new Date(2011, 0, 6),
                EndDate    : new Date(2011, 0, 7),
                Cls        : 'myAvailability'
            },
            {
                ResourceId : 2,
                StartDate  : new Date(2011, 0, 3),
                EndDate    : new Date(2011, 0, 4),
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

    var scheduler = new Sch.panel.SchedulerGrid({
        startDate          : new Date(2011, 0, 3),
        endDate            : new Date(2011, 0, 13),
        viewPreset         : 'dayAndWeek',

        // Setup static columns
        columns            : [
            { header : 'Name', sortable : true, width : 100, field : 'Name' }
        ],

        resourceZones : resourceZoneStore,
        resourceStore : resourceStore,
        eventStore    : new Sch.data.EventStore({
            data : [
                {
                    ResourceId : 3,
                    StartDate  : new Date(2011, 0, 3),
                    EndDate    : new Date(2011, 0, 5),
                    Name       : 'Some task'
                }
            ]
        })
    });

    Ext.Viewport.add(scheduler);

    t.it('Changing dataset', function (t) {

        t.chain(
            { waitFor : 'selector', args : '.myAvailability' },

            function (next) {
                resourceZoneStore.removeAll();

                t.waitForSelectorNotFound('.myAvailability', next);
            },

            function (next) {
                resourceZoneStore.setData([
                    {
                        ResourceId : 1,
                        StartDate  : new Date(2011, 0, 6),
                        EndDate    : new Date(2011, 0, 7),
                        Cls        : 'myAvailability'
                    }
                ]);

                t.waitForSelector('.myAvailability', next);
            }
        )
    })

    t.it('Adding/removing records', function (t) {

        t.chain(
            { waitFor : 'rowsVisible' },

            function(next) {
                resourceZoneStore.removeAll();

                resourceZoneStore.add(
                    {
                        ResourceId : 1,
                        StartDate  : new Date(2011, 0, 6),
                        EndDate    : new Date(2011, 0, 7),
                        Cls        : 'foo'
                    }
                );

                next();
            },

            { waitFor : 'selector', args : '.foo' },

            function(next) {

                var el = Ext.getBody().down('.foo');

                t.isApprox(el.getHeight(), el.up('td').getHeight())

                resourceZoneStore.removeAt(0)

                next();
            },

            { waitFor : 'selectorNotFound', args : '.foo' }
        );
    });
});
