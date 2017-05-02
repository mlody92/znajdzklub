StartTest(function (t) {
    var sched = t.getScheduler();
    Ext.Viewport.add(sched);

    t.waitForRowsVisible(sched, function () {
        var resourceStore   = sched.getResourceStore();
        var eventStore      = sched.eventStore;

        eventStore.removeAll();
        resourceStore.removeAll();

        var viewEl = sched.getSchedulingView().getEl();
        var elAtViewPosition = t.elementFromPoint(viewEl.getX() + 10, viewEl.getY() + 10);

        t.notOk(Ext.fly(elAtViewPosition).is('.ubergrid-row'), 'Grid row not found after store remove all');

        resourceStore.add({
            Id      : 1,
            Name    : "FOO"
        });

        eventStore.add({
            ResourceId  : 1,
            Name : "FOO",
            StartDate : sched.startDate,
            EndDate : sched.endDate
        });

        t.is(Ext.select('.sch-event').getCount(), 1, '1 new event found');
        t.is(Ext.select('.sch-schedulerview .sch-event').getCount(), 1, '1 new event found in scheduler view');
    })
})    
