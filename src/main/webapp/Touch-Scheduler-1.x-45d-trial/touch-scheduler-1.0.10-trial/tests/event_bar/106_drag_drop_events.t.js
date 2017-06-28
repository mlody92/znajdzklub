StartTest(function (t) {
    t.it('Should fire appropriate number of events', function(t) {
        var sched = t.getScheduler({
            forceFit : true,
            height: 200
        }, 1);

        Ext.Viewport.add(sched);

        t.willFireNTimes(sched, 'beforeeventdrag', 2);
        t.willFireNTimes(sched, 'eventdragstart', 1);
        t.willFireNTimes(sched, 'beforeeventdropfinalize', 1);
        t.willFireNTimes(sched, 'eventdrop', 1);
        t.willFireNTimes(sched, 'aftereventdrop', 1);

        t.chain(
            { waitFor : "eventsVisible" },

            'dragEventBy([100, 0])',

            function(next) {
                sched.on('beforeeventdrag', function() { return false; });
                next();
            },

            'dragEventBy([100, 0])',

            { waitFor : 500 },

            function() {
                sched.destroy();
            }
        );
    })

    t.it('Should be possible to prevent the default finalization and call it manually, and abort the operation', function(t) {

        var sched = t.getScheduler({
            forceFit    : true,
            height      : 200
        }, 1);

        t.wontFire(sched.eventStore, 'updaterecord');

        Ext.Viewport.add(sched);

        var ddCtx;

        sched.on('beforeeventdropfinalize', function(sch, context) {
            ddCtx = context;
            return false;
        });

        t.chain(
            { waitFor : "eventsVisible" },

            'dragEventBy([-100, 0])',

            function(next) {
                ddCtx.finalize(false);
                next()
            },

            { waitFor : 500 },

            function() {
                sched.destroy();
            }
        );
    })

    t.it('Should be possible to prevent the default finalization and call it manually, and complete the operation', function(t) {

        var sched = t.getScheduler({
            forceFit    : true,
            height      : 200
        }, 1);

        t.willFireNTimes(sched.eventStore, 'updaterecord', 1);

        Ext.Viewport.add(sched);

        var ddCtx;

        sched.on('beforeeventdropfinalize', function(sch, context) {
            ddCtx = context;
            return false;
        });

        t.chain(
            { waitFor : "eventsVisible" },

            'dragEventBy([-30, 0])',

            function(next) {
                ddCtx.finalize(true);
            }
        );
    })
})
