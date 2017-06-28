StartTest(function (t) {
    Ext.Viewport.setLayout('vbox');

    var doTest = function(buffered) {
        t.diag(buffered ? 'Buffered mode' : 'Plain mode');

        var sched = t.getScheduler({
            id : "buff-" + buffered,
            startDate : new Date(2010, 1, 1),
            endDate : new Date(2010, 1, 2),
            height: 200,
            viewPreset : 'hourAndDay'
        }, 10);

        var eventSelector = '#buff-' + buffered + ' ' + sched.getSchedulingView().eventSelector;

        Ext.Viewport.add(sched);

        var resourceStore = sched.getResourceStore();
        var eventStore = sched.getEventStore();
        var view = sched.getSchedulingView();
        var tickWidth = sched.getTimeColumnWidth();
        var newEvent = new Sch.model.Event({
            ResourceId: resourceStore.getAt(4).getId(),
            StartDate: sched.getStart(),
            EndDate: Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 2)
        });

        eventStore.removeAll();
        eventStore.add(newEvent);

        var box, node

        t.chain(
            { waitFor: 'rowsVisible' },
            { waitFor : 100 },

            function(next) {
                sched.scrollVerticallyTo(160);
                sched.scrollHorizontallyTo(20);
                node    = view.getEl().down(eventSelector).dom;
                box     =  Ext.fly(node).getPageBox();
                next();
            },

            { waitFor : 600 },

            { action: 'fingerDown', target : eventSelector },

            { waitFor : 'selector', args : '#buff-' + buffered + ' .sch-event.x-dragging' },

            function(next) {

                var foundProxy = sched.element.down('.sch-event.x-dragging');
                t.isDeeply(foundProxy.getPageBox(), box, 'Proxy should be at same left position as the original el');

                next();
            },

            { action: 'moveFinger', by : [tickWidth, 0] },

            function(next) {
                // Proxy should have moved too
                t.is(Ext.fly(node).getXY()[0], box.left+tickWidth, 'Proxy should move with finger');
                next()
            },

            { action: 'fingerUp' },

            { waitFor : 600 },

            function(next) {
                // Event should have been moved 1 hr
                t.is(newEvent.getStartDate(), new Date(2010, 1, 1, 1), 'Event moved 1hr')
                node    = view.getEl().down(eventSelector).dom;
                box     =  Ext.fly(node).getPageBox();
                next();
            },

            { action: 'fingerDown', target : eventSelector },

            { waitFor : 'selector', args : '#buff-' + buffered + ' .sch-event.x-dragging' },

            function(next) {
                var foundProxy = sched.element.down('.sch-event.x-dragging');
                t.isDeeply(Ext.fly(foundProxy).getPageBox(), box, 'Proxy should be at same left position as the original el');
                next();
            },

            { action: 'fingerUp' },

            function(next) {

//                sched.destroy();

                // Run it once in buffered mode too
                if (!buffered) doTest(true);
            }
        );
    };

    doTest(false);
})
