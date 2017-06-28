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

    onTrigger : function (sch, rec, target, e) { 
        this.showForRecord(rec);
    },

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
                title: 'Task Info',
                instructions: 'Please enter the information above.',
                defaults: {
                    labelWidth: 150,
                    labelAlign: 'left'
                },
                items: [
                    {
                        xtype: 'selectfield',
                        name: 'Type',
                        label: 'Type',
                        valueField: 'id',
                        displayField: 'title',
                        store: {
                            data: [
                                { id: 'downtime', title: 'Downtime'},
                                { id: 'server_maintenance', title: 'Server Maintenance'},
                                { id: 'reboot', title: 'Reboot'},
                                { id: 'os_upgrade', title: 'OS Upgrade'}
                            ]
                        }
                    },

                    {
                        xtype: 'datepickerfield',
                        name: 'StartDate',
                        label: 'Start Date',
                        value: new Date(),
                        picker: {
                            yearFrom: 2012
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
                                label: 'Duration (d)',
                                name: 'Duration',
                                flex: 1,
                                value: 1,
                                minValue: 1,
                                maxValue: 5,
                                increment : 0.5,
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
                    },
                    {
                        xtype: 'togglefield',
                        label: 'High priority',
                        name: 'HighPriority',
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
                        text: 'Cancel',

                        handler: function() {
                            this.up('formpanel').hide();
                        }
                    },

                    { xtype : 'spacer'},

                    {
                        xtype : 'label',
                        html : 'Edit task...',
                        style:'color:#fff'
                    },

                    { xtype : 'spacer' },

                    // A Save button which will mask the formpanel, and update the current record in the formpanel with
                    // the latest values from the formpanel.
                    {
                        text: 'Save',
                        ui: 'confirm',
                        handler: function() {
                            var form = this.up('formpanel');

                            // Mask the form
                            form.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving...'
                            });

                            // Fake a server request, waiting 1 sec
                            setTimeout(function() {
                                if (form.eventRecord) {
                                    // Call the updateRecord method of formpanel with the event record instance. This will update the event record
                                    // with the latest values.
                                    form.updateRecord(form.eventRecord, true);
                                }

                                // Unmask and hide the formpanel
                                form.setMasked(false);
                                form.hide();
                            }, 1000);
                        }
                    }
                ]
            },

            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        cls: 'delete-task',
                        text: 'Delete task',
                        flex : 1,
                        handler: function() {
                            var form = this.up('formpanel');
                            var record = form.eventRecord;
                            form.hide();
                            record.stores[0].remove(record);
                        }
                    }
                ]
            }
        ]
    }
});

