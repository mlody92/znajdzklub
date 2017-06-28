StartTest(function (t) {
    var sched = t.getScheduler(null, 50);
    Ext.Viewport.add(sched);
    var scroller = sched.getScheduleScroller();

    t.waitForRowsVisible(sched, function () {
        sched.scrollHorizontallyTo(500);
        sched.scrollVerticallyTo(10);

        t.is(scroller.position.x, 500, 'Scroll should be set to 500');
        t.is(scroller.position.y, 10, 'Scroll should be set to 10');

        t.willFireNTimes(sched, 'viewchange', 1);
        sched.switchViewPreset('monthAndYear', new Date(2010, 1, 1), new Date(2013, 1, 11));

        t.is(scroller.position.x, 0, 'X scroll should be reset to 0 after changing view preset');
        t.is(scroller.position.y, 10, 'Y scroll should be intact after changing view preset');

        sched.scrollHorizontallyTo(0);
        sched.scrollVerticallyTo(0);

        // Scheduler should react normally if data changes while panel is hidden
        var record = sched.eventStore.first();
        var firstTdXY = Ext.getBody().down('.sch-timetd').getXY();

        sched.hide();
        record.setCls('bar');
        sched.show();

        t.selectorIsAt('.sch-timetd', firstTdXY, 'Time cell found and is reachable')
    })
})    
