StartTest(function(t) {
    var sched2 = t.getRenderedScheduler();
    sched2.destroy();

    t.selectorNotExists('[class*="sch-"]', 'No sch-XXX selectors found in DOM')
})
