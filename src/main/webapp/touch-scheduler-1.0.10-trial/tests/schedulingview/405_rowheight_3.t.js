StartTest(function (t) {
    var start = new Date(2010, 1, 1), end = new Date(2010, 1, 10);

    var eventStore = new Sch.data.EventStore({
        data: [
            {
                ResourceId : 1,
                StartDate: start,
                EndDate : end
            }
        ]
    });
    var resourceStore = new Sch.data.ResourceStore({
        data: [
            { Id : 1, Name : 'Johnny Johnson' }
        ]
    })

    var sched = t.getScheduler({
        startDate : start,
        endDate : end,
        rowHeight : 50,
        resourceStore : resourceStore,
        eventStore : eventStore
    }, 1);

    Ext.Viewport.add(sched);

    t.chain(
        { waitFor : 'rowsVisible' },
        { waitFor : 100 },

        function() {
            eventStore.add({
                ResourceId : 1,
                    StartDate: start,
                EndDate : end
            });

            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), 50 * 2, 10, 'Correct height of row with 2 overlapping events');
            eventStore.removeAll();

            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), 50, 10, 'Correct height of row #1 after remove');

            sched.getSchedulingView().setRowHeight(20)
            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), 20, 10, 'Row height updated after setRowHeight call');
        }
    );
})    
