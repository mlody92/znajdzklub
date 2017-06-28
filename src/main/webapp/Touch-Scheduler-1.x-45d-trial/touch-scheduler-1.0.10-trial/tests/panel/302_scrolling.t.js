StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        height          : 200,  // Force vert scrollbar
        viewPreset      : 'dayAndWeek'
    });
    
    t.waitForRowsVisible(scheduler, function() {
        t.ok(scheduler.getTimeAxis() instanceof Sch.data.TimeAxis, 'getTimeAxis ok');
    
        scheduler.setStart(new Date(2000, 0, 1));
        t.is(scheduler.getStart(), new Date(2000, 0, 1), 'setStart/getStart ok');

        var viewEl = scheduler.getSchedulingView().getEl();
        scheduler.scrollVerticallyTo(10);
        scheduler.shiftNext(2);
        t.is(scheduler.getStart(), new Date(2000, 0, 3), 'shiftNext ok');
        
        t.is(t.getVerticalScroll(scheduler), 10, 'Normal grid: Vertical scroll intact after timeaxis update');

        scheduler.shiftPrevious(2);
        t.is(scheduler.getStart(), new Date(2000, 0, 1), 'shiftPrevious ok');
        
        scheduler.setEnd(new Date(2000, 1, 1));
        t.is(scheduler.getEnd(), new Date(2000, 1, 1), 'setEnd/getEnd ok');
        
        scheduler.goToNow();
        
        var today = new Date();
        today = Ext.Date.clearTime(today);
        t.is(scheduler.getStart(), today, 'goToNow ok');

        t.notOk(scheduler.isReadOnly(), 'getReadOnly ok');
        scheduler.setReadOnly(true);
        t.ok(scheduler.isReadOnly(), 'setReadOnly ok');

        scheduler.setTimeSpan(new Date(2000, 1, 1), new Date(2000, 2, 2));

        t.waitForScrollerLeftChange(scheduler.getScheduleScroller(), function (scrollValue) {
            t.isGreater(scrollValue, 0, 'Scrolled right direction');
        
            scheduler.getSchedulingView().fitColumns();
        });
        scheduler.scrollToDate(new Date(2000, 1, 12), true);
    })    
})    

