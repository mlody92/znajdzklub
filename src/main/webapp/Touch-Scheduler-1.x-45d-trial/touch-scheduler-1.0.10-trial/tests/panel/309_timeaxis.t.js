StartTest(function (t) {
    var sched = t.getScheduler(null, 50);
    Ext.Viewport.add(sched);

    t.waitForRowsVisible(sched, function () {

        var record = sched.eventStore.first();

        record.setCls('bar');
        sched.timeAxis.shiftPrevious(200);
        t.selectorNotExists('.sch-event.bar', 'View updated after view preset change');
    })
})    
