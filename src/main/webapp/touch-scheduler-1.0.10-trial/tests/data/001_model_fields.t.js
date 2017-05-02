StartTest(function(test) {
    test.todo(function(t) {

        var keys = Sch.model.Range.prototype.fields.keys;
        t.is(keys.length, 4, '4 keys found on Range (StartDate, EndDate, Cls, Name)');

        var keys = Sch.model.Resource.prototype.fields.keys;
        t.is(keys.length, 2, '2 keys found on Resource (Id, Name)');

        var keys = Sch.model.Event.prototype.fields.keys;
        var expectedKeys = [
            'Id',
            'Name',
            'StartDate',
            'EndDate',
            'ResourceId',
            'Cls',
            'Draggable',
            'Resizable'
        ];

        t.is(keys.length, expectedKeys.length, 'Correct nbr of fields found');

        for (var i = 0; i < expectedKeys.length; i++) {
            if (!Sch.model.Event.prototype.fields.getByKey(expectedKeys[i])) {
                t.fail('Event model should have a field with name: ' + expectedKeys[i]);
            }
        }
    })
})
