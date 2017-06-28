StartTest(function (t) {
    t.expectGlobal('Line');

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

    var zoneStore = Ext.create('Ext.data.JsonStore', {
        model : 'Sch.model.Range',
        data  : [
            {
                StartDate : new Date(2011, 0, 6),
                EndDate   : new Date(2011, 0, 7),
                Type      : 'Day off',
                Cls       : 'myZoneStyle'
            }
        ]
    });

    var scheduler = t.getScheduler({
        startDate  : new Date(2011, 0, 3),
        endDate    : new Date(2011, 0, 13),
        viewPreset : 'dayAndWeek',

        plugins : [
            Ext.create("Sch.plugin.Zones", {
                store : zoneStore
            }),

            Ext.create("Sch.plugin.Lines", {
                store : lineStore
            })
        ]
    });
    var ev = scheduler.eventStore.first();
    ev.setResourceId(scheduler.resourceStore.first().getId());
    ev.setStartEndDate(new Date(2011, 0, 6), new Date(2011, 0, 7));

    Ext.Viewport.add([
        scheduler
    ]);

    t.it('Basic rendering', function (t) {
        t.chain(
            { waitFor : 'selector', args : '.myZoneStyle' },
            { waitFor : 'selector', args : '.important' },

            function () {
                t.elementIsTopElement(scheduler.getSchedulingView().getElementFromEventRecord(ev), true, 'Should find event on top of zone')
            }
        )
    });

    t.it('Adding, updating and removing', function (t) {
        zoneStore.add({
            Id        : 1,
            StartDate : new Date(2011, 0, 6),
            EndDate   : new Date(2011, 0, 7),
            Cls       : 'foo'
        });

        t.chain(
            { waitFor : 'selector', args : '.foo' },

            function (next) {
                zoneStore.getById(1).setCls('Bar')

                t.waitForSelector('.Bar', next);
            },

            function (next) {
                t.selectorNotExists('.foo', 'Old element CSS should be gone');

                zoneStore.remove(zoneStore.getById(1));

                t.waitForSelectorNotFound('.Bar', next);
            }
        )
    });
});
