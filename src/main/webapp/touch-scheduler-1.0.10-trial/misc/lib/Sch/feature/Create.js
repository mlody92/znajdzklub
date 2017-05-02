/**
@class Sch.feature.Create

A class implementing the new event creation feature. If enabled on the main scheduler panel, this class will make sure a new event is created
when a 'schedulesemilongpress' event is detected (after holding finger for 400ms).

*/
Ext.define('Sch.feature.Create', {

    /**
     * @cfg {String} triggerEvent The event name that should trigger creating a new event.
     * Defaults to the custom 'schedulesemilongpress' event.
     */
    triggerEvent        : 'schedulesemilongpress',

    /**
     * @cfg {Int} newEventDuration The duration for a newly created event. If not specified, a new event will have the duration of a single time column tick.
     */
    newEventDuration    : null,

    /**
     * @cfg {String} newEventDurationUnit The duration unit for a newly created event.
     */
    newEventDurationUnit: null,

    scheduler           : null,
    eventStore          : null,

    constructor: function (config) {
        Ext.apply(this, config);
        this.eventStore = this.scheduler.eventStore;

        this.scheduler.on(this.triggerEvent, this.doCreate, this);
    },

    doCreate : function(sched, resource, date) {
        if (this.scheduler.isReadOnly()) return;

        var model   = this.eventStore.getModel(),
            ta      = this.scheduler.getTimeAxis(),
            tick    = Math.floor(ta.getTickFromDate(date)),
            start   = ta.getAt(tick).getStartDate(),
            end;

        if (this.newEventDuration && this.newEventDurationUnit) {
            end = Sch.util.Date.add(start, this.newEventDuration, this.newEventDurationUnit);
        } else {
            end = ta.getAt(tick).getEndDate();
        }

        var newEvent = new model();
        newEvent.setStartEndDate(start, end);
        newEvent.assign(resource);

        this.scheduler.getSchedulingView().onEventCreated(newEvent);

        this.eventStore.add(newEvent);
    }
});
