StartTest(function (t) {

    var eventStore = t.getEventStore({
        proxy : {
            type : 'ajax',
            url  : t.harness.absolutizeURL('data/050_data.json')
        }
    });

    var scheduler = t.getScheduler({
        passStartEndParameters : true,
        startParamName         : 'foo',
        endParamName           : 'bar',
        eventStore             : eventStore
    });

    t.wait('storeload');

    eventStore.load({
        callback : function (f, operation) {
            t.endWait('storeload');

            var params = operation.getParams();
            t.ok(params, 'Should find a params object');

            t.isDateEqual(params.foo, scheduler.getStart(), "Start date parameter applied to request params");
            t.isDateEqual(params.bar, scheduler.getEnd(), "End date parameter applied to request params");
        }
    });

    // https://www.assembla.com/spaces/bryntum/tickets/1016#/activity/ticket:
    t.it('Should respect defaults set on Model fields', function(t) {
        var eventStore = new Sch.data.EventStore({
            data    : [
                {
                    Id         : 1
                }
            ]
        });

        var model = eventStore.first();

        t.ok(model.isDraggable(), 'Draggable initially');

        eventStore.setData(
            [
                {
                    Id         : 1
                }
            ]
        )

        model = eventStore.first();

        t.knownBugIn('2.3.0', function(t) {
            t.ok(model.isDraggable(), 'Draggable after reloading data');
        })
    })
});
