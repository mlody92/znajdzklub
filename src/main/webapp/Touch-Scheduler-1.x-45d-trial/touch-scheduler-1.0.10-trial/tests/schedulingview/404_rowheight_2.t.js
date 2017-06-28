StartTest(function (t) {
    var start = new Date(2010, 1, 1), end = new Date(2010, 1, 10);

    var eventStore = new Sch.data.EventStore({
        data: [
            {
                ResourceId : 1,
                StartDate: start,
                EndDate : end
            },
            {
                ResourceId : 1,
                StartDate: start,
                EndDate : end
            }
        ]
    });
    var sched = t.getScheduler({
        startDate : start,
        endDate : end,
        rowHeight : 50,
        eventStore : eventStore
    }, 2);

    Ext.Viewport.add(sched);

    t.chain(
        { waitFor : 'rowsVisible' },

        function() {
            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), 50 * 2, 10, 'Correct height of row with 2 overlapping events');
            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row:last-child').getHeight(), 50, 10, 'Correct height of row without events');

            eventStore.removeAll();

            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), 50, 10, 'Correct height of row #1 after remove');
            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row:last-child').getHeight(), 50, 10, 'Correct height of row #2 after remove');
        }
    );
})    
