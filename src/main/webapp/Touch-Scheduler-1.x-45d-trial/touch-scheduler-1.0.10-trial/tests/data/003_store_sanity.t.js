StartTest(function(t) {

    var resourceStore = new Sch.data.ResourceStore({
        proxy : {
            type : 'memory',
            reader : {
                type : 'xml'
            }
        }
    });

    t.pass('Created resource store with xml reader ok');


})
