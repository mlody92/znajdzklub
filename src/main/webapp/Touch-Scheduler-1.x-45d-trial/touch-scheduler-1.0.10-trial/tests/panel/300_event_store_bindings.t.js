StartTest(function (t) {
    var sched = t.getScheduler();
    Ext.Viewport.add(sched);

    t.waitForRowsVisible(sched, function () {
        var resourceStore = sched.getResourceStore();
        var eventStore = sched.getEventStore();
        var eventSelector = sched.getSchedulingView().eventSelector;

        t.selectorExists(eventSelector, 'Some events found');

        eventStore.removeAll();
        t.selectorNotExists(eventSelector, 'No events found after remove all');

        eventStore.add(new Sch.model.Event({
            ResourceId  : resourceStore.first().getId(),
            StartDate   : sched.getStart(),
            EndDate     : Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1)
        }));

        t.is(Ext.select('.sch-schedulerview ' + eventSelector).getCount(), 1, '1 added event found');

        eventStore.first().setCls('boo');
        t.is(Ext.select('.sch-schedulerview .boo').getCount(), 1, '1 updated event found');
    })
})    
