
function post(config) {
    var token = document.querySelector("meta[name='_csrf']").getAttribute('content');
    var header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');
    Ext.Ajax.request({
        url: config.url,
        headers: {'Content-Type': 'application/json', [header]: token},
        jsonData: config.data,
        method: 'POST',
        callback: function (options, success, response) {
            var response = Ext.decode(response.responseText);
            if (response.success) {
                Ext.Msg.alert(response.info);
            } else {
                Ext.Msg.alert(response.error);
            }
        }
    });

}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function getData(config) {
    var list = [];
    Ext.Ajax.request({
        url: config.url,
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        callback: function (options, success, response) {
            var response = Ext.decode(response.responseText);
            Object.keys(response).map(function (objectKey, index) {
                var value = response[objectKey];
                list.push(value.activitiesId);
            });
        }
    });
    return list;
}


/**
 * This is a simple example class showing how you can edit your event meta data. All components used in this form
 * are basic Sencha Touch components, for further information please see the Sencha Touch documentation.
 * http://docs.sencha.com/touch/2-0
 */

/**
 * Here we define a custom FormPanel class. An instance of this will be shown when tapping an event.
 * When hitting the save button, the bound model will be updated.
 */
Ext.define('CustomEditor', {
    extend : 'Ext.form.FormPanel',

    // Align center of form right to event center left, and constrain to viewport
    align : 'cr-cl?',

    showForRecord : function(eventRecord) {
        this.eventRecord = eventRecord;
        var el = this.scheduler.getSchedulingView().getElementFromEventRecord(eventRecord);

        this.setRecord(eventRecord);
        this.down('[cls=sliderlabel]').setHtml(eventRecord.get('Duration'));

        this.showBy(el, this.align);
    },

    init : function(scheduler) {
        this.scheduler = scheduler;

        scheduler.on(this.getTriggerEvent(), this.onTrigger, this);
    },

    // onTrigger : function (sch, rec, target, e) {
    //     this.showForRecord(rec);
    // },

    config : {
        triggerEvent : 'eventtap',
        cls : 'custom-editor',

        modal: true,
        height: 420,
        width: 480,
        centered: true,
        hidden : true,
        hideOnMaskTap: true,

        items: [
            {
                xtype: 'fieldset',
                title: 'Informacje',
                instructions: 'Wprowadź informację dotyczące zajęć.',
                defaults: {
                    labelWidth: 150,
                    labelAlign: 'left'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'Name',
                        label: 'Rodzaj zajęć'
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'StartDate',
                        label: 'Data rozpoczęcia',
                        value: new Date(),
                        picker: {
                            yearFrom: 2017
                        }
                    },
                    {
                        layout: {
                            type : 'hbox'
                        },
                        items: [
                            {
                                xtype: 'sliderfield',
                                labelWidth: 150,
                                label: 'Czas trwania (h)',
                                name: 'Duration',
                                flex: 1,
                                minValue: 0.5,
                                maxValue: 5,
                                increment : 0.5,
                                value: 1,
                                listeners : {
                                    change : function() {
                                        var val = this.getValue();
                                        this.up().down('[cls=sliderlabel]').updateHtml(val);
                                    },
                                    drag : function() {
                                        var val = this.getValue();
                                        this.up().down('[cls=sliderlabel]').updateHtml(val);
                                    }
                                }
                            },
                            {
                                cls : 'sliderlabel',
                                xtype: 'label',
                                width : 40
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'togglefield',
                        label: 'Aktywne',
                        name: 'status',
                        value: 1
                    }
                ]
            },

            // Create a docked bottom toolbar which will contain buttons to trigger various functions in our formpanel.
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    // Here we add a reset button which will reset all fields within the form panel back to their original value
                    {
                        text: 'Anuluj',

                        handler: function() {
                            this.up('formpanel').hide();
                        }
                    },

                    { xtype : 'spacer'},

                    {
                        xtype : 'label',
                        html : 'Zajęcia',
                        style:'color:#fff'
                    },

                    { xtype : 'spacer' },

                    // A Save button which will mask the formpanel, and update the current record in the formpanel with
                    // the latest values from the formpanel.
                    {
                        text: 'Zapisz',
                        ui: 'confirm',
                        handler: function() {
                            var form = this.up('formpanel');

                            // Mask the form
                            form.setMasked({
                                xtype: 'loadmask',
                                message: 'Zapisywanie...'
                            });
                                if (form.eventRecord) {
                                    // Call the updateRecord method of formpanel with the event record instance. This will update the event record
                                    // with the latest values.
                                    form.updateRecord(form.eventRecord, true);

                                    var startDate = form.eventRecord.data.StartDate;
                                    var finalDate = new Date(startDate.getTime() + form.eventRecord.data.Duration*3600000);
                                    form.eventRecord.data.EndDate = finalDate;
                                    form.eventRecord.data.ClubId = form.eventRecord.data.ResourceId;
                                    var data = {
                                        name: form.eventRecord.data.Name,
                                        endDate: finalDate,
                                        startDate: startDate,
                                        clubId: form.eventRecord.data.ResourceId,
                                        status: (form.eventRecord.data.status) ? 'aktywne' : 'nieaktywne'
                                    };
                                    post({
                                        url: 'add-activity', data: data
                                    });
                                }

                                // Unmask and hide the formpanel
                                form.setMasked(false);
                                form.hide();
                        }
                    }
                ]
            }, {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        cls: 'delete-task',
                        text: 'Usuń',
                        flex : 1,
                        handler: function() {
                            var form = this.up('formpanel');
                            var record = form.eventRecord;
                            console.log(record);
                            var data = {
                                name: form.eventRecord.data.Name,
                                clubId: form.eventRecord.data.ResourceId
                            };
                            post({
                                url: 'delete-activity', data: record.data
                            });
                            form.hide();
                            record.stores[0].remove(record);
                        }
                    }
                ]
            }
        ]
    }
});


var D = Sch.util.Date;

Ext.define('Klub', {
    extend: 'Sch.model.Resource',
    config: {
        fields: [
            {name: 'Id', mapping: 'id'},
            {name: 'title', mapping: 'title'},
            {name: 'description', mapping: 'description'},
            {name: 'website', mapping: 'website'},
            {name: 'address', mapping: 'address'},
            {name: 'email', mapping: 'email'},
            {name: 'phone', mapping: 'phone'},
            {name: 'status', mapping: 'status'},
            {name: 'date', mapping: 'date'},
            {name: 'postalCode', mapping: 'postalCode'},
            {name: 'user', mapping: 'login'},
            {name: 'category', mapping: 'categoryName'}
        ]
    }
});


var myActivities = getData({url: 'myActivities'});

Ext.define('Activities', {
    extend: 'Sch.model.Event',
    config: {
        fields: [
            {name: 'Id', mapping: 'id'},
            {name: 'Name', mapping: 'name'},
            {name: 'ResourceId', mapping: 'clubId'},
            {name: 'StartDate', mapping: 'startDate', type: 'date', format: 'Y-m-d H:i'},
            {name: 'EndDate', mapping: 'endDate', type: 'date', format: 'Y-m-d H:i'},
            {name : 'Duration', type : 'float', convert: function (newValue, model) {
                var startDate=model.get('StartDate');
                var endDate = model.get('EndDate');
                var duration = new Date(endDate).getHours() - new Date(startDate).getHours();
                return duration.toFixed(1);
            } },
            {name : 'status', mapping: 'status', type : 'string' },
            {
                name: 'Cls', type: 'string',
                convert: function (newValue, model) {
                    if (isInArray(model.get('id'), myActivities)) {
                        return 'air-delayed';
                    }
                    return 'air-ontime';
                }
            }
        ]
    }  ,
    getEndDate : function() {
        return D.add(this.getStartDate(), D.MINUTE, this.get('Duration') * 60);
    }
});

Sch.preset.Manager.registerPreset("dayNightShift", {
    timeColumnWidth: 35,
    rowHeight: 32,
    displayDateFormat: 'G:i',
    shiftIncrement: 1,
    shiftUnit: "DAY",
    timeResolution: {
        unit: "MINUTE",
        increment: 15
    },
    defaultSpan: 24,
    headerConfig: {
        bottom: {
            unit: "HOUR",
            increment: 1,
            dateFormat: 'G'
        },
        middle: {
            unit: "HOUR",
            increment: 24,
            renderer: function (startDate, endDate, headerConfig, cellIdx) {
                headerConfig.align = 'center';
                return Ext.Date.format(startDate, 'M d');
            }
        },
        top: {
            unit: "DAY",
            increment: 1,
            dateFormat: 'd M Y'
        }
    }
});


Ext.setup({
    onReady: function () {
        function createStore(config) {
            return Ext.create('Sch.data.ResourceStore', {
                model: 'Klub',
                autoLoad: 'true',
                proxy: {
                    type: 'ajax',
                    url: config.url,
                    reader: {type: 'json'}
                }
            });
        }

        function createStoreActivities(config) {
            return Ext.create('Sch.data.EventStore', {
                model: 'Activities',
                autoLoad: 'true',
                proxy: {
                    type: 'ajax',
                    url: config.url,
                    reader: {type: 'json'}
                }
            });
        }


        var editor = new CustomEditor();
        var clubsStore = createStore({url: 'listClubs'});
        var clubsActivitiesStore = createStoreActivities({url: 'allActivities'});
        console.log(clubsActivitiesStore);
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var scheduler = new Sch.panel.SchedulerGrid({
            startDate: date,
            endDate: new Date(date.getTime() + 1 * 86400000),
            eventRenderer: function (event) {
                return event.getName() + '<br/><span class="departure-time">' + Ext.Date.format(event.getStartDate(), 'G:i') + '</span>';
            },

            lockedWidth: 250, // Make sure left section is scrollable
            rowHeight: 50,
            viewPreset: 'dayNightShift',   // Our custom preset

            columns: [
                // {
                //     header: 'Id',
                //     field: 'Id',
                //     locked: true,
                //     width: 50,
                //     align: 'center'
                // },
                {
                    header: 'Klub',
                    field: 'title',
                    locked: true,
                    width: 150
                },
                {
                    header: 'Adres',
                    field: 'address',
                    locked: true,
                    width: 100
                }
            ],
            plugins         : [editor],
            getRowCls: function (resource) {
                return resource.get('Cls');
            },
            onEventCreated  : function (newEventRecord) {
                // Supply default record values etc.
                newEventRecord.set({
                    Name: 'Nowe zajęcia',
                    Duration : 1
                });
                clubsActivitiesStore.on('addrecords', function(s, rs) {
                    editor.showForRecord(rs[0]);
                });
            },
            barMargin: 3,
            resourceStore: clubsStore,
            eventStore: clubsActivitiesStore
        });
        // clubsActivitiesStore.on('addrecords', function(s, rs) {
        //     editor.showForRecord(rs[0]);
        // });
        Ext.Viewport.add([
            scheduler,

            // Docked toolbar
            {
                xtype: 'toolbar',
                docked: 'top',

                // Give it 1 item which is a segmented button
                items: [
                    {
                        iconMask: true,
                        text: 'Powiększ',
                        handler: function () {
                            scheduler.zoomOut();
                        }
                    },
                    {
                        iconMask: true,
                        text: 'Pomniejsz',
                        handler: function () {
                            scheduler.zoomIn();
                        }
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Wiersz+',
                        handler: function () {
                            var view = scheduler.getSchedulingView();
                            view.setRowHeight(view.getRowHeight() + 5);
                        }
                    },
                    {
                        text: 'Wiersz-',
                        handler: function () {
                            var view = scheduler.getSchedulingView();
                            view.setRowHeight(view.getRowHeight() - 5);
                        }
                    }
                ]
            }
        ]);

        scheduler.on({
            eventsingletap: function (event, record) {
                clubsActivitiesStore.on('addrecords', function(s, rs) {
                    editor.showForRecord(record);
                });
                editor.showForRecord(record);
            },
            eventdoubletap: function (event, record) {
                // Ext.Msg.alert('You double tapped', record.get('Name'));

                Ext.Msg.confirm('Zapisy', record.get('Name') + ' ' + new Date(record.get('StartDate')).getHours() + ':'
                    + ((new Date(record.get('StartDate')).getMinutes()) < 10 ? '0' : '')
                    + new Date(record.get('StartDate')).getMinutes(), function (value) {
                    if (value == 'yes') {
                        post({
                            url: 'saveToActivities',
                            data: {activitiesId: record.get('id')}
                        });
                        record.data.Cls = 'air-delayed';
                        scheduler.refresh();
                    }
                });
            }
        });
    }
})
;

