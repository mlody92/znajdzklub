Ext.define('UberGrid.util.Translatable', {
    
    extend              : 'Ext.util.translatable.Abstract',
    
    body                : null,
    tabularView         : null,
    
    
    doTranslate : function (x, y) {
        // XXX figuire out the way to remove this check
        if (!this.tabularView) return
        
        var visibleContainers   = this.tabularView.visibleContainers
        var containerElements   = this.body.containerElements
        
        for (var i = 0, len = visibleContainers.length; i < len; i++) {
            var el                          = containerElements[ visibleContainers[ i ].id ]
            
            var row                         = visibleContainers[ i ].row
            
            Ext.fly(el).translate(x, row.offsetTop + y, 0);
//            generally we don't need the height for container elements
//            commenting this line seems to improve performance a bit
//            TODO perhaps should be configurable
//            el.style.height                 = row.height + 'px'
        }
    }
});