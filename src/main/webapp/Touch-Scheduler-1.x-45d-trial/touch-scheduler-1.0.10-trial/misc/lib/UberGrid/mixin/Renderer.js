Ext.define('UberGrid.mixin.Renderer', {
    
    styleObjectToString : function (styleObj) {
        var styleStr    = ''
        
        for (var styleName in styleObj) styleStr += styleName + ':' + styleObj[ styleName ] + ';'
        
        return styleStr
    },
    
    
    attrObjectToString : function (attrObj) {
        var attrStr    = ''
        
        for (var attrName in attrObj) attrStr += attrName + '="' + attrObj[ attrName ] + '" '
        
        return attrStr
    }
});