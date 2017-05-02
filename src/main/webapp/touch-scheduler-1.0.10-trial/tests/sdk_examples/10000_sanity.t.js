StartTest(function(t) {
    var scripts = Ext.select('script', Ext.getHead());
    var foundScheduler = false;
    var foundST = false;
    
    scripts.each(function(el) {
        if (el.dom.src && el.dom.src.match('touch-scheduler-all-debug.js')){
            foundScheduler = true;
        }

        if (el.dom.src && el.dom.src.match('cdn.sencha.io')){
            foundST = true;
        }
    });

    t.ok(foundScheduler, 'Script tag with Touch Scheduler found - ' + t.scopeProvider.sourceURL);
    
    t.ok(foundST, 'Script tag with cdn.sencha.io found - ' + t.scopeProvider.sourceURL);

    t.waitForRowsVisible(function() {
        t.pass('Scheduler example rendered without exception - ' + t.scopeProvider.sourceURL);

        var eventEl = t.cq1('schedulerpanel[rendered=true]').element.down('.sch-event');
        if (eventEl) {
            t.elementIsTopElement(eventEl, true, 'Event rendered ok');
        }
        t.monkeyTest(">>schedulerpanel[rendered=true]", 5, null, t.done, t);
    });
});
