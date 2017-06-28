StartTest(function (t) {

    var sched = t.getScheduler({
        rowHeight   : 50,
        viewPreset  : 'hourAndDay',
        orientation : 'vertical'
    }, 2);

    Ext.Viewport.add(sched);

    var expected = Sch.preset.Manager.get('hourAndDay').timeColumnWidth;

    t.chain(
        { waitFor : 'rowsVisible' },

        function () {
            t.isApprox(Ext.getBody().down('.sch-schedulerview .ubergrid-row').getHeight(), expected, 1, 'Correct height vertical row');
        }
    );
})    
