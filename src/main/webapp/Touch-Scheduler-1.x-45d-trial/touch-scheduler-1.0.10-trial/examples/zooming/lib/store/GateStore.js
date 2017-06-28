Ext.define('App.store.GateStore', {
    extend  : 'Sch.data.ResourceStore',
    model   : 'App.model.Gate',

    config  : {
        nbrEntries : 10
    },

    // Just add some nice dummy data for the example
    constructor : function () {

        this.callParent(arguments);
        this.setData(this.generateData(this.nbrRows));
    },

    generateData : function () {
        var retVal = [];
        var count = this.getNbrEntries();

        for (var i = 0; i < count; i++) {
            retVal.push({
                Id          : i + 1,
                Cls         : i % 100 === 0 ? 'Terminal' : 'Gate',
                Name        : i % 100 === 0 ? ('Terminal ' + ((i / 100) + 1)) : ('Gate ' + i),
                Terminal    : i % 100 !== 0 ? String.fromCharCode(65 + (i / 100) % 100) : '',
                Capacity    : Math.round(Math.random() * 1000)
            });
        }
        return retVal;
    }
})