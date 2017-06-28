Ext.Loader.setPath({
    "App" : 'lib'
});

// A custom view preset with 3 levels and some icons
Sch.preset.Manager.registerPreset("dayNightShift", {
    timeColumnWidth   : 35,
    rowHeight         : 32,
    displayDateFormat : 'G:i',
    shiftIncrement    : 1,
    shiftUnit         : "DAY",
    timeResolution    : {
        unit      : "MINUTE",
        increment : 15
    },
    defaultSpan       : 24,
    headerConfig      : {
        bottom : {
            unit       : "HOUR",
            increment  : 1,
            dateFormat : 'G'
        },
        middle : {
            unit      : "HOUR",
            increment : 12,
            renderer  : function (startDate, endDate, headerConfig, cellIdx) {
                // Setting align on the header config object
                headerConfig.align = 'center';

                if (startDate.getHours() === 0) {
                    // Setting a custom CSS on the header cell element
                    headerConfig.headerCls = 'nightShift';
                    return Ext.Date.format(startDate, 'M d') + ' Night Shift';
                }
                else {
                    // Setting a custom CSS on the header cell element
                    headerConfig.headerCls = 'dayShift';
                    return Ext.Date.format(startDate, 'M d') + ' Day Shift';
                }
            }
        },
        top    : {
            unit       : "DAY",
            increment  : 1,
            dateFormat : 'd M Y'
        }
    }
});

Ext.setup({
    requires : [
        'App.model.Gate',
        'App.store.GateStore',
        'App.store.FlightStore'
    ],

    onReady : function () {

        var gateStore = new App.store.GateStore({
            nbrEntries : 25 // Generate some dummy data
        });

        var flightStore = new App.store.FlightStore();

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate : new Date(2012, 2, 1),
            endDate   : new Date(2012, 2, 2),

            eventRenderer : function (event) {
                return event.getName() + '<br/><span class="departure-time">' + Ext.Date.format(event.getStartDate(), 'G:i') + '</span>';
            },

            lockedWidth : 180, // Make sure left section is scrollable
            rowHeight   : 50,
            viewPreset  : 'dayNightShift',   // Our custom preset

            columns : [
                {
                    header : 'Id',
                    field  : 'Id',
                    locked : true,
                    width  : 30,
                    align  : 'center'
                },
                {
                    header   : 'Gate',
                    field    : 'Name',
                    locked   : true,
                    width    : 120,
                    renderer : function (v, m, r) {
                        m.cellCls = r.get('Cls');
                        return v;
                    }
                },
                {
                    header   : 'Terminal',
                    field    : 'Terminal',
                    locked   : true,
                    width    : 100,
                    renderer : function (v, m, r) {
                        m.cellCls = 'gatename';
                        return v;
                    }
                },
                {
                    header   : 'Max nbr passengers',
                    field    : 'Capacity',
                    locked   : true,
                    width    : 100,
                    renderer : function (v, m, r) {
                        m.cellCls = 'gatename';
                        return v;
                    }
                }
            ],

            getRowCls : function (resource) {
                return resource.get('Cls');
            },

            onEventCreated : function (newEventRecord) {
                // Supply default record values etc.
                newEventRecord.set({
                    Name : 'New task'
                });
            },

            barMargin     : 3,
            resourceStore : gateStore,
            eventStore    : flightStore
        });

        Ext.Viewport.add([
            scheduler,

            // Docked toolbar
            {
                xtype  : 'toolbar',
                docked : 'top',

                // Give it 1 item which is a segmented button
                items  : [
                    {
                        iconMask : true,
                        text     : 'Zoom out',
                        handler  : function () {
                            scheduler.zoomOut();
                        }
                    },
                    {
                        iconMask : true,
                        text     : 'Zoom in',
                        handler  : function () {
                            scheduler.zoomIn();
                        }
                    },
                    { xtype : 'spacer' },
                    {
                        text    : 'Row+',
                        handler : function () {
                            var view = scheduler.getSchedulingView();
                            view.setRowHeight(view.getRowHeight() + 5);
                        }
                    },
                    {
                        text    : 'Row-',
                        handler : function () {
                            var view = scheduler.getSchedulingView();
                            view.setRowHeight(view.getRowHeight() - 5);
                        }
                    }
                ]
            }
        ]);

        scheduler.on({
            eventsingletap : function (event, record) {
                Ext.Msg.alert('You tapped', record.get('Name'));
            },
            eventdoubletap : function (event, record) {
                Ext.Msg.alert('You double tapped', record.get('Name'));
            }
        });
    }
});

