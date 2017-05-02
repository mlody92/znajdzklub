StartTest(function(t) {
    
    //======================================================================================================================================================================================================================================================
    t.diag('Make sure all the defaults have been properly applied through the various mixins');
    t.expectGlobals('Sub');

    Ext.define('Sub', {
        extend : 'Sch.panel.SchedulerGrid',

        enableEventDragDrop : false,
        stateful : false
    });

    var s = new Sub({
        resourceStore   : t.getResourceStore(),
        eventStore      : t.getEventStore(),
        
        columns : [{ text : 'foo' }],

        barMargin : 100
    });

    t.is(s.enableEventDragDrop, false, 'Correct value for overwritten enableEventDragDrop property');
    t.is(s.getSchedulingView().barMargin, 100, 'Correct value for overwritten barMargin property');
})    
