StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        compactMode: true
    });
    
    t.waitForEventsVisible(function() {
        t.pass('Could render compact mode without exception');
    })
})    

