StartTest(function (t) {

    var resourceStore = new Sch.data.ResourceStore();

    var scheduler = t.getRenderedScheduler({
        renderTo      : document.body,
        startDate     : new Date(2012, 1, 1),
        endDate       : new Date(2012, 1, 2),
        orientation   : 'vertical',
        resourceStore : resourceStore,
        compactMode   : true
    });

    t.it('Should render ok in vertical compact mode', function(t) {

        t.chain(
            { waitFor : 'rowsVisible' }
        );
    })

})
