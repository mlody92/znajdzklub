StartTest(function (t) {
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit : true
    }, 1);
    var eventSelector = sched.getSchedulingView().eventSelector;

    Ext.Viewport.add(sched);

    var resourceStore = sched.getResourceStore();
    var eventStore = sched.getEventStore();
    eventStore.removeAll();
    var view = sched.getSchedulingView();

    var newEvent = new Sch.model.Event({
        ResourceId: resourceStore.first().getId(),
        StartDate: sched.getStart(),
        EndDate: new Date(2010, 1, 1, 3)
    });

    eventStore.add(newEvent);

    t.chain(
        { waitFor: 'eventsVisible' },

        { action : 'tap', target : '.sch-event' },

        'dragEventBy([20, 0])',

        function(next) {
            var node = t.getElementAtCursor();
            t.hasCls(node, 'sch-event-selected', 'Should stay selected after drop');
            Ext.fly(node).setWidth(0);
            next();
        },

        { action: 'tap' },

        function(next) {
            t.selectorNotExists('.sch-event-selected', 'Should not be any selections after clicking on schedule');

            next();
        }
    );
})
