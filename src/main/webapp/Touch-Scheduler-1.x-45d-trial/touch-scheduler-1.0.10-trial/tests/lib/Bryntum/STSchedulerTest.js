Class('Bryntum.STSchedulerTest', {

    isa: Siesta.Test.SenchaTouch,


    methods: {
        isOnline: function () {
            return window.location.href.match(/bryntum\.com|ext-scheduler\.com/i)
        },

        dragEventBy : function(by, callback) {
            this.chain(
                { action    : 'fingerDown', target : '.sch-event' },
                { waitFor   : 500 },
                { action    : 'moveFinger', by : by },
                { action    : 'fingerUp' },
                callback
            );
        },

        waitForRowsVisible : function(scheduler, cb) {
            var me = this;

            if (!(scheduler instanceof this.global.Sch.panel.SchedulerGrid)) {
                cb = scheduler;
                scheduler = this.cq1('schedulerpanel');
            }

            this.waitForSelector('.ubergrid-row', function() { me.waitFor(500, cb); });
        },

        waitForEventsVisible : function(scheduler, cb) {
            if (!(scheduler instanceof this.global.Sch.panel.SchedulerGrid)) {
                cb = scheduler;
                scheduler = this.cq1('schedulerpanel');
            }
            var me = this;
            this.waitForSelector(scheduler.getSchedulingView().eventSelector, function() { me.waitFor(500, cb); });
        },

        getScheduler: function (config, nbrRows, nbrEvents) {
            var Ext = this.global.Ext;
            var Sch = this.global.Sch;
            var events = [];

            if (typeof config === 'number') {
                nbrRows = config;
                config = {};
            }

            if (typeof nbrRows !== 'number') {
                nbrRows = 10;
            }

            var resourceStore = new Sch.data.ResourceStore({

                data: (function () {
                    var retVal = [];

                    for (var i = 0; i < nbrRows; i++) {
                        retVal.push({
                            Id      : i + 1,
                            Cls     : i % 100 === 0 ? 'Terminal' : 'Gate',
                            Name    : i % 100 === 0 ? ('Terminal ' + ((i / 100) + 1)) : ('Gate ' + i)
                        });

                        if (!Ext.isNumber(nbrEvents) || i < nbrEvents) {
                            events.push({
                                Name: 'Event' + (i+1),

                                StartDate: new Date(2012, 2, 1, 3),
                                EndDate: new Date(2012, 2, 1, 4),

                                ResourceId: i+1
                            });
                        }
                    }
                    return retVal;
                })()
            })

            var eventStore = new Sch.data.EventStore({
                resourceStore: resourceStore,

                data: events
            })

           return new Sch.panel.SchedulerGrid(Ext.apply({

                startDate: new Date(2012, 2, 1),
                endDate: new Date(2012, 2, 4),

                lockedWidth: 180,

                viewPreset: 'hourAndDay',

                columns: [
                {
                    field: 'Name',
                    locked: true,
                    width: 120,
                    renderer: function (v, m, r) {
                        m.cellCls = r.get('Cls');
                        return v;
                    }
                },
                {
                    field: 'Terminal',
                    locked: true,
                    width: 60,
                    renderer: function (v, m, r) {
                        m.cellCls = 'gatename';
                        return v;
                    }
                }
            ],

                tabularViewConfig: {
                    buffered: true
                },
                getRowCls: function (rec) {
                    return rec.get('Cls');
                },
                barMargin: 5,
                resourceStore: resourceStore,
                eventStore: eventStore
            }, config || {}))
        },

        getRenderedEvent : function(scheduler) {
            return scheduler.element.down('.sch-event');
        },

        getRenderedScheduler: function(config) {
             var sched = this.getScheduler(config);
             var Ext = this.Ext();

             Ext.Viewport.add(sched);
             return sched;
        },
        
        getHorizontalScroll : function(scheduler) {
            return scheduler.getScheduleScroller().position.x;
        },

        getVerticalScroll : function(scheduler) {
            return scheduler.getScheduleScroller().position.y;
        },

        waitForScrollerLeftChange : function(scroller, callback, scope, timeout) {
            var original        = scroller.position.x;

            this.waitFor({
                method          : function() { if (scroller.position.x !== original) return scroller.position.x; }, 
                callback        : callback,
                scope           : scope, 
                timeout         : timeout,
                assertionName   : 'waitForScrollerLeftChange',
                description     : ' scroller.position.x to change for scroller'
            });
        },

        getFirstTimeCell : function(scheduler) {
            return scheduler.element.down('.sch-schedulerview .sch-timetd');
        },

        getResourceStore: function (config) {
            var Ext = this.global.Ext

            return Ext.create('Sch.data.ResourceStore', Ext.apply({
                model: 'Sch.model.Resource',

                data: [
                    { Id: 'r1', Name: 'Mike' },
                    { Id: 'r2', Name: 'Linda' },
                    { Id: 'r3', Name: 'Don' },
                    { Id: 'r4', Name: 'Karen' },
                    { Id: 'r5', Name: 'Doug' },
                    { Id: 'r6', Name: 'Peter' }
                ]
            }, config || {}));
        },

        getEventStore: function (config) {
            var Ext = this.global.Ext

            return Ext.create('Sch.data.EventStore', Ext.apply({

                data: [
                    { Id: 'e10', ResourceId: 'r1', Name: 'Assignment 1', StartDate: "2011-01-04", EndDate: "2011-01-06" },
                    { Id: 'e11', ResourceId: 'r2', Name: 'Assignment 1', StartDate: "2011-01-05", EndDate: "2011-01-08" },
                    { Id: 'e21', ResourceId: 'r3', Name: 'Assignment 2', StartDate: "2011-01-06", EndDate: "2011-01-08" },
                    { Id: 'e22', ResourceId: 'r4', Name: 'Assignment 2', StartDate: "2011-01-07", EndDate: "2011-01-09" },
                    { Id: 'e32', ResourceId: 'r5', Name: 'Assignment 3', StartDate: "2011-01-03", EndDate: "2011-01-05" },
                    { Id: 'e33', ResourceId: 'r6', Name: 'Assignment 3', StartDate: "2011-01-09", EndDate: "2011-01-11" }
                ]
            }, config || {}));
        }
    }
    // eof methods
})