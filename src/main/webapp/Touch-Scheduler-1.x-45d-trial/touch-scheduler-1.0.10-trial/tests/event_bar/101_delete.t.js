StartTest(function (t) {
    var sched = t.getScheduler();
    var eventStore = sched.getEventStore();
    eventStore.first().setCls('foo');

    Ext.Viewport.add(sched);

    t.willFireNTimes(eventStore, 'removerecords', 1);

    t.chain(
        { waitFor: 'selector', args : '.foo' },
        
        function(next) {
            eventStore.remove(eventStore.first());
            next();
        },

        { waitFor : 'selectorNotFound', args : '.foo' }
    );
})    
