StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        height          : 200
    });
    
    t.waitForRowsVisible(scheduler, function() {
        scheduler.scrollVerticallyTo(20);

        var lockedScroller = scheduler.getLockedScroller();
        var normalScroller = scheduler.getScheduleScroller();

        t.waitFor(500, function() {
            t.isDeeply(lockedScroller.position, normalScroller.position, 'Scroll positions in sync');
            t.is(scheduler.lockedGrid.element.down('.ubergrid-row').getY(),
                 scheduler.normalGrid.element.down('.ubergrid-row').getY(),
                'Row positions in sync');
        });
    })
})    

