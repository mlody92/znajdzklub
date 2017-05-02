StartTest(function (t) {
    Ext.Viewport.setHeight(300);
    Ext.Viewport.setWidth(500);

    var scheduler = t.getScheduler({
        viewPreset  : 'dayAndWeek',
        startDate   : new Date(2010, 1, 2),
        endDate     : new Date(2010, 1, 23),
        orientation : 'vertical'
    });
    
    Ext.Viewport.add(scheduler);

    scheduler.eventStore.removeAll();

    var vMaxScroll
    
    t.chain(
        { waitFor : 'rowsVisible' },
        function (next) {
            t.willFireNTimes(scheduler, 'viewchange', 2);
            next()
        },

        { drag : '.sch-schedulerview', by : [0, 200], offset : [10, 10] },

        { waitFor : 'event', args : [scheduler, 'viewchange'] },

        function (next) {
            t.is(t.getHorizontalScroll(scheduler), 0, 'Should be scrolled 0 after going back in time');

            t.isLess(scheduler.getStart(), new Date(2010, 1, 2), 'Scheduler should move back in time when pulling top side');

            vMaxScroll = scheduler.getScheduleScroller().maxPosition.y;
            scheduler.scrollVerticallyTo(vMaxScroll);

            next();
        },

        { drag : '.sch-schedulerview', by : [0, -200] },

        { waitFor : 'event', args : [scheduler, 'viewchange'] },

        function (next) {
            t.is(t.getVerticalScroll(scheduler), vMaxScroll, 'Should be scrolled to panel far bottom after going back in time');

            t.is(scheduler.getStart(), new Date(2010, 1, 2), 'Scheduler should move forward in time when pulling bottom side');
            next();
        }
    );
})    
