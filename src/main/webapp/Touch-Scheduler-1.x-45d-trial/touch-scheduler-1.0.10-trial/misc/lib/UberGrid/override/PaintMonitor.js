Ext.define('UberGrid.override.PaintMonitor', {
    override    : 'Ext.util.PaintMonitor',
    constructor: function(config) {
        if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
            return new Ext.util.paintmonitor.OverflowChange(config);
        }
        else {
            return new Ext.util.paintmonitor.CssAnimation(config);
        }
    }
});