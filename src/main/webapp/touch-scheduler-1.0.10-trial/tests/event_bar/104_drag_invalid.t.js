StartTest(function (t) {
    var sched = t.getScheduler({
        rowHeight : 100,
        height    : 220
    }, 5, 2);
    var view = sched.getSchedulingView();
    var eventSelector = view.eventSelector;
    var xy;

    Ext.Viewport.add(sched);

    var selector = '.ubergrid-row:nth-child(2) ' + eventSelector;

    t.chain(
        { waitFor : 'selector', args : selector },

        function (next, result) {
            view.scrollVerticallyTo(100);
            xy = Ext.fly(result[0]).getXY();

            next();
        },

        { action : 'fingerDown', target : selector },

        { waitFor : 'selector', args : '.x-dragging' },
        { action : 'moveFinger', by : [0, -40] },

        { action : 'fingerUp' },

        function (next) {
            t.isDeeply(Ext.select(selector).first().getXY(), xy, 'Event rendered at same place');
            t.notOk(sched.eventStore.first().dirty, 'Event record untouched');
        }
    );
})    
