StartTest(function (t) {

    // runs once for buffered, once for plain mode
    var doTest = function(buffered) {

        var sched = t.getScheduler({
            startDate : new Date(2010, 1, 1),
            endDate : new Date(2010, 1, 2),
            forceFit : true,
            buffered : buffered
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
            EndDate: Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 2)
        });

        eventStore.add(newEvent);

        //                                           1 drag drop operation, 1 reject, 1 commit, 2 setStartEnd
        t.willFireNTimes(eventStore, 'updaterecord', 5);

        var node, box, oldHtml, viewEl

        t.chain(
            { waitFor: 'eventsVisible' },

            function(next) {
                viewEl  = view.getEl()
                node    = viewEl.down(eventSelector).dom;
                box     = Ext.fly(node).getPageBox();
                next();
            },

            { action: 'fingerDown', target : eventSelector },

            { waitFor : 600 },

            function(next) {
                var foundProxy = document.elementFromPoint(box.left+10, box.top+10);

                t.ok(foundProxy === node, 'Proxy element is the same as the original dom');
                t.isDeeply(Ext.fly(foundProxy).getPageBox(), box, 'Proxy should be at same left position as the original el');

                next();
            },

            { action: 'moveFinger', by : [10, 0] },

            function(next) {
                t.selectorExists('.x-dragging', 'Dragging cls should exist while dragging');

                // Proxy should have moved too
                t.is(Ext.fly(node).getXY()[0], box.left+10, 'Proxy should move with finger');

                next();
            },

            { action: 'moveFinger', by : [-10, 0] },

            { action: 'fingerUp' },

            { waitFor : 100 },

            function(next) {
                t.hasCls(t.getElementAtCursor(), 'sch-event', 'Event found after a drag drop operation not modifying the record');
                newEvent.setStartEndDate(sched.getStart(), Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1));
                newEvent.commit();
                next();
            },

            { action: 'fingerDown', target : eventSelector },

            { waitFor : 600 },

            function(next) {
                var oneHourWidth = Ext.getBody().down('.sch-event').getWidth();
                t.moveFingerBy([oneHourWidth, 0], next);
            },

            { action: 'fingerUp' },
            { waitFor : 1000 },

            function(next) {
                t.selectorNotExists('.x-dragging', 'Dragging cls should not exist after drop');
                t.is(newEvent.getStartDate(), Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1), 'Event was moved ok');
                next();
            },

            { action: 'fingerDown', target : eventSelector },
            { waitFor : 1000 },
            { action: 'fingerUp' },

            function(next) {
                t.selectorNotExists('.x-dragging', 'Dragging cls should be removed if long tapping an event and drag never starts.');
                newEvent.reject();
                sched.deselect(newEvent);
                newEvent.setStartEndDate(sched.getStart(), sched.getEnd());

                oldHtml = Ext.getBody().down(eventSelector).dom.outerHTML;
                next();
            },

            // Make sure we cannot drop event outside scheduling area, top-left
            { action: 'fingerDown', target : eventSelector },
            { waitFor : 600 },

            { action: 'moveFinger', by: [0, -50]},

            function(next) {
                var el = Ext.select(eventSelector).first();
                t.isGreaterOrEqual(el.getY(), viewEl.getY(), 'Event bar constrained top');
                next();
            },

            // Make sure we cannot drop event outside scheduling area, bottom-right
            { action: 'moveFinger', by: [0, 100]},

            function(next) {
                var el = Ext.select(eventSelector).first();
                t.isLessOrEqual(el.getY() + el.getHeight(), viewEl.getY() + view.getViewportHeight(), 'Event bar constrained bottom');
                next();
            },

            { action: 'fingerUp' },
            { waitFor : 100 },

            function(next) {
                t.is(newEvent.getStartDate(), sched.getStart(), 'It should not be possible to move event outside scheduling area');

                t.is(document.getElementsByClassName('sch-event')[0].outerHTML.replace(/ /g,""),
                     oldHtml.replace(/ /g,""),
                     'Event identically rendered after trying to move it outside scheduling area');
            }
        );
    };

    doTest(false)
})
