StartTest(function (t) {
    var scheduler = t.getRenderedScheduler({
        enableSidePull : false
    });

    t.willFireNTimes(scheduler, 'eventswipe', 1);
    t.willFireNTimes(scheduler, 'eventdoubletap', 1);

    t.chain(
        {
            waitFor : 'eventsVisible',
            args    : scheduler
        },

        { action : 'doubletap', target : '.sch-schedulerview .sch-event' },

        { waitFor : 500 },

        { action : 'swipe', target : '.sch-schedulerview .sch-event', direction : 'right' },

        function (next) {
            t.willFireNTimes(scheduler, 'eventtap', 1);
            t.willFireNTimes(scheduler, 'eventsingletap', 1);

            next();
        },

        { action : 'tap', target : '.sch-schedulerview .sch-event' }
    );

})    
