StartTest(function(t) {
    var scheduler = t.getRenderedScheduler();
    
    t.waitForEventsVisible(function() {
        t.selectorNotExists('[class*=undefined]', 'Should not find any CSS class like undefined');
        t.selectorNotExists('[class*=null]', 'Should not find any CSS class like null');
    })
})    

