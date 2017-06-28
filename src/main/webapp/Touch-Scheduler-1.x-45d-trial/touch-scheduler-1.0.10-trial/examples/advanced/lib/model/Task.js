Ext.define('App.model.Task', {
    extend : 'Sch.model.Event',

    config : {
        fields : [
            { name : 'StartDate', type : 'date', dateFormat : 'c' },
            'Type',      // 0:travel, 1:task or 2:break
            'Duration',  // in minutes
            'IsActual'
        ]
    },

    getCls : function() {
        var cls = '';

        switch(this.get('Type')) {
            case 0: cls = 'type-travel'; break;
            case 1: cls = 'type-task';   break;
            case 2: cls = 'type-break';  break;
        }

        return cls + ' time-' + (this.get('IsActual') ? 'actual' : 'planned');
    },

    getEndDate : function() {
        return Ext.Date.add(this.getStartDate(), Ext.Date.MINUTE, this.get('Duration'));
    }
});