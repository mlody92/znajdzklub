StartTest(function (t) {
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit : false,
        height: 200
    }, 10);
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
    t.willFireNTimes(eventStore, 'updaterecord', 1);

    t.chain(
        { waitFor: 'eventsVisible' },

        function(next) {
            sched.scrollHorizontallyTo(20);

            next();
        },

        { action: 'fingerDown', target : eventSelector },

        { waitFor : 'selector', args : '.sch-event.x-dragging' },

        { action: 'moveFinger', by : [110, 70] },

        { action: 'fingerUp' }
    );
})    
