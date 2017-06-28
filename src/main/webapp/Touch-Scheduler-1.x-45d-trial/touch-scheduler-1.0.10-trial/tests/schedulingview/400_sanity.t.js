StartTest(function (t) {
    var sched = t.getScheduler(null, 1);
    Ext.Viewport.add(sched);

    t.chain(
        {
            waitFor : 'eventsVisible'
        },

        function(next) {
            var schedulingView = sched.getSchedulingView();

            t.it('Should copy view specific settings from panel to view', function(t) {
                t.expect(schedulingView.cellBorderWidth).toBe(1);
                t.expect(schedulingView.cellTopBorderWidth).toBe(1);
                t.expect(schedulingView.cellBottomBorderWidth).toBe(0);
                t.expect(schedulingView.eventBorderWidth).toBe(1);
            })

            t.is(Ext.select('.sch-event').getCount(), sched.eventStore.getCount(), 'Correct nbr events rendered initially');
            t.is(Ext.select('.sch-schedulerview .sch-event').getCount(), 1, 'Correct nbr events rendered in scheduler view initially');

            sched.eventStore.removeAll();
            t.is(Ext.select('.sch-event').getCount(), 0, 'No events rendered after store clear');

            var newEvent = new Sch.model.Event({
                ResourceId: sched.resourceStore.first().getId(),
                StartDate: sched.getStart(),
                EndDate: Ext.Date.add(sched.getStart(), Ext.Date.HOUR, 1)
            });

            sched.eventStore.add(newEvent);

            t.is(Ext.select('.sch-event').getCount(), 1, 'Only 1 event rendered after eventstore add');
        }
    )

})
