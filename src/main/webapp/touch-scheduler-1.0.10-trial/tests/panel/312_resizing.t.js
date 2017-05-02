StartTest(function(t) {
    Ext.Viewport.setWidth(300);

    var scheduler = t.getRenderedScheduler({
        renderTo : document.body,
        startDate : new Date(2012, 1, 1),
        endDate : new Date(2012, 1, 2)
    });

    t.waitForRowsVisible(function() {
        var view = scheduler.getSchedulingView();
        var scheduleScroller = scheduler.getScheduleScroller();
        var origMaxPosition = scheduleScroller.maxPosition.x;

        // Go all the way to the right
        view.scrollHorizontallyTo(scheduleScroller.maxPosition.x);

        // Now increase width (mimics a switch from portrait to landscape orientation)
        t.waitFor(1000, function() {
            Ext.Viewport.setWidth(500);

            t.waitFor(1000, function() {
                // Now we have a wider are, and less to scroll
                t.is(scheduleScroller.maxPosition.x, origMaxPosition - 200, 'Should find lower value of scroller max position');
                t.is(scheduleScroller.position.x, origMaxPosition - 200, 'Should find lower value of current scroller x position');
            });
        });
    });
})
