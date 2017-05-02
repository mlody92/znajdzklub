StartTest(function (t) {
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit : false,
        height: 200
    }, 2);
    var eventSelector = sched.getSchedulingView().eventSelector;
    var tickWidth = sched.timeAxisViewModel.getTickWidth();

    Ext.Viewport.add(sched);

    var resourceStore = sched.getResourceStore();
    var eventStore = sched.getEventStore();
    eventStore.removeAll();
    var view = sched.getSchedulingView();

    var newEvent = new Sch.model.Event({
        ResourceId: resourceStore.first().getId(),
        StartDate: new Date(2010, 1, 1, 2),
        EndDate: new Date(2010, 1, 1, 4)
    });

    eventStore.add(newEvent);

    t.chain(
        { waitFor: 'eventsVisible' },

        function(next) {
            sched.getSchedulingView().scrollTo(50, 10);
            next();
        },

        'dragEventBy([-' + (2*tickWidth) + ', 0])',

        function(next) {
            t.is(newEvent.getResourceId(), resourceStore.first().getId(), 'Should see the same Resource after horizontal drag');
            t.is(newEvent.getStartDate(), new Date(2010, 1, 1, 0), 'Should see StartDate shifted -2h after horizontal drag');

            next();
        }
    );
})    
