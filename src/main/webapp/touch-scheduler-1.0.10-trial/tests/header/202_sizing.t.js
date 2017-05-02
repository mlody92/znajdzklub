StartTest(function(t) {
    // Chrome 50 regression
    // https://productforums.google.com/forum/#!msg/chrome/nv4wfcwUrck/6LDxI2VvAQAJ
    if (Ext.browser.version.version === '50.0.2661.75') return;

    var scheduler = t.getRenderedScheduler();
    
    t.waitForRowsVisible(scheduler, function() {
        var hdr = scheduler.normalGrid.headerCmp.element.down('.ubergrid-header-wrap');

        var tables = hdr.select('[class*=sch-header-row]');
        t.is(tables.getCount(), 2, 'Found two header rows');

        t.isApprox(tables.first().getHeight(), tables.last().getHeight(), 1, 'Header rows should divide the available height equally among them')
        t.is(tables.first().getHeight() + tables.last().getHeight(), hdr.getHeight(), 'Header row heights should equal header height');
    })
})    

