Ext.data.JsonP.Sch_plugin_ResourceZones({"tagname":"class","name":"Sch.plugin.ResourceZones","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"sch-core-debug.js","href":"sch-core-debug.html#Sch-plugin-ResourceZones"}],"extends":"Sch.feature.AbstractTimeSpan","aliases":{"plugin":["scheduler_resourcezones"]},"alternateClassNames":[],"mixins":[],"requires":[],"uses":[],"members":[{"name":"clsField","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-clsField","meta":{}},{"name":"headerTemplate","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-headerTemplate","meta":{"private":true}},{"name":"innerHeaderTpl","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-innerHeaderTpl","meta":{}},{"name":"innerTpl","tagname":"cfg","owner":"Sch.plugin.ResourceZones","id":"cfg-innerTpl","meta":{}},{"name":"renderDelay","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-renderDelay","meta":{}},{"name":"showHeaderElements","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-showHeaderElements","meta":{}},{"name":"store","tagname":"cfg","owner":"Sch.plugin.ResourceZones","id":"cfg-store","meta":{"required":true}},{"name":"template","tagname":"cfg","owner":"Sch.feature.AbstractTimeSpan","id":"cfg-template","meta":{}},{"name":"cls","tagname":"property","owner":"Sch.plugin.ResourceZones","id":"property-cls","meta":{"private":true}},{"name":"fullRefresh","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-fullRefresh","meta":{"private":true}},{"name":"generateHeaderMarkup","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-generateHeaderMarkup","meta":{}},{"name":"generateMarkup","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-generateMarkup","meta":{}},{"name":"getElementCls","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getElementCls","meta":{}},{"name":"getElementId","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getElementId","meta":{}},{"name":"getHeaderContainerEl","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getHeaderContainerEl","meta":{}},{"name":"getHeaderElementCls","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getHeaderElementCls","meta":{}},{"name":"getHeaderElementId","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getHeaderElementId","meta":{}},{"name":"getHeaderElementPosition","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getHeaderElementPosition","meta":{}},{"name":"getTemplateData","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-getTemplateData","meta":{}},{"name":"init","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-init","meta":{"private":true}},{"name":"onSchedulerDestroy","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-onSchedulerDestroy","meta":{"private":true}},{"name":"refreshSingle","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-refreshSingle","meta":{"private":true}},{"name":"renderZones","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-renderZones","meta":{"private":true}},{"name":"renderer","tagname":"method","owner":"Sch.plugin.ResourceZones","id":"method-renderer","meta":{"private":true}},{"name":"setDisabled","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-setDisabled","meta":{}},{"name":"setElementX","tagname":"method","owner":"Sch.feature.AbstractTimeSpan","id":"method-setElementX","meta":{}}],"code_type":"ext_define","id":"class-Sch.plugin.ResourceZones","short_doc":"A plugin (ptype = 'scheduler_resourcezones') for visualizing resource specific meta data such as availability, used i...","component":false,"superclasses":["Ext.AbstractPlugin","Sch.feature.AbstractTimeSpan"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.AbstractPlugin<div class='subclass '><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='docClass'>Sch.feature.AbstractTimeSpan</a><div class='subclass '><strong>Sch.plugin.ResourceZones</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones' target='_blank'>sch-core-debug.js</a></div></pre><div class='doc-contents'><p>A plugin (ptype = 'scheduler_resourcezones') for visualizing resource specific meta data such as availability, used internally by the Scheduler.\nTo use this feature, assign an <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">eventStore</a> to the resourceZones<br/>\nconfig on the main Scheduler panel class. Additionally, you can provide the resourceZonesConfig object\nwith configuration options.</p>\n\n<pre><code>{\n     xtype           : 'schedulergrid',\n     region          : 'center',\n     startDate       : new Date(2013, 0, 1),\n     endDate         : new Date(2014, 0, 1),\n     resourceStore   : new <a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a>(),\n     resourceZones   : new <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>(), // Meta events such as availabilities can be visualized here\n     resourceZonesConfig : {\n        innerTpl                : '... customized template here ...'\n     },\n     eventStore      : new <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>()  // Regular tasks in this store\n},\n</code></pre>\n\n<p>Records in the store should be regular <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">events</a> where you can specify the Resource, StartDate, EndDate and Cls (to set a CSS class on the rendered zone).</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Required config options</h3><div id='cfg-store' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-cfg-store' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-cfg-store' class='name expandable'>store</a> : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a><span class=\"signature\"><span class='required' >required</span></span></div><div class='description'><div class='short'><p>The store containing the meta 'events' to be rendered for each resource</p>\n</div><div class='long'><p>The store containing the meta 'events' to be rendered for each resource</p>\n<p>Overrides: <a href=\"#!/api/Sch.feature.AbstractTimeSpan-cfg-store\" rel=\"Sch.feature.AbstractTimeSpan-cfg-store\" class=\"docClass\">Sch.feature.AbstractTimeSpan.store</a></p></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Optional config options</h3><div id='cfg-clsField' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-clsField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-clsField' class='name expandable'>clsField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Name of field ...</div><div class='long'><p>Name of field</p>\n<p>Defaults to: <code>&#39;Cls&#39;</code></p></div></div></div><div id='cfg-headerTemplate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-headerTemplate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-headerTemplate' class='name expandable'>headerTemplate</a> : Ext.XTemplate<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Template used to render the header elements</p>\n</div><div class='long'><p>Template used to render the header elements</p>\n</div></div></div><div id='cfg-innerHeaderTpl' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-innerHeaderTpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-innerHeaderTpl' class='name expandable'>innerHeaderTpl</a> : String/Ext.XTemplate<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A template providing additional markup to render into each timespan header element</p>\n</div><div class='long'><p>A template providing additional markup to render into each timespan header element</p>\n</div></div></div><div id='cfg-innerTpl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-cfg-innerTpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-cfg-innerTpl' class='name expandable'>innerTpl</a> : String/Ext.XTemplate<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A template providing additional markup to render into each timespan element</p>\n</div><div class='long'><p>A template providing additional markup to render into each timespan element</p>\n</div></div></div><div id='cfg-renderDelay' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-renderDelay' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-renderDelay' class='name expandable'>renderDelay</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Delay the zones rendering by this amount (in ms) to speed up the default rendering of rows and events. ...</div><div class='long'><p>Delay the zones rendering by this amount (in ms) to speed up the default rendering of rows and events.</p>\n<p>Defaults to: <code>15</code></p></div></div></div><div id='cfg-showHeaderElements' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-showHeaderElements' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-showHeaderElements' class='name expandable'>showHeaderElements</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Set this to true to show indicators in the timeline header area. ...</div><div class='long'><p>Set this to <code>true</code> to show indicators in the timeline header area.</p>\n\n<p>Header indicators are placed right above the corresponding element of the scheduling view. You can customize the HTML markup\nfor these indicators with the <a href=\"#!/api/Sch.feature.AbstractTimeSpan-cfg-headerTemplate\" rel=\"Sch.feature.AbstractTimeSpan-cfg-headerTemplate\" class=\"docClass\">headerTemplate</a> config. Note that the indicators are rendered as a regular div element,\nwhich will be styled differently in modern vs legacy browsers.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-template' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-cfg-template' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-cfg-template' class='name expandable'>template</a> : Ext.XTemplate<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Template to render the timespan elements</p>\n</div><div class='long'><p>Template to render the timespan elements</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-cls' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-property-cls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-property-cls' class='name expandable'>cls</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>An internal css class which is added to each rendered timespan element ...</div><div class='long'><p>An internal css class which is added to each rendered timespan element</p>\n<p>Defaults to: <code>&#39;sch-resourcezone&#39;</code></p><p>Overrides: <a href=\"#!/api/Sch.feature.AbstractTimeSpan-property-cls\" rel=\"Sch.feature.AbstractTimeSpan-property-cls\" class=\"docClass\">Sch.feature.AbstractTimeSpan.cls</a></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-fullRefresh' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-fullRefresh' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-fullRefresh' class='name expandable'>fullRefresh</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-generateHeaderMarkup' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-generateHeaderMarkup' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-generateHeaderMarkup' class='name expandable'>generateHeaderMarkup</a>( <span class='pre'>isPrint, records</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Generates markup for headers elements. ...</div><div class='long'><p>Generates markup for headers elements.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>isPrint</span> : Boolean<div class='sub-desc'>\n</div></li><li><span class='pre'>records</span> : Array<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-generateMarkup' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-generateMarkup' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-generateMarkup' class='name expandable'>generateMarkup</a>( <span class='pre'>isPrint, records</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Generates markup for elements. ...</div><div class='long'><p>Generates markup for elements.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>isPrint</span> : Boolean<div class='sub-desc'>\n</div></li><li><span class='pre'>records</span> : Array<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getElementCls' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getElementCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getElementCls' class='name expandable'>getElementCls</a>( <span class='pre'>record, data</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Return element class for a record. ...</div><div class='long'><p>Return element class for a record.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'><p>Data record</p>\n</div></li><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>Template data</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getElementId' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getElementId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getElementId' class='name expandable'>getElementId</a>( <span class='pre'>record</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns id of element for data record. ...</div><div class='long'><p>Returns id of element for data record.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getHeaderContainerEl' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getHeaderContainerEl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getHeaderContainerEl' class='name expandable'>getHeaderContainerEl</a>( <span class='pre'></span> ) : Ext.dom.Element<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns container to render header elements. ...</div><div class='long'><p>Returns container to render header elements.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Ext.dom.Element</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getHeaderElementCls' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getHeaderElementCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getHeaderElementCls' class='name expandable'>getHeaderElementCls</a>( <span class='pre'>record, data</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Return header element class for data record. ...</div><div class='long'><p>Return header element class for data record.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'><p>Data record</p>\n</div></li><li><span class='pre'>data</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getHeaderElementId' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getHeaderElementId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getHeaderElementId' class='name expandable'>getHeaderElementId</a>( <span class='pre'>record</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns id of header element for data record. ...</div><div class='long'><p>Returns id of header element for data record.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getHeaderElementPosition' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getHeaderElementPosition' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getHeaderElementPosition' class='name expandable'>getHeaderElementPosition</a>( <span class='pre'>date</span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns position of header element by date. ...</div><div class='long'><p>Returns position of header element by date.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>date</span> : Date<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTemplateData' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-getTemplateData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-getTemplateData' class='name expandable'>getTemplateData</a>( <span class='pre'>record</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns template data to render elements. ...</div><div class='long'><p>Returns template data to render elements.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-init' class='name expandable'>init</a>( <span class='pre'>scheduler</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>scheduler</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onSchedulerDestroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-onSchedulerDestroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-onSchedulerDestroy' class='name expandable'>onSchedulerDestroy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-refreshSingle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-refreshSingle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-refreshSingle' class='name expandable'>refreshSingle</a>( <span class='pre'>store, record</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>store</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-renderZones' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-renderZones' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-renderZones' class='name expandable'>renderZones</a>( <span class='pre'>resource</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-renderer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.plugin.ResourceZones'>Sch.plugin.ResourceZones</span><br/><a href='source/sch-core-debug.html#Sch-plugin-ResourceZones-method-renderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.plugin.ResourceZones-method-renderer' class='name expandable'>renderer</a>( <span class='pre'>val, meta, resource, rowIndex</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>val</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resource</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>rowIndex</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setDisabled' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-setDisabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-setDisabled' class='name expandable'>setDisabled</a>( <span class='pre'>disabled</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>disabled</span> : Boolean<div class='sub-desc'><p>Pass <code>true</code> to disable the plugin and remove all rendered elements.</p>\n</div></li></ul></div></div></div><div id='method-setElementX' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.feature.AbstractTimeSpan' rel='Sch.feature.AbstractTimeSpan' class='defined-in docClass'>Sch.feature.AbstractTimeSpan</a><br/><a href='source/sch-core-debug.html#Sch-feature-AbstractTimeSpan-method-setElementX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.AbstractTimeSpan-method-setElementX' class='name expandable'>setElementX</a>( <span class='pre'>el, x</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets element X-coordinate relative direction (rtl or ltr). ...</div><div class='long'><p>Sets element X-coordinate relative direction (rtl or ltr).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : Ext.Element<div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});