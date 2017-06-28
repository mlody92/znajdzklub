StartTest(function (t) {
    var sched = t.getScheduler({
        forceFit : true
    }, 1);
    var eventSelector = sched.getSchedulingView().eventSelector;

    Ext.Viewport.add(sched);

    var view = sched.getSchedulingView();

    var eventDragStarted, scrollStarted;

    // Scrolling started
    sched.getScheduleScroller().on('scroll', function(body, event) {
        scrollStarted = true;
    });

    // Event bar drag started
    sched.on('eventdragstart', function(body, event) {
        eventDragStarted = true;
    });

    t.chain(
        { waitFor   : 'selector', args : '.ubergrid-simple-normal ' + eventSelector },
        { action    : 'fingerDown', target : '.ubergrid-simple-normal ' + eventSelector },

        { action    : 'moveFinger', by : [5, 0] },

        { waitFor   : 400 },

        { action    : 'moveFinger', by : [100, 0] },

        function(next) {
            t.notOk(scrollStarted, 'Moving finger slightly initially should not trigger scroll behavior');
            t.ok(eventDragStarted || scrollStarted, 'Moving finger slightly initially should trigger drag behavior');
            next();
        },
        { action    : 'fingerUp' }
    );
})    
