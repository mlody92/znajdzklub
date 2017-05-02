Ext.define('MyScheduler', {
    extend : "Sch.panel.SchedulerGrid",
    barMargin         : 3,
//  enableSidePull : false,
    forceFit : true,
    lockedWidth       : 180,
    rowHeight         : 60,
    viewPreset: 'weekAndMonth',
    eventBodyTemplate : '<span class="tip">Tip #{Id}</span><span class="description">{[ values.Name || "" ]}</span>',
    columnLines       : true,
    // ST configs
    config            : {
        iconCls           : 'team',
        title : 'Staff Schedule'
    },

    initialize : function () {
        Ext.apply(this, {

            _columns : [
                {
                    header    : 'Name',
                    dataIndex : 'Name',
                    locked    : true,
                    width     : 180,
                    sortable  : true
                }
            ]
        });
        this.callParent(arguments);
    },

//    getRowCls   : function (v, m, r) {
//        var rowHeight = this.getRowHeight();
//        if (rowHeight <= 20) {
//            return 'rowheight-20';
//        } else if (rowHeight <= 40) {
//            return 'rowheight-40';
//        }
//        return '';
//    },

    onEventCreated : function (newEventRecord) {
        // Supply default record values etc.
        newEventRecord.set({
            Name : 'New task'
        });
    }
})


Ext.setup({

    onReady : function () {
        var resourceStore = new Sch.data.ResourceStore({
            sorters : 'Name',
            data    : [
                { Id : 1, Name : 'Johnny Johnson' },
                { Id : 2, Name : 'Don Johnson' },
                { Id : 3, Name : 'Steve' },
                { Id : 4, Name : 'Pamela' },
                { Id : 5, Name : 'Johnny' },
                { Id : 6, Name : 'Nick' },
                { Id : 7, Name : 'Roger' },
                { Id : 8, Name : 'Leslie' },
                { Id : 9, Name : 'Annika' },
                { Id : 10, Name : 'Alp' },
                { Id : 11, Name : 'Pete' },
                { Id : 12, Name : 'Nigel' },
                { Id : 13, Name : 'Jack' },
                { Id : 14, Name : 'Azamat Bagatov' }
            ]
        })

        var eventStore = new Sch.data.EventStore({
            sorters : 'StartDate', // Just to keep task list ordered
            //setup the grouping functionality to group by the first letter of the firstName field
            grouper : {
                groupFn : function (record) {
                    var dt = record.getStartDate();
                    return dt && Ext.Date.monthNames[dt.getMonth()];
                }
            },
            data    : [
                {
                    Id         : 1,
                    ResourceId : 1,
                    Name       : 'Pull left and right sides of schedule',
                    StartDate  : new Date(2012, 2, 1, 12),
                    EndDate    : new Date(2012, 2, 5)
                },
                {
                    Id         : 2,
                    ResourceId : 3,
                    Name       : 'Tap and hold an empty space to create a new task',
                    StartDate  : new Date(2012, 2, 2),
                    EndDate    : new Date(2012, 2, 5, 12)
                },
                {
                    Id         : 3,
                    ResourceId : 4,
                    Name       : 'Tap-hold and drag to move a task',
                    StartDate  : new Date(2012, 2, 3),
                    EndDate    : new Date(2012, 2, 6)
                },
                {
                    Id         : 4,
                    ResourceId : 6,
                    Name       : 'Pinch a task to change duration',
                    StartDate  : new Date(2012, 2, 2),
                    EndDate    : new Date(2012, 2, 5, 12)
                },
                {
                    Id         : 5,
                    ResourceId : 8,
                    Name       : 'Pinch schedule vertically to set row height',
                    StartDate  : new Date(2012, 2, 4),
                    EndDate    : new Date(2012, 2, 7, 12)
                },
                {
                    Id         : 6,
                    ResourceId : 9,
                    Name       : 'Pinch schedule horizontally to set column width',
                    StartDate  : new Date(2012, 1, 26),
                    EndDate    : new Date(2012, 2, 8)
                },
                {
                    Id         : 7,
                    ResourceId : 10,
                    Name       : 'Double tap me',
                    StartDate  : new Date(2012, 1, 26),
                    EndDate    : new Date(2012, 2, 4)
                },
                {
                    Id         : 8,
                    ResourceId : 70,
                    Name       : 'Double tap me',
                    StartDate  : new Date(2012, 1, 24),
                    EndDate    : new Date(2012, 2, 4)
                }
            ]
        })

        var scheduler = new MyScheduler({
            resourceStore : resourceStore,
            eventStore    : eventStore,
            startDate     : new Date(2012, 1, 25),
            endDate       : new Date(2012, 2, 14)
        });

        Ext.Viewport.add([
            {
                xtype : 'tabpanel',
                tabBarPosition: 'bottom',
                items : [
                    scheduler,
                    {
                        iconCls : 'time',
                        cls     : 'tasklist',
                        xtype   : 'list',
                        title   : 'Task list',
                        itemTpl : '<span class="date">{[fm.date(values.StartDate, "j")]}</span> {Name}',
                        store   : eventStore,
                        grouped : true
                    }
                ]
            }
        ]);

        scheduler.on({
            eventdoubletap : function (scheduler, record) {
                Ext.Msg.alert('You double tapped ', record.getName());
            },

            eventdrop : function (scheduler, records) {
//                Ext.Msg.alert('Success!', 'You dragged task #' + records[0].getId());
            }
        });
    }
});


