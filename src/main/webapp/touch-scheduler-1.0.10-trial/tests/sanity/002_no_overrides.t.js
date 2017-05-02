StartTest(function (t) {
    
    var frame = Ext.core.DomHelper.append(Ext.getBody(), {
        tag: "iframe"
    });

    var freshWin = window.frames[0].window;
    
    freshWin.document.open();
    
    var extjsBundleURL = t.getTouchBundlePath();

    if (!extjsBundleURL) {
        t.fail('Sencha Touch url not found');
        return;
    }
    
    freshWin.document.write(
       '<html><head><script type="text/javascript" src="' + extjsBundleURL + '"></script></head><body></body></html>'
    );
   
    freshWin.document.close();
    t.waitFor(function() { return freshWin.Ext; }, start);
    
    function resolveObject(hostObj, nameSpace) {
        var parts = nameSpace.split('.');
        var p = hostObj[parts[0]];
    
        for (var i = 1; i < parts.length; i++) {    
            p = p[parts[i]];
        };
    
        return p;
    }

    function ignore(name) {
        return name.match('Ext.data.Store.ImplicitModel|collectorThreadId');
    }

    function start() {
        var dirtyWin = window,
            overrides = [];

        // Check for native class augmentations 
        Ext.iterate(Ext.ClassManager.classes, function (item) { 
            if (!item.match('Ext.')) return;

            var freshItem = resolveObject(freshWin, item);
            var dirtyItem = resolveObject(dirtyWin, item);
            
            if (typeof (dirtyItem) !== 'undefined') {
                var staticDiff = getObjectDifferences(freshItem,
                                                        dirtyItem,
                                                        item);
                overrides.push.apply(overrides, staticDiff);

                // Prototype properties 
                if (dirtyItem.prototype && freshItem) {
                    var prototypeDiff = getObjectDifferences(freshItem.prototype,
                                                                dirtyItem.prototype,
                                                                item + '.prototype');
                    overrides.push.apply(overrides, prototypeDiff);
                }
            }
        }, this);

        function getObjectDifferences(cleanObj, dirtyObj, ns) {
            var diff = []
    
            for (var p in dirtyObj) {
                try {
                    if (dirtyObj.hasOwnProperty(p)) {
                        // Check if the object exists on the clean window and also do a string comparison 
                        // in case a builtin method has been overridden 
                        if (
                                (!cleanObj.hasOwnProperty(p) && typeof (cleanObj[p]) == 'undefined' )||
                                (typeof (dirtyObj[p]) == 'function' && cleanObj[p].toString() !== dirtyObj[p].toString()) ||
                                (Ext.isPrimitive(dirtyObj[p]) && dirtyObj[p].toString() !== cleanObj[p].toString())
                            )
                        {
                            if (!ignore(ns + '.' + p)) {
                                diff.push(ns + '.' + p);
                            }
                        }
                    }
                } catch (e) {
                    // Just continue 
                }
            }
            return diff;
        }
    }
})    
