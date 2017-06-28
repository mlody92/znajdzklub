StartTest(function (t) {
    var sched = t.getRenderedScheduler({
        startDate  : new Date(2010, 1, 1, 4),
        endDate    : new Date(2010, 1, 1, 5),
        viewPreset : 'hourAndDay'
    });

    t.willFireNTimes(sched, 'timeheaderdoubletap', 2);

    sched.on('timeheadertap', function (source, start, end) {
        t.is(start, new Date(2010, 1, 1, 4), 'Correct start argument in listener fn');
        t.is(end, new Date(2010, 1, 1, 5), 'Correct end argument in listener fn');
    }, null, { single : true });

    t.chain(
        { waitFor : 'selector', args : '.sch-simple-timeheader' },
        { waitFor : 1000 },

        { action : 'doubletap', target : '.sch-header-row-top .sch-simple-timeheader' },
        { waitFor : 1000 },
        { action : 'doubletap', target : '.sch-header-row-middle .sch-simple-timeheader' },

        function (next) {
            t.willFireNTimes(sched, 'timeheadertap', 2);
            next();
        },

        { waitFor : 500 },
        { action : 'tap', target : '.sch-header-row-top .sch-simple-timeheader' },
        { waitFor : 500 },
        { action : 'tap', target : '.sch-header-row-middle .sch-simple-timeheader' }
    )
})    
