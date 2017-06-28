StartTest(function(t) {
    
    t.expectGlobals('JSHINT');
    
    var getFile     = function (url, callback) {
        var as  = t.beginAsync();
        
        Ext.Ajax.request({
            url         : url,
            callback    : function(options, success, response) { 
                t.endAsync(as);
                
                if (!success) t.fail('File [' + url + '] failed to load');
                
                success && callback && callback(response.responseText)
            }
        })
    }
    
    getFile('../touch-scheduler-all-debug.js', function (allDebugText) {
        getFile('../.jshintrc', function (jsHintRcText) {
            var myResult = JSHINT(allDebugText, eval('(' + jsHintRcText + ')'));
            
            if (myResult) {
                t.pass('No lint errors found');
            } else {
                Ext.each(JSHINT.errors, function(err) {
                    t.fail(err.reason + '(line: ' + err.line + ', char: ' + err.character + ')');
                });
            }
        })
    })
    
    getFile('../touch-scheduler-all.js', function (allText) {
        t.notOk(allText.match('console.log'), 'Should not find "console.log" in the code!');
    })
})