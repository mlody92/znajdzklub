StartTest(function(t) {
    var scheduler = t.getRenderedScheduler({
        orientation : 'vertical'
    });

    t.waitForEventsVisible(function() {
        var pinchFeature = scheduler.schedulePinch;
        var cellNode = scheduler.getSchedulingView().getEl().down('.sch-timetd');
        var elBox = Ext.fly(cellNode).getPageBox();

        t.it('Fake a horizontal pinch', function(t) {
            var oldColWidth = scheduler.normalGrid.columns.children[0].getWidth();

            t.isApprox(oldColWidth, Ext.getBody().down('.sch-event').getWidth(), 10);

            t.firesOnce(scheduler, 'refresh', 1, 'Scheduler refreshResourceColumns method should be called once');

            pinchFeature.onPinchStart({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left + 10, pageY : elBox.top } ] }, cellNode);

            pinchFeature.onPinch({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left+80, pageY : elBox.top } ] }, cellNode);

            pinchFeature.onPinchEnd({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left+80, pageY : elBox.top } ] }, cellNode );

            t.isGreater(scheduler.normalGrid.columns.children[0].getWidth(), oldColWidth, 'Col width should increase');

            t.isApprox(scheduler.normalGrid.columns.children[0].getWidth(), Ext.getBody().down('.sch-event').getWidth(), 10);
        })
//
//        // TODO Not yet supported
//        t.it('Fake a vertical pinch', function(t) {
//            t.isCalledNTimes('zoomIn', scheduler, 1, 'Scheduler zoomIn method should be called once');
//
//            pinchFeature.onPinchStart({ touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 10 } ] }, cellNode);
//
//            pinchFeature.onPinch({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 80 } ] }, cellNode);
//
//            pinchFeature.onPinchEnd({ scale : 1.5, touches : [ {pageX : elBox.left, pageY : elBox.top }, { pageX : elBox.left, pageY : elBox.top + 80 } ] }, cellNode );
//        })
    });
})
