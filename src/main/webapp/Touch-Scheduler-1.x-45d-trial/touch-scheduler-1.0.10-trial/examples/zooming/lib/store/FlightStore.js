Ext.define('App.store.FlightStore', {
    extend : 'Sch.data.EventStore',

    // Just add some nice dummy data for the example
    constructor : function () {
        this.callParent(arguments);

        this.setData([
            {
                Id : 1,
                Name : 'Frankfurt',
                Cls : 'air-delayed',

                StartDate : new Date(2012, 2, 1, 3),
                EndDate : new Date(2012, 2, 1, 4),

                ResourceId : 3
            },
            {
                Id : 1231,
                Name : 'Paris',
                Cls : 'air-ontime',

                StartDate : new Date(2012, 2, 1, 3),
                EndDate : new Date(2012, 2, 1, 6),

                ResourceId : 3
            },
            {
                Id : 1123,
                Name : 'Chicago',
                Cls : 'air-ontime',

                StartDate : new Date(2012, 2, 1, 1, 30),
                EndDate : new Date(2012, 2, 1, 12, 30),

                ResourceId : 5
            },
            {
                Id : 11223,
                Name : 'Sao Paolo',
                Cls : 'air-cancelled',

                StartDate : new Date(2012, 2, 1, 2, 10),
                EndDate : new Date(2012, 2, 1, 3, 20),

                ResourceId : 10
            },
            {
                Id : 2,
                Name : 'Luxemburg',
                Cls : 'air-ontime',

                StartDate : new Date(2012, 2, 1, 6),
                EndDate : new Date(2012, 2, 1, 7),

                ResourceId : 3
            },
            {
                Id : 3,
                Name : 'Stockholm',
                Cls : 'air-cancelled',

                StartDate : new Date(2012, 2, 1, 15),
                EndDate : new Date(2012, 2, 1, 16),

                ResourceId : 3
            },
            {
                Id : 4,
                Name : 'Barcelona',
                Cls : 'air-delayed',

                StartDate : new Date(2012, 2, 1, 18),
                EndDate : new Date(2012, 2, 1, 19),

                ResourceId : 4
            },
            {
                Id : 5,
                Name : 'Amsterdam',
                Cls : 'air-ontime',

                StartDate : new Date(2012, 2, 1, 21),
                EndDate : new Date(2012, 2, 1, 22),

                ResourceId : 5
            },
            {
                Id : 6,
                Name : 'Krasnodar',
                Cls : 'air-ontime',

                StartDate : new Date(2012, 2, 1, 11),
                EndDate : new Date(2012, 2, 1, 12),

                ResourceId : 6
            }
        ]);
    }
})