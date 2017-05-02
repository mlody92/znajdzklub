StartTest(function (t) {
    var scheduler = t.getRenderedScheduler({
        startDate  : new Date(2010, 1, 1),
        endDate    : new Date(2010, 1, 12),
        viewPreset : 'dayAndWeek',

        onEventCreated : function (newEventRecord) {
            // Supply default record values etc.
            newEventRecord.set({
                Cls : 'foo'
            });
        }
    });

    scheduler.eventStore.removeAll();

    t.willFireNTimes(scheduler.eventStore, 'addrecords', 1);

    t.chain(
        {
            waitFor : 'rowsVisible',
            args    : scheduler
        },

        function (next) {
            scheduler.scrollHorizontallyTo(scheduler.timeAxisViewModel.getTickWidth());
            next();
        },
        // this action should not trigger any actions
        { action : 'longpress', target : '.ubergrid-simple-locked .ubergrid-cell' },

        { action : 'longpress', target : '.sch-schedulerview', offset : [10, 10] },

        { waitFor : 'selector', args : '.foo' },

        function (next) {
            t.is(scheduler.eventStore.getCount(), 1, '1 new event added');
            t.is(scheduler.eventStore.first().getStartDate(), new Date(2010, 1, 2), 'Should find start date at view start + 1d');
            t.is(scheduler.eventStore.first().getEndDate(), new Date(2010, 1, 3), 'Should find end date at view start + 2d');
            scheduler.setReadOnly(true);
            next();
        },

        { action : 'longpress', target : '.sch-schedulerview .sch-timetd' },

        function (next) {
            t.is(scheduler.eventStore.getCount(), 1, 'No new events added');
        }
    );
})    
