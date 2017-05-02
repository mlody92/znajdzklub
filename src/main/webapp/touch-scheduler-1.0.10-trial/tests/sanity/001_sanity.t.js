StartTest(function (t) {
    var sched = t.getScheduler();
    t.pass('Scheduler instantiated');
    
    t.waitFor(500, function() {
        sched.destroy();
        t.pass('Scheduler destroyed without being added to any container');
    });

    var sched2 = t.getRenderedScheduler();
    t.pass('Scheduler instantiated, rendered in viewport');

    sched2.destroy();
    t.pass('Scheduler destroyed after being added to a container');
})    
