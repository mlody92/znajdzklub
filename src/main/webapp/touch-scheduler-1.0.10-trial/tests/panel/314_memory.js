describe('Panel should not leak stores', function (t) {

    t.it('Should deregister internal stores', function (t) {
        var nbrStoresBefore      = Ext.StoreManager.getCount();
        var nbrClassesBefore     = Object.keys(Ext.ClassManager.classes).length;
        var observableBefore     = Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.observable || {}).length;
        var elementBefore        = Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.element || {}).length;
        var componentBefore      = Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.component || {}).length;
        var cachedElementsBefore = Object.keys(Ext.Element.cache).length;

        var steps = [];
        var scheduler;

        for (var i = 0; i < 10; i++) {

            steps.push([
                function (next) {
                    scheduler = t.getRenderedScheduler({
                        startDate : new Date(2016, 1, 1),
                        endDate   : new Date(2016, 1, 11),
                        plugins   : [
                            new Sch.plugin.CurrentTimeLine()
                        ]
                    });


                    t.waitForRowsVisible(scheduler, next);
                },

                function (next) {
                    scheduler.zoomIn();
                    t.waitFor(50, next);
                },
                function (next) {
                    scheduler.zoomOut();
                    t.waitFor(50, next);
                },

                function (next) {
                    scheduler.destroy();
                    scheduler.eventStore.destroy();
                    scheduler.resourceStore.destroy();
                    scheduler.timeAxis.destroy();

                    next()
                }
            ])
        }

        t.chain(
            steps,

            function () {
                t.is(Object.keys(Ext.Element.cache).length, cachedElementsBefore, 'No extra cached elements found')

                Ext.Viewport.destroy();

                t.is(Ext.StoreManager.getCount(), nbrStoresBefore, 'No leaked stores found')
                t.is(Object.keys(Ext.ClassManager.classes).length, nbrClassesBefore, 'No leaked classes found')
                t.is(Object.keys(Ext.data.Model.cache).length, 0, 'No cached models found')

                t.it('should not find any leaked listener objects', function (t) {

                    t.is(Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.observable).length, observableBefore, 'observable')
                    t.is(Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.element).length, elementBefore, 'element')
                    t.is(Object.keys(Ext.event.Dispatcher.getInstance().listenerStacks.component).length, componentBefore, 'component')
                })
            })
    })
})
