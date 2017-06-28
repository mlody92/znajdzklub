/**
 @class UberGrid.column.Template

 This is a subclass of the base {@link UberGrid.column.Column} class used to render content using an Ext.XTemplate. You just
 have to specify a 'template' for this to work, either a string or a full Ext.XTemplate.
 */

Ext.define('UberGrid.column.Template', {
    extend      : 'UberGrid.column.Column',

    requires    : [
        'Ext.XTemplate'
    ],

    /**
     * @cfg {String/Ext.XTemplate} template The string or Ext.XTemplate to used to render the data. The template will receive the full
     * record data.
     */
    template    : null,

    constructor : function () {
        this.callParent(arguments);

        if (!this.template) {
            throw 'TemplateColumn: Must define a "template" property.'
        }

        if (!(this.template instanceof Ext.XTemplate)) {
            this.template = new Ext.XTemplate(this.template);
        }

        // still allow user to override the renderer
        if (!this.renderer) {
            this.renderer   = this.tplRenderer;
            this.scope      = this;
        }
    },


    tplRenderer : function (value, meta, record) {
        return this.template.apply(record.getData());
    }
});