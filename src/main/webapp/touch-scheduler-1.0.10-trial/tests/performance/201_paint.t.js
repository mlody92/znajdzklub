StartTest(function (t) {
    var sched = t.getScheduler();

    Ext.Viewport.add(sched);

    t.waitForRowsVisible(sched, function () {
        var paintCounter = 0;

        sched.getSchedulingView().on('refresh', function () {
            paintCounter++;
        });
        sched.eventStore.removeAll();

        t.selectorNotExists('.sch-event', 'No events found after remove all');

        t.is(paintCounter, 1, 'Should do one repaint if store is cleared');

        paintCounter = 0;

        sched.eventStore.setData([
            {
                ResourceId : 'foo'
            }
        ]);

        t.is(paintCounter, 1, 'Should do one repaint if store gets a new data set');
    })
})
