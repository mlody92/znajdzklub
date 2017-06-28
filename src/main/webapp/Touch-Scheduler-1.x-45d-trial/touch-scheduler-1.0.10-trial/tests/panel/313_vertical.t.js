StartTest(function (t) {

    var resourceStore = new Sch.data.ResourceStore();

    var scheduler = t.getRenderedScheduler({
        renderTo      : document.body,
        startDate     : new Date(2012, 1, 1),
        endDate       : new Date(2012, 1, 2),
        orientation   : 'vertical',
        resourceStore : resourceStore
    });

    t.it('Should react to resource store changes', function(t) {

        t.chain(
            { waitFor : 'rowsVisible' },

            function (next) {
                scheduler.switchViewPreset('minuteAndHour', new Date(2010, 1, 1), new Date(2010, 1, 1, 1));

                t.waitFor(function() {
                    return Ext.select('.sch-verticaltimeaxis-cell').getCount() === 2;
                }, next)
            },

            function(next) {

                resourceStore.add([{
                    Id   : 1,
                    Name : 'Foo'
                },{
                    Id   : 2,
                    Name : 'Bar'
                }])

                t.waitForSelector('.ubergrid-header-column:contains(Foo)', next)
            },

            function(next) {
                resourceStore.remove(resourceStore.first())

                t.waitForSelectorNotFound('.ubergrid-header-column:contains(Foo)', next)
            },

            function(next) {

                resourceStore.removeAll()

                t.waitForSelectorNotFound('.ubergrid-header-column:contains(Bar)', next)
            },

            function(next) {

                resourceStore.setData([
                    {
                        Name : 'Baz'
                    }
                ])

                t.waitForSelector('.ubergrid-header-column:contains(Baz)', next)
            }
        );
    })

})
