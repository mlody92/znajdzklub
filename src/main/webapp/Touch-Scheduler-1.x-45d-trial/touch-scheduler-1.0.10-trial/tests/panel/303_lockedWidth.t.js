StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        lockedGridConfig     : { width : 0 }  
    });
    
    t.waitForRowsVisible(scheduler, function() {
        t.is(scheduler.lockedGrid.getWidth(), 0, '0 width for locked grid');
    })    
})    

