StartTest(function(t) {
    var sched = t.getRenderedScheduler(100);
    
    t.waitForRowsVisible(sched, start); 

    function start () {
        
        sched.scrollVerticallyTo(200, false);
        
        t.waitFor(1000, function() {    
            var scroller = sched.getScheduleScroller();
            t.tap(sched.normalGrid.headerCmp, function() {
                t.waitForScrollerPosition(scroller, { y : 0 }, function() {
                    t.pass('Scrolled to top after tapping schedule header');
                });
            });
        });
    } 
})    
