Ext.define('UberGrid.override.Element', {
    requires : ['Ext.Element']
}, function() {
    // In a future release, this override will be removed since ST 2.2 adds this method to the Element class
    if (!Ext.Element.prototype.translate) {

        Ext.Element.prototype.translate = function() {
            var transformStyleName = 'webkitTransform' in document.createElement('div').style ? 'webkitTransform' : 'transform';

            return function(x, y, z) {
                this.dom.style[transformStyleName] = 'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, ' + (z || 0) + 'px)';
            }
        }();
    }
})