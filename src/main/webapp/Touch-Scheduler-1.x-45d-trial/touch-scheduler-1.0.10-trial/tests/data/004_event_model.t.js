StartTest(function(t) {
    t.diag('Verifying the custom "previous" model property works');

    var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data : [
                {Id : 'c1', Name : 'Foo'},
                {Id : 'c2', Name : 'Foo'}
            ]
        }),

    // Store holding all the events
        eventStore = Ext.create('Sch.data.EventStore', {
            data : [
                {ResourceId: 'c1', Name : 'Mike', StartDate : "2010-12-09 09:45", EndDate : "2010-12-09 11:00"},
                {ResourceId: 'c2', Name : 'Linda', StartDate : "2010-12-09 10:15", EndDate : "2010-12-09 12:00"}
            ]
        }),
        event = eventStore.first();

    eventStore.resourceStore = resourceStore;
    resourceStore.eventStore = eventStore;

    t.is(event.getResource(), resourceStore.first(), "getResource located the resource from an event");
    t.is(resourceStore.first().getEvents()[0], eventStore.first(), "getEvents located the correct event");

    eventStore.on('update', function(s, model) {
        t.is(model.modified.ResourceId, 'c1', 'After "set", The model "modified" object contained the original resource value');
        t.is(model.previous.ResourceId, 'c1', 'After "set", The model "previous" object contained the previous resource value');
    }, null, { single : true });

    event.set('ResourceId', 'c2');

    eventStore.on('update', function(s, model) {
        t.is(model.previous.ResourceId, 'c2', 'After "reject", The model "previous" object contained the previous resource value');
    }, null, { single : true });

    event.reject();

    t.diag('Validation');

    t.ok(event.isValid(), 'isValid');

    event.setStartDate(new Date(event.getEndDate().getTime()+1));
    t.notOk(eventStore.first().isValid(), 'isValid fail');

    t.ok(eventStore.first().isPersistable(), 'isPersistable true');

    var resModel = resourceStore.getModel();

    var newResource = new resModel();
    resourceStore.insert(0, newResource);
    eventStore.last().setResource(newResource);

    t.notOk(eventStore.last().isPersistable(), 'isPersistable false');
    t.ok(eventStore.last().getResourceId(), 'found phantom resource internal id');
    t.ok(eventStore.last().getResource(), 'found phantom resource');

    event.setStartDate(null);
    t.is(event.getStartDate(), null, 'Could set end date to null');

    event.setEndDate(null);
    t.is(event.getEndDate(), null, 'Could set end date to null');

    event.setStartEndDate(new Date(2010, 1, 1), new Date(2010, 2, 1));
    t.is(event.getStartDate(), new Date(2010, 1, 1), 'Could set date to 2010, 1, 1');
    t.is(event.getEndDate(), new Date(2010, 2, 1), 'Could set date to 2010, 2, 1');

    event.setStartEndDate(null, null);
    t.is(event.getStartDate(), null, 'Could set start date to null, setStartEndDate');
    t.is(event.getEndDate(), null, 'Could set end date to null, setStartEndDate');
})    
