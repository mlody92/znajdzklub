StartTest(function (t) {
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit : false,
        height: 200
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
        EndDate: sched.getEnd()
    });

    eventStore.add(newEvent);

    t.chain(
        { waitFor: 'eventsVisible' },

        'dragEventBy([0, 50])',

        function(next) {
            t.is(newEvent.getResource(), resourceStore.last(), 'Moved down: Resource changed');

            next();
        },

        'dragEventBy([0, -50])',

        function(next) {
            t.is(newEvent.getResource(), resourceStore.first(), 'Moved up: Resource changed');

            next();
        }
    );
})    
