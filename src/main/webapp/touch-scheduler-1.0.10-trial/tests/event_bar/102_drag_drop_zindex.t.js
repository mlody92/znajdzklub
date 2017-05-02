StartTest(function (t) {
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit : true
    }, 2);
    var eventSelector = sched.getSchedulingView().eventSelector;

    Ext.Viewport.add(sched);

    var resourceStore = sched.getResourceStore();
    var eventStore = sched.getEventStore();
    eventStore.removeAll();
    var view = sched.getSchedulingView();

    var newEvent = new Sch.model.Event({
        ResourceId: resourceStore.first().getId(),
        StartDate: sched.getStart(),
        EndDate: sched.getEnd(),
        Cls : 'foo'
    });
    var newEvent2 = new Sch.model.Event({
        ResourceId: resourceStore.last().getId(),
        StartDate: sched.getStart(),
        EndDate: sched.getEnd(),
    });

    eventStore.add(newEvent);
    eventStore.add(newEvent2);

    t.chain(
        { waitFor: 'eventsVisible' },
        { action: 'fingerDown', target : '.ubergrid-simple-normal ' + eventSelector },

        { waitFor : 700 },
        { action: 'moveFinger', by : [0, 50] },

        function(next) {
            t.hasCls(t.getElementAtCursor(), 'foo', 'Should find dragged element on top always');
        }
    );
})    
