StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        viewPreset : 'hourAndDay',
        startDate : new Date(2010, 1, 1),
        endDate : new Date(2010, 1, 2, 12),
        forceFit : true
    });

    var resourceStore = scheduler.getResourceStore();
    var eventStore = scheduler.getEventStore();
    eventStore.removeAll();
        
    var taskRecord = new Sch.model.Event({
        ResourceId  : resourceStore.first().getId(),
        StartDate   : scheduler.getStart(),
        EndDate     : Ext.Date.add(scheduler.getStart(), Ext.Date.HOUR, 1),
        Cls         : 'first'
    });

    eventStore.add(taskRecord);

    t.willFireNTimes(eventStore, 'updaterecord', 2);

    t.waitForEventsVisible(function() {
        var pinchFeature = scheduler.eventPinch;
        var eventNode = scheduler.getSchedulingView().getElementFromEventRecord(taskRecord).dom;
        var elBox = Ext.fly(eventNode).getPageBox();
        var tickWidth = scheduler.timeAxisViewModel.getTickWidth();

        t.diag('Testing regular pinch')
        pinchFeature.onPinchStart(scheduler, taskRecord, eventNode, { touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right, pageY : elBox.top } ] });

        pinchFeature.onPinch({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right+tickWidth, pageY : elBox.top } ] });

        pinchFeature.onPinchEnd(scheduler, taskRecord, eventNode, { touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right+tickWidth, pageY : elBox.top } ] });

        t.is(taskRecord.getEndDate(), Ext.Date.add(scheduler.getStart(), Ext.Date.HOUR, 2), 'Should find event resized after pinching');

        // -----------------------------------
        t.diag('Testing pinch to extend the event beyond schedule right border')

        var eventNode = scheduler.getSchedulingView().getElementFromEventRecord(taskRecord).dom;
        var elBox = Ext.fly(eventNode).getPageBox();
        pinchFeature.onPinchStart(scheduler, taskRecord, eventNode, { touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right, pageY : elBox.top } ] });

        pinchFeature.onPinch({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right+20000, pageY : elBox.top } ] });

        pinchFeature.onPinchEnd(scheduler, taskRecord, eventNode, { touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.right+20000, pageY : elBox.top } ] });

        t.is(taskRecord.getEndDate(), scheduler.getEnd(), 'Should not be able to extend an event beyond the view end date');
    });
})
