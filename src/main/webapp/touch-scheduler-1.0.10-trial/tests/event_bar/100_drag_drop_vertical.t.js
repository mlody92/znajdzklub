StartTest(function (t) {

    var sched = t.getScheduler({
        startDate   : new Date(2010, 1, 1),
        endDate     : new Date(2010, 1, 2),
        orientation : 'vertical'
    }, 1);
    var eventSelector = sched.getSchedulingView().eventSelector;

    Ext.Viewport.add(sched);

    var resourceStore = sched.getResourceStore();
    var eventStore = sched.getEventStore();
    eventStore.removeAll();
    var view = sched.getSchedulingView();

    var newEvent = new Sch.model.Event({
        ResourceId : resourceStore.first().getId(),
        StartDate  : sched.getStart(),
        EndDate    : Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 2)
    });

    eventStore.add(newEvent);

    var node, box, oldHtml, viewEl = view.getEl()

    t.it('Proxy position', function (t) {
        t.willFireNTimes(eventStore, 'updaterecord', 1);

        t.chain(
            { waitFor : 'eventsVisible' },

            function (next) {
                node = viewEl.down(eventSelector).dom;
                box = Ext.fly(node).getPageBox();
                next();
            },

            { action : 'fingerDown', target : eventSelector },

            { waitFor : 600 },

            function (next) {
                var foundProxy = document.elementFromPoint(box.left + 10, box.top + 10);

                t.ok(foundProxy === node, 'Proxy element is the same as the original dom');
                t.isDeeply(Ext.fly(foundProxy).getPageBox(), box, 'Proxy should be at same left position as the original el');

                next();
            },

            { action : 'moveFinger', by : [0, 10] },

            function (next) {
                t.selectorExists('.x-dragging', 'Dragging cls should exist while dragging');

                // Proxy should have moved too
                t.is(Ext.fly(node).getXY()[1], box.top + 10, 'Proxy should move with finger');

                next();
            },

            { action : 'moveFinger', by : [0, -10] },

            { action : 'fingerUp', target : eventSelector },

            { waitFor : 100 },

            function (next) {
                t.hasCls(t.getElementAtCursor(), 'sch-event', 'Event found after a drag drop operation not modifying the record');

                newEvent.setStartEndDate(sched.getStart(), Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1));
            }
        );
    })

    t.it('Dragging cls should not exist after drop', function (t) {
        t.willFireNTimes(eventStore, 'updaterecord', 1);

        t.chain(
            { action : 'fingerDown', target : eventSelector },

            { waitFor : 600 },

            function (next) {
                var oneHourWidth = Ext.getBody().down('.sch-event').getHeight();
                t.moveFingerBy([0, oneHourWidth], next);
            },

            { action : 'fingerUp' },
            { waitFor : 1000 },

            function (next) {
                t.selectorNotExists('.x-dragging', 'Dragging cls should not exist after drop');
                t.is(newEvent.getStartDate(), Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1), 'Event was moved ok');
                next();
            }
        );
    });

    t.it('Dragging cls should be removed if long tapping an event and drag never starts', function (t) {

        t.chain(
            { action : 'fingerDown', target : eventSelector },
            { waitFor : 1000 },
            { action : 'fingerUp' },

            function (next) {
                t.selectorNotExists('.x-dragging', 'Dragging cls should be removed if long tapping an event and drag never starts.');

                sched.deselect(newEvent);
            }
        );
    });

    t.it('Make sure we cannot drop event outside scheduling area, left or right', function (t) {
        newEvent.setStartEndDate(sched.getStart(), sched.getEnd());

        t.chain(
            { waitFor : 'rowsVisible' },

            { action : 'fingerDown', target : eventSelector, offset : [20, 20] },
            { waitFor : 1000 },

            { action : 'moveFinger', by : [-20, 0]},

            function (next) {
                var el = Ext.select(eventSelector).first();
                t.isGreaterOrEqual(el.getX(), viewEl.getX(), 'Event bar constrained left');
                next();
            },

            // Make sure we cannot drop event outside scheduling area, bottom-right
            { action : 'moveFinger', by : [40, 0]},

            function (next) {
                var el = Ext.select(eventSelector).first();
                var tableEl = view.getEl().down('.ubergrid-table');
                t.isLessOrEqual(el.getX() + el.getWidth(), tableEl.getX() + tableEl.getWidth(), 'Event bar constrained right');
                next();
            },

            { action : 'fingerUp' },
            { waitFor : 100 },

            function (next) {
                t.is(newEvent.getStartDate(), sched.getStart(), 'It should not be possible to move event outside scheduling area');
            }
        );
    })
})
