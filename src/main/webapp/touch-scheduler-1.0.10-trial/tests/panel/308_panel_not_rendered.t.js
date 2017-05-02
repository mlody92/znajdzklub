StartTest(function(t) {
    var scheduler = t.getScheduler();

    scheduler.resourceStore.sort('Name', 'DESC')
    scheduler.resourceStore.sort('Name', 'ASC')
    t.pass('Scheduler should handle a store update when not rendered');

    scheduler.destroy();
    scheduler.resourceStore.sort('Name', 'DESC')
})

