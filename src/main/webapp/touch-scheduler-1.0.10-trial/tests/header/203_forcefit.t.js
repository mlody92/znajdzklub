StartTest(function(t) {
    // Trying to squeeze too many header cells may cause alignment issues unless 'sch-header-row-compact' is applied correctly
    var sched = t.getScheduler({
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2),
        forceFit    : true
    }, 1);

    Ext.Viewport.add(sched);

    function validate(text) {
        var lowestRow = sched.normalGrid.element.down('.sch-header-row-middle');
        var cells = Ext.select('.sch-header-row-middle .sch-column-header');
        var isBelowThreshold = cells.first().getWidth() <= Sch.column.HorizontalScheduler.prototype.compactCellWidthThreshold;

        t[isBelowThreshold ? 'hasCls' : 'hasNotCls'](lowestRow, 'sch-header-row-compact', text + ': Correct cls found for compact bottom cells');

        var colLines = Ext.select('.sch-column-line');

        for (var i = 0; i < 5; i++) {
            t.is(cells.item(i+1).getX(), colLines.item(i).getX(), text + '[' + i  + '] line aligned');
        }
    }

    t.chain(
        {
            waitFor : 'selector', args : '.sch-column-line'
        },
        function(next) {
            validate('24 cells');
            sched.setEnd(new Date(2010, 1, 3));
            next();
        },
        {
            waitFor : 100
        },

        function(next) {
            validate('48 cells');
            sched.setEnd(new Date(2010, 1, 4));
            next();
        },

        {
            waitFor : 100
        },

        function(next) {
            validate('72 cells');
        }
    )
})    

