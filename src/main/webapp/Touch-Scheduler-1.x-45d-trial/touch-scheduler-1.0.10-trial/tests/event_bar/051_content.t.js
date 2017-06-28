StartTest(function(t) {
    var scheduler = t.getRenderedScheduler();

    var resourceStore = scheduler.getResourceStore();
    var eventStore = scheduler.getEventStore();
    eventStore.removeAll();
        
    var newEvent = new Sch.model.Event({
        ResourceId: resourceStore.first().getId(),
        StartDate: scheduler.getStart(),
        EndDate: Ext.Date.add(scheduler.getStart(), Ext.Date.HOUR, 1)
    });

    eventStore.add(newEvent);
    
    t.chain(
        { waitFor : 'EventsVisible' },
        function () {
            var outerNode = Ext.getBody().down('.sch-event').dom;
        
            t.hasNotCls(outerNode, 'null', 'Should not find null if event is lacking Cls attribute');
        
            var innerNode = Ext.getBody().down('.sch-event-inner').dom;
            var innerContent = Ext.getBody().down('.sch-event-inner').dom.innerHTML;
        
            t.is(innerContent, '', 'Empty content for event without Name')
        
            newEvent.setName('Foo')
            var innerContent = Ext.getBody().down('.sch-event-inner').dom.innerHTML;
            t.is(innerContent, 'Foo', 'Found Name rendered');
        }
    )
})
