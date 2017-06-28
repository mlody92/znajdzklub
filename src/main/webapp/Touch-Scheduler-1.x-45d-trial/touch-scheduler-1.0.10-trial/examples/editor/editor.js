var D = Sch.util.Date;

Ext.define('MyEvent', {
    extend : 'Sch.model.Event',
    config : {
        fields : [
            { name : 'StartDate', type : 'date', dateFormat : 'Y-m-d' },
            { name : 'HighPriority' },
            { name : 'Duration', type : 'float' },
            { name : 'Type' }
        ]
    },

    getEndDate : function() {   
        return D.add(this.getStartDate(), D.HOUR, this.get('Duration') * 24);
    },

    getTypeDisplayName : function() {
        switch (this.get('Type')) {

            case 'downtime':            return 'Downtime' ;
            case 'server_maintenance':  return 'Server Maintenance' ;
            case 'reboot':              return 'Reboot' ;
            case 'os_upgrade':          return 'OS Upgrade' ;

        }
    },

    getCls : function() {
        return (this.get('HighPriority') ? 'eventprio-high' : '') + ' ' + this.get('Type');
    }
});

Ext.setup({
    
    onReady: function () {

        var resourceStore = new Sch.data.ResourceStore({
            data: [
                { Id : 1, Name : 'Super Machine' },
                { Id : 2, Name : 'Server #1' },
                { Id : 3, Name : 'Server #2' },
                { Id : 4, Name : 'Server #3' },
                { Id : 5, Name : 'Extranet main server' },
                { Id : 6, Name : 'Intranet main server' }
            ]
        })

        var eventStore = new Sch.data.EventStore({
            model : 'MyEvent',
            autoLoad: true,
            proxy : {
                type : 'ajax',
                url : 'data.js',
                listeners : { exception : function() { debugger; }},
                reader : {
                    type : 'json'
                }
            }
        })

        var editor = new CustomEditor();

        var scheduler = new Sch.panel.SchedulerGrid({
            startDate       : new Date(2012, 2, 1),
            endDate         : new Date(2012, 2, 10),
            rowHeight       : 80,
            minRowHeight    : 50,
            viewPreset      : 'dayAndWeek',
            barMargin       : 5,
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            enableSchedulePinch: 'vertical',    // Only row height can be changed, no time axis zoom
            enableEventPinch: false,    // Duration edited via popup window instead
            columns         : [
                {
                    header: 'Servers',
                    field: 'Name',
                    locked: true,
                    width: 200,
                    cellCls : 'server'
                }
            ],

            onEventCreated  : function (newEventRecord) {
                // Supply default record values etc.
                newEventRecord.set({
                    Name: 'New task',
                    Duration : 1
                });
            },

            plugins         : [editor],

            eventRenderer   : function(event, resource, tplData) {
                return event.getTypeDisplayName();
            }
        })

        eventStore.on('addrecords', function(s, rs) {
            editor.showForRecord(rs[0]);
        });

        Ext.Viewport.add([
            scheduler,
            {
                xtype : 'toolbar',
                docked : 'bottom',
                items : [
                    {
                        text: 'Zoom in',
                        handler: function () {
                            scheduler.zoomIn();
                        }
                    },
                    {
                        text: 'Zoom out',
                        handler: function () {
                            scheduler.zoomOut();
                        }
                    }
                ]
            }
        ]);
    }
});


