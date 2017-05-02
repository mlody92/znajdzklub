StartTest(function (t) {
    var sched = t.getScheduler();
    Ext.Viewport.add(sched);

    t.chain(
        {
            waitFor     : 'EventsVisible'
        },
        function () {
            t.selectorExists('.sch-timelineview', 'sch-timelineview selector found');
            t.selectorExists('.sch-schedulerview', 'sch-schedulerview selector found');
            
            t.selectorNotExists('[id*="undefined-"]', 'No undefined/null data used in rendering');
            t.selectorNotExists('[class*="undefined"]', 'No undefined/null data used in rendering');
            t.selectorNotExists('[class*="null"]', 'No undefined/null data used in rendering');
        }
    )
})    
