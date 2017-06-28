Ext.setup({

    onReady : function () {
        Ext.define('Zone', {
            extend : 'Sch.model.Range',
            config : {
                fields : [
                    'Type'
                ]
            }
        });

        Ext.define('Line', {
            extend : 'Ext.data.Model',
            config : {
                fields : [
                    'Date',
                    'Text',
                    'Cls'
                ]
            }
        });

        var lineStore = Ext.create('Ext.data.JsonStore', {
            model : 'Line',
            data  : [
                {
                    Date : new Date(2011, 0, 9, 12),
                    Text : 'Some important date',
                    Cls  : 'important'
                }
            ]
        });

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
                sorters : {
                    property  : 'Name',
                    direction : "ASC"
                },
                proxy   : {
                    url    : 'resources.xml',
                    type   : 'ajax',
                    reader : {
                        type   : 'xml',
                        record : 'Resource',
                        idPath : 'Id'
                    }
                }
            }),

        // Store holding all the events
            eventStore = new Sch.data.EventStore({
                proxy : {
                    url    : 'events.xml',
                    type   : 'ajax',
                    reader : {
                        type   : 'xml',
                        idPath : 'Id',
                        record : 'Event'
                    }
                }
            }),

            zoneStore = Ext.create('Ext.data.JsonStore', {
                model : 'Zone',
                data  : [
                    {
                        StartDate : new Date(2011, 0, 6),
                        EndDate   : new Date(2011, 0, 7),
                        Type      : 'Day off',
                        Cls       : 'myZoneStyle'
                    }
                ]
            });

        var scheduler = new Sch.panel.SchedulerGrid({
            passStartEndParameters : true,
            startDate              : new Date(2011, 0, 3),
            endDate                : new Date(2011, 0, 13),
            viewPreset             : 'dayAndWeek',
//            orientation            : 'vertical',
            eventRenderer          : function (event, r, tplData, row) {
                var cls;
                switch (row % 3) {
                    case 0 :
                        cls = "type1";
                        break;

                    case 1 :
                        cls = "type2";
                        break;

                    case 2 :
                        cls = "type3";
                        break;
                }
                if (event.isDraggable()) {
                    tplData.cls = cls;
                }

                return event.get('Name') || '';
            },

            // Setup static columns
            columns                : [
                { header : 'Name', sortable : true, width : 100, field : 'Name' }
            ],

            plugins       : [
                this.zonePlugin = Ext.create("Sch.plugin.Zones", {
                    innerTpl : '<span class="zone-type">{Type}</span>',
                    store    : zoneStore
                }),

                Ext.create("Sch.plugin.Lines", {
                    store : lineStore
                })
            ],
            barMargin     : 2,
            resourceStore : resourceStore,
            eventStore    : eventStore
        });

        Ext.Viewport.add([
            {
                xtype  : 'toolbar',
                docked : 'top',
                items  : [
                    {
                        text    : 'Insert zone 1',
                        handler : function (btn) {
                            var newZone = new Zone({
                                StartDate : new Date(2011, 0, 8),
                                EndDate   : new Date(2011, 0, 9),
                                Type      : 'Some random day'
                            });

                            btn.disable();
                            zoneStore.add(newZone);
                        }
                    },
                    {
                        text    : 'Insert zone 2 (alternate styling)',
                        handler : function (btn) {
                            var newZone = new Zone({
                                StartDate : new Date(2011, 0, 3),
                                EndDate   : new Date(2011, 0, 4),
                                Type      : 'Release party',
                                Cls       : 'customZoneStyle'
                            });

                            btn.disable();
                            zoneStore.add(newZone);
                        }
                    },
                    {
                        text    : 'Update zone',
                        handler : function () {
                            zoneStore.last().shift(Sch.util.Date.DAY, 1);
                        }
                    },
                    {
                        text    : 'Add row',
                        handler : function () {
                            var newResource = Ext.ModelManager.create({
                                Name : 'New person'
                            }, 'Sch.model.Resource');

                            resourceStore.add(newResource);
                        }
                    }
                ]
            },
            scheduler
        ]);

        resourceStore.load({
            callback : function () {
//                Ext.Msg.alert('Loading completed', this.getCount() + ' resources loaded');
            }
        });
        eventStore.load();
    }
});
