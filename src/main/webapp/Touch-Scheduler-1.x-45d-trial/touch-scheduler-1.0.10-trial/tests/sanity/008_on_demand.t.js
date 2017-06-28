StartTest(function(t) {

    if (t.isOnline()) {
        t.diag('Developers only test')

        return
    }

    Ext.Loader.setConfig({
        enabled             : true,
        disableCaching      : true
    });

    Ext.Loader.setPath('Sch', '../misc/lib/Sch')
    Ext.Loader.setPath('UberGrid', '../misc/lib/UberGrid')

    Ext.Loader.syncRequire = function(msg) {
        t.fail('Tried to synchronously load class: ' + msg);
    };

    t.requireOk([
        'Sch.panel.SchedulerGrid'
    ], function () {
        var sched1 = t.getRenderedScheduler({
            orientation : 'horizontal'
        });

        var sched2 = t.getRenderedScheduler({
            orientation : 'vertical'
        });

        t.ok(sched1.element, 'Component 1 has been rendered')
        t.ok(sched2.element, 'Component 2 has been rendered')
    })
})    
