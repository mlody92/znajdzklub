/**

 @class Sch.model.Date
 @extends Ext.data.Model

 This class represent a single date.

 */
Ext.define('Sch.model.Date', {
    extend : 'Ext.data.Model',

    fields : [
        { name : 'Date', type : 'date' },
        'Cls',
        'Text'
    ],

    config : {
        useCache : false,
        fields : [
            { name : 'Date', type : 'date' },
            'Cls',
            'Text'
        ]
    }
});
