StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({});

    scheduler.eventStore.removeAll();

    t.waitForRowsVisible(function() {
        var pinchFeature = scheduler.schedulePinch;
        var cellNode = scheduler.getSchedulingView().getEl().down('.sch-timetd');
        var elBox = Ext.fly(cellNode).getPageBox();

        t.it('Fake a horizontal pinch', function(t) {
            t.isCalledNTimes('zoomIn', scheduler, 1, 'Scheduler zoomIn method should be called once');

            pinchFeature.onPinchStart({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left + 10, pageY : elBox.top } ] }, cellNode);

            pinchFeature.onPinch({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left+80, pageY : elBox.top } ] }, cellNode);

            pinchFeature.onPinchEnd({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left+80, pageY : elBox.top } ] }, cellNode );
        })

        t.it('Fake a vertical pinch', function(t) {
            t.isCalledNTimes('setRowHeight', scheduler.getSchedulingView(), 1, 'Scheduler setRowHeight method should be called once');

            pinchFeature.onPinchStart({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 10 } ] }, cellNode);

            pinchFeature.onPinch({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 80 } ] }, cellNode);

            pinchFeature.onPinchEnd({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 80 } ] }, cellNode );
        })
    });
})
