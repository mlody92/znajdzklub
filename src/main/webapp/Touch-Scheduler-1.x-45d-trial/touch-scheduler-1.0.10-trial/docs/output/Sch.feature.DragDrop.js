Ext.data.JsonP.Sch_feature_DragDrop({"tagname":"class","name":"Sch.feature.DragDrop","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"DragDrop.js","href":"DragDrop.html#Sch-feature-DragDrop"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["Ext.util.Draggable"],"uses":[],"members":[{"name":"direction","tagname":"cfg","owner":"Sch.feature.DragDrop","id":"cfg-direction","meta":{"private":true}},{"name":"triggerEvent","tagname":"cfg","owner":"Sch.feature.DragDrop","id":"cfg-triggerEvent","meta":{"private":true}},{"name":"dragging","tagname":"property","owner":"Sch.feature.DragDrop","id":"property-dragging","meta":{"private":true}},{"name":"eventsDraggable","tagname":"property","owner":"Sch.feature.DragDrop","id":"property-eventsDraggable","meta":{"private":true}},{"name":"scheduler","tagname":"property","owner":"Sch.feature.DragDrop","id":"property-scheduler","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-constructor","meta":{}},{"name":"constrainProxy","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-constrainProxy","meta":{"private":true}},{"name":"finalize","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-finalize","meta":{"private":true}},{"name":"getDirection","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-getDirection","meta":{}},{"name":"getTriggerEvent","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-getTriggerEvent","meta":{}},{"name":"onDrag","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-onDrag","meta":{"private":true}},{"name":"onDragEnd","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-onDragEnd","meta":{"private":true}},{"name":"onLongPress","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-onLongPress","meta":{"private":true}},{"name":"resolveStartEndDates","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-resolveStartEndDates","meta":{"private":true}},{"name":"setDirection","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-setDirection","meta":{}},{"name":"setTriggerEvent","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-setTriggerEvent","meta":{}},{"name":"updateDragContext","tagname":"method","owner":"Sch.feature.DragDrop","id":"method-updateDragContext","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.feature.DragDrop","short_doc":"A class implementing the event drag drop feature. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.feature.DragDrop</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.util.Draggable</div><h4>Files</h4><div class='dependency'><a href='source/DragDrop.html#Sch-feature-DragDrop' target='_blank'>DragDrop.js</a></div></pre><div class='doc-contents'><p>A class implementing the event drag drop feature. If enabled on the main scheduler panel, this class will make sure events can be dragged and\nrescheduled in the schedule.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-direction' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-direction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-cfg-direction' class='name expandable'>direction</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The allowed drag directions, defaults to 'both'. ...</div><div class='long'><p>The allowed drag directions, defaults to 'both'.\nPossible values: 'vertical', 'horizontal', or 'both'</p>\n<p>Defaults to: <code>&#39;both&#39;</code></p></div></div></div><div id='cfg-triggerEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-triggerEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-cfg-triggerEvent' class='name expandable'>triggerEvent</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The event that is should trigger a drag drop operation to start. ...</div><div class='long'><p>The event that is should trigger a drag drop operation to start.</p>\n<p>Defaults to: <code>&#39;semilongpress&#39;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-dragging' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-property-dragging' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-property-dragging' class='name expandable'>dragging</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>HACK ...</div><div class='long'><p>HACK</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-eventsDraggable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-property-eventsDraggable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-property-eventsDraggable' class='name expandable'>eventsDraggable</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-scheduler' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-property-scheduler' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-property-scheduler' class='name expandable'>scheduler</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.feature.DragDrop-method-constructor' class='name expandable'>Sch.feature.DragDrop</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.feature.DragDrop\" rel=\"Sch.feature.DragDrop\" class=\"docClass\">Sch.feature.DragDrop</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.feature.DragDrop\" rel=\"Sch.feature.DragDrop\" class=\"docClass\">Sch.feature.DragDrop</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-constrainProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-constrainProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-constrainProxy' class='name expandable'>constrainProxy</a>( <span class='pre'>touchXY, eventBarEl</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>touchXY</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eventBarEl</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-finalize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-finalize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-finalize' class='name expandable'>finalize</a>( <span class='pre'>updateRecord</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>updateRecord</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getDirection' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-direction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-getDirection' class='name expandable'>getDirection</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of direction. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.DragDrop-cfg-direction\" rel=\"Sch.feature.DragDrop-cfg-direction\" class=\"docClass\">direction</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTriggerEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-triggerEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-getTriggerEvent' class='name expandable'>getTriggerEvent</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of triggerEvent. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.DragDrop-cfg-triggerEvent\" rel=\"Sch.feature.DragDrop-cfg-triggerEvent\" class=\"docClass\">triggerEvent</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onDrag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-onDrag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-onDrag' class='name expandable'>onDrag</a>( <span class='pre'>draggable, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>draggable</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onDragEnd' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-onDragEnd' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-onDragEnd' class='name expandable'>onDragEnd</a>( <span class='pre'>body, event</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>body</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onLongPress' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-onLongPress' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-onLongPress' class='name expandable'>onLongPress</a>( <span class='pre'>event, target</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-resolveStartEndDates' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-resolveStartEndDates' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-resolveStartEndDates' class='name expandable'>resolveStartEndDates</a>( <span class='pre'>proxyRegion</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>proxyRegion</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setDirection' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-direction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-setDirection' class='name expandable'>setDirection</a>( <span class='pre'>direction</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of direction. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.DragDrop-cfg-direction\" rel=\"Sch.feature.DragDrop-cfg-direction\" class=\"docClass\">direction</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>direction</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setTriggerEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-cfg-triggerEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-setTriggerEvent' class='name expandable'>setTriggerEvent</a>( <span class='pre'>triggerEvent</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of triggerEvent. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.DragDrop-cfg-triggerEvent\" rel=\"Sch.feature.DragDrop-cfg-triggerEvent\" class=\"docClass\">triggerEvent</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>triggerEvent</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-updateDragContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.DragDrop'>Sch.feature.DragDrop</span><br/><a href='source/DragDrop.html#Sch-feature-DragDrop-method-updateDragContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.DragDrop-method-updateDragContext' class='name expandable'>updateDragContext</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});