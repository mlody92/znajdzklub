StartTest(function(t) {
    var resourceStore = new Sch.data.ResourceStore();
    var eventStore = new Sch.data.EventStore();

    var resListBefore = Ext.clone(resourceStore.managedListeners);
    var evListBefore = Ext.clone(eventStore.managedListeners);

    var sched = t.getScheduler({
        eventStore      : eventStore,
        resourceStore   : resourceStore
    });

    Ext.Viewport.add(sched);
    eventStore.add({});
    sched.destroy();

    var resListAfter = resourceStore.managedListeners;
    var evListAfter = eventStore.managedListeners;

    function verifyObservable(name, before, after) {
        for (var o in after) {
            for (var p in after[o]) {
                if ((!before[o] && after[o][p].length > 0) ||
                    (before[o] && p in before[o] && before[o][p].length !== after[o][p].length))
                {
                    t.fail(name + ': listening to ' + o + ' "' + p + '" event, not cleaned up after Scheduler was destroyed');
                }
            }
        }
    }

    // How do we get a list of listeners easily?
    // http://www.sencha.com/forum/showthread.php?247515-Getting-hold-of-registered-listeners-in-ST
//    verifyObservable('eventStore', evListBefore, evListAfter);
//    verifyObservable('resourceStore', resListBefore, resListAfter);
})
