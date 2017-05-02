StartTest(function(t) {
    var scheduler = t.getRenderedScheduler();

    var resourceStore = scheduler.getResourceStore();
    var eventStore = scheduler.getEventStore();
    eventStore.removeAll();
        
    var newEvent = new Sch.model.Event({
        ResourceId: resourceStore.first().getId(),
        StartDate: scheduler.getStart(),
        EndDate: Ext.Date.add(scheduler.getStart(), Ext.Date.HOUR, 1),
        Cls : 'first'
    });

    eventStore.add(newEvent);
    
    t.selectorNotExists('.sch-event-selected', 'No selected events initially');

    t.chain(
        { waitFor : 'eventsVisible'},

        { action : 'tap', target : '.sch-schedulerview .first' },
        
        function(next) {
            t.selectorExists('.first.sch-event-selected', '1 selected events after tap');

            t.newEvent = new Sch.model.Event({
                ResourceId: resourceStore.getAt(2).getId(),
                StartDate: scheduler.getStart(),
                EndDate: Ext.Date.add(scheduler.getStart(), Ext.Date.HOUR, 1),
                Cls : 'second'
            });

            eventStore.add(t.newEvent);
            next();
        },

        { waitFor : 'selector', args: '.sch-schedulerview .second' },

        { action : 'tap', target : '.sch-schedulerview .second' },

        function(next) {
            t.selectorNotExists('.first.sch-event-selected', 'First event no longer selected');
            t.selectorExists('.second.sch-event-selected', 'Event 2 selected');
            t.newEvent.shift(Ext.Date.MINUTE, 1);
            
            t.selectorExists('.second.sch-event-selected', 'Event 2 should still be selected after being updated');
            
            scheduler.shiftNext();
            scheduler.shiftPrevious();
            
            t.selectorExists('.second.sch-event-selected', 'Event 2 should still be selected after view refresh');

            scheduler.deselect(t.newEvent);
            t.selectorNotExists('.second.sch-event-selected', 'Second event should no longer be selected after deselect');
            
            next();
        },

        { action : 'fingerDown', target : '.sch-schedulerview .second', by : [100, 0] },
        { waitFor : 1000 },
        { action : 'moveFinger', by : [100, 0] },
        { action : 'fingerUp' },
        
        { action : 'tap', target : '.sch-schedulerview .second' },
        
        function(next) {
            t.selectorExists('.second.sch-event-selected', 'Event 2 should be selected being dragged, then tapped');
           
            next();
        },

        { action : 'tap', target : '.sch-schedulerview' },

        function(next) {
            t.selectorNotExists('.sch-event-selected', 'No selected events after tapping container');
            next();
        }
    )
})    
