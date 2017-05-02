StartTest(function (t) {
    var sched = t.getScheduler({
        viewPreset : 'dayAndWeek',
        startDate  : new Date(2010, 1, 2),
        endDate    : new Date(2010, 1, 23)
    });
    Ext.Viewport.add(sched);

    sched.eventStore.removeAll();
    
    var hMaxScroll

    t.chain(
        {
            waitFor : 'selector',
            args    : '.sch-pullrefresh'
        },
        function (next) {
            t.willFireNTimes(sched, 'viewchange', 2);
            
            next()
        },

        { action : 'drag', target : '.sch-schedulerview', by : [200, 0] },

        { waitFor : 'event', args : [sched, 'viewchange'] },

        function (next) {
            t.is(t.getHorizontalScroll(sched), 0, 'Should be scrolled 0 after going back in time');

            t.isLess(sched.getStart(), new Date(2010, 1, 2), 'Scheduler should move back in time when pulling left side');

            hMaxScroll = sched.getScheduleScroller().maxPosition.x;
            sched.scrollHorizontallyTo(hMaxScroll);

            next();
        },

        { action : 'drag', target : '.sch-schedulerview', by : [-200, 0] },

        { waitFor : 'event', args : [sched, 'viewchange'] },

        function (next) {
            t.is(t.getHorizontalScroll(sched), hMaxScroll, 'Should be scrolled to panel far right after going back in time');

            t.is(sched.getStart(), new Date(2010, 1, 2), 'Scheduler should move forward in time when pulling right side');
            next();
        }
    );
})    
