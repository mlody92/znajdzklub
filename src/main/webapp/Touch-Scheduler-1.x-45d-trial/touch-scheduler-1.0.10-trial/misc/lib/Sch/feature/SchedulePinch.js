/**
 *
 * @class Sch.feature.SchedulePinch
 *
 * A class implementing the schedule pinch feature. If enabled on the main scheduler panel, you can pinch the schedule area:
 * - horizontally to zoom the time axis
 * - vertically to change the row height.
 */
Ext.define('Sch.feature.SchedulePinch', {

    /*
     * @cfg {Int} threshold The distance in pixels required to start the pinch operation.
     * @accessor
     */
    threshold           : 30,

    /*
     * @cfg {Int} precision The precision to use when pinching (currently only used for vertical pinch, to limit the number of DOM repaints)
     * @accessor
     */
    precision           : 5,

    /*
     * @cfg {Boolean} enableHorizontal false to disable horizontal pinching (time axis zoom in horizontal mode, column width change in vertical).
     * Note: not supported if SchedulerPanel is using forceFit mode.
     * @accessor
     */
    enableHorizontal    : true,

    /*
     * @cfg {Boolean} enableVertical false to disable vertical pinching (changing row height in horizontal mode, time axis zoom in vertical)
     * @accessor
     */
    enableVertical      : true,

    // private members
    scale               : null,
    startXDistance      : null,
    startYDistance      : null,
    height              : null,
    direction           : null,

    constructor: function (config) {
        Ext.apply(this, config);

        this.scheduler.element.on({
            pinchstart  : this.onPinchStart,
            scope       : this
        });
    },

    onPinchStart: function (event, node) {
        if (!(Ext.fly(node).hasCls('sch-timetd'))) return;

        var scheduler = this.scheduler;

        var sv = this.scheduler.getSchedulingView();
        this.height = sv.getRowHeight();
        this.direction = null;

        this.startXDistance = Math.abs(event.touches[0].pageX - event.touches[1].pageX);
        this.startYDistance = Math.abs(event.touches[0].pageY - event.touches[1].pageY);

        scheduler.normalGrid.bodyCmp.element.on({
            pinch       : this.onPinch,
            pinchend    : this.onPinchEnd,

            scope       : this
        });
    },

    onPinch: function (event, node) {
        var isHorizontal = this.scheduler.getOrientation() === 'horizontal';

        if (!this.direction) {
            var t = event.touches;
            var xDistance = Math.abs(event.touches[0].pageX - event.touches[1].pageX);
            var yDistance = Math.abs(event.touches[0].pageY - event.touches[1].pageY);

            if (this.enableHorizontal && Math.abs(xDistance - this.startXDistance) > this.threshold) {
                this.direction = 'h';
            } else if (this.enableVertical && Math.abs(yDistance - this.startYDistance) > this.threshold) {
                this.direction = 'v';
            }
        }

        if (this.direction) {
            if (this.direction === 'v' && isHorizontal || this.direction === 'h' && !isHorizontal) {
                var sv = this.scheduler.getSchedulingView();
                var scheduler = this.scheduler;

                var h = sv.getRowHeight() * event.scale;

                if (Math.abs(h - this.height) > this.precision){
                    this.scale = event.scale;
                }
            } else if (this.direction === 'h' && isHorizontal || this.direction === 'v' && !isHorizontal) {
                // Here we should give user a simple visual clue about what is going on
                this.scale = event.scale;
            }
        }
    },

    onPinchEnd: function (event, node) {
        var isHorizontal = this.scheduler.getOrientation() === 'horizontal';

        this.scheduler.normalGrid.bodyCmp.element.un({
            pinch       : this.onPinch,
            pinchend    : this.onPinchEnd,

            scope       : this
        });

        if (this.direction === 'v' && isHorizontal || this.direction === 'h' && !isHorizontal){
            var sv = this.scheduler.getSchedulingView();

            if (isHorizontal) {
                sv.setRowHeight(sv.getRowHeight() * this.scale, !isHorizontal);
            }
            else {
                this.scheduler.resourceColumnWidth = this.scale * this.scheduler.normalGrid.columns.children[0].getWidth();
                sv.setColumnWidth(this.scheduler.resourceColumnWidth);
            }
                                                          // TOOD zooming in vertical mode not supported yet
        } else if (this.direction === 'h' && isHorizontal/* || this.direction === 'v' && !isHorizontal*/) {
            var s = this.scheduler;

            if (this.scale < 1) {
                s.zoomOut();
            } else {
                s.zoomIn();
            }
        }
    }
});
