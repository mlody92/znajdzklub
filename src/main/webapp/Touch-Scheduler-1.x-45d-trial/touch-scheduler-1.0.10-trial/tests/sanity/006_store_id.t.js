StartTest(function(t) {

    Ext.define('Sch._resourcestore', {
        extend : 'Sch.data.ResourceStore',
        config : {
            storeId : 'res'
        }
    });

    new Sch._resourcestore();

    Ext.define('Sch._eventstore', {
        extend : 'Sch.data.EventStore',
        config : {
            storeId : 'eve'
        }
    });

    new Sch._eventstore();


    var sched = t.getScheduler({
        eventStore : 'eve',
        resourceStore : 'res'
    });

})
