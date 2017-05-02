StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        rowHeight       : 55,
        height          : 400  // Force vert scrollbar
    });
    
    t.waitForRowsVisible(scheduler, function() {
        var viewEl = scheduler.getSchedulingView().getEl();
        var viewXY = viewEl.getXY();

        t.is(viewEl.down('.ubergrid-row').getHeight(), 55, 'Correct row height')
        
        scheduler.scrollVerticallyTo(200);

        scheduler.getSchedulingView().setRowHeight(25);

        // After changing row height with view scrolled vertically, rows should still be seen after this happens
        t.selectorIsAt('.ubergrid-row', [viewXY[0] + 10, viewXY[1] + 10], 'Should find rows in the view after row height change')
        
        t.is(viewEl.down('.ubergrid-row').getHeight(), 25, 'Correct row height')
    })    
})    

