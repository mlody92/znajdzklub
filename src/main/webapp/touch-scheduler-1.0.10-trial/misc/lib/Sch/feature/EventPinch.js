/**
 *
 * @class Sch.feature.EventPinch
 *
 * A class implementing the event pinch/resize feature. If enabled on the main scheduler panel, this class will make sure events can be resized using
 * a two finger pinch gesture.
 */
Ext.define('Sch.feature.EventPinch', {

    scheduler     : null,
    eventEl       : null,
    eventRecord   : null,
    origWidth     : null,
    leftX         : null,
    startDistance : null,
    newWidth      : null,
    maxWidth      : null,

    constructor : function (config) {
        Ext.apply(this, config);

        this.scheduler.on({
            eventpinchstart : this.onPinchStart,
            scope           : this
        });
    },

    onPinchStart : function (sch, eventRecord, el, e) {
        var scheduler = this.scheduler;
        var isHoriz = scheduler.getOrientation() === 'horizontal';

        if (scheduler.isReadOnly() || scheduler.fireEvent('beforeeventresize', scheduler, eventRecord, e) === false) {
            return;
        }

        // Allow XML data input as "0", since type of the resizable field is not boolean.
        if (eventRecord.isResizable() === false || eventRecord.isResizable() === "0") {
            return;
        }

        var timeAxisProp = isHoriz ? 'pageX' : 'pageY';
        this.startDistance = Math.max(e.touches[0][timeAxisProp], e.touches[1][timeAxisProp]) - Math.min(e.touches[0][timeAxisProp], e.touches[1][timeAxisProp]);

        delete Ext.Element.cache[ el.id ]

        this.eventEl = Ext.get(el);
        this.eventRecord = eventRecord;
        this.origWidth = isHoriz ? this.eventEl.getWidth() : this.eventEl.getHeight();

        this.maxWidth = scheduler.getSchedulingView().getCoordinateFromDate(scheduler.getEnd()) - (this.eventEl[isHoriz ? 'getLeft' : 'getTop']()) - 1;

        scheduler.element.on('pinch', this.onPinch, this);
        scheduler.on('eventpinchend', this.onPinchEnd, this, { single : true });

        this.eventEl.addCls('sch-event-pinching');

        scheduler.fireEvent('eventresizestart', scheduler, eventRecord);
    },

    onPinch : function (e) {
        var timeAxisProp = this.scheduler.getOrientation() === 'horizontal' ? 'pageX' : 'pageY';
        var newDistance = Math.max(e.touches[1][timeAxisProp], e.touches[0][timeAxisProp]) - Math.min(e.touches[1][timeAxisProp], e.touches[0][timeAxisProp]);
        var newWidth = this.newWidth = Math.min(this.maxWidth, Math.max(this.origWidth + newDistance - this.startDistance, 1));

        // Reduce the number of DOM updates, no need for 1px precision
        if (newWidth % 2) {
            var isHoriz = this.scheduler.getOrientation() === 'horizontal';

            this.eventEl[isHoriz ? 'setWidth' : 'setHeight'](newWidth);
        }
    },

    onPinchEnd : function (sch, eventRecord, el, e) {
        var me = this;
        var isHoriz = this.scheduler.getOrientation() === 'horizontal';
        var newEnd = this.scheduler.getSchedulingView().getDateFromCoordinate(this.eventEl[isHoriz ? 'getLeft' : 'getTop']() + me.newWidth, 'round', true);

        this.scheduler.element.un('pinch', this.onPinch, this);

        me.resizeContext = {
            eventRecord : eventRecord,
            start       : eventRecord.getStartDate(),
            end         : newEnd,
            finalize    : function () {
                me.finalize.apply(me, arguments);
            }
        };

        if (me.scheduler.fireEvent('beforeeventresizefinalize', me, me.resizeContext, e) !== false) {
            me.finalize(true);
        }
    },

    finalize : function (updateRecord) {
        var context = this.resizeContext;
        var scheduler = this.scheduler;

        if (updateRecord) {
            this.eventRecord.setEndDate(context.end);
        }

        scheduler.fireEvent('eventresizeend', scheduler, context.eventRecord);

        this.eventEl.destroy();
        this.eventRecord = null;
        this.eventEl = null;
    }
});
