Ext.data.JsonP.Sch_feature_EventPinch({"tagname":"class","name":"Sch.feature.EventPinch","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"EventPinch.js","href":"EventPinch.html#Sch-feature-EventPinch"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"eventEl","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-eventEl","meta":{"private":true}},{"name":"eventRecord","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-eventRecord","meta":{"private":true}},{"name":"leftX","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-leftX","meta":{"private":true}},{"name":"maxWidth","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-maxWidth","meta":{"private":true}},{"name":"newWidth","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-newWidth","meta":{"private":true}},{"name":"origWidth","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-origWidth","meta":{"private":true}},{"name":"scheduler","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-scheduler","meta":{"private":true}},{"name":"startDistance","tagname":"property","owner":"Sch.feature.EventPinch","id":"property-startDistance","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.feature.EventPinch","id":"method-constructor","meta":{}},{"name":"finalize","tagname":"method","owner":"Sch.feature.EventPinch","id":"method-finalize","meta":{"private":true}},{"name":"onPinch","tagname":"method","owner":"Sch.feature.EventPinch","id":"method-onPinch","meta":{"private":true}},{"name":"onPinchEnd","tagname":"method","owner":"Sch.feature.EventPinch","id":"method-onPinchEnd","meta":{"private":true}},{"name":"onPinchStart","tagname":"method","owner":"Sch.feature.EventPinch","id":"method-onPinchStart","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.feature.EventPinch","short_doc":"A class implementing the event pinch/resize feature. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.feature.EventPinch</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/EventPinch.html#Sch-feature-EventPinch' target='_blank'>EventPinch.js</a></div></pre><div class='doc-contents'><p>A class implementing the event pinch/resize feature. If enabled on the main scheduler panel, this class will make sure events can be resized using\na two finger pinch gesture.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-eventEl' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-eventEl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-eventEl' class='name expandable'>eventEl</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-eventRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-eventRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-eventRecord' class='name expandable'>eventRecord</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-leftX' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-leftX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-leftX' class='name expandable'>leftX</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-maxWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-maxWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-maxWidth' class='name expandable'>maxWidth</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-newWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-newWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-newWidth' class='name expandable'>newWidth</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-origWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-origWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-origWidth' class='name expandable'>origWidth</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-scheduler' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-scheduler' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-scheduler' class='name expandable'>scheduler</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-startDistance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-property-startDistance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-property-startDistance' class='name expandable'>startDistance</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.feature.EventPinch-method-constructor' class='name expandable'>Sch.feature.EventPinch</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.feature.EventPinch\" rel=\"Sch.feature.EventPinch\" class=\"docClass\">Sch.feature.EventPinch</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.feature.EventPinch\" rel=\"Sch.feature.EventPinch\" class=\"docClass\">Sch.feature.EventPinch</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-finalize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-method-finalize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-method-finalize' class='name expandable'>finalize</a>( <span class='pre'>updateRecord</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>updateRecord</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPinch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-method-onPinch' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-method-onPinch' class='name expandable'>onPinch</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPinchEnd' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-method-onPinchEnd' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-method-onPinchEnd' class='name expandable'>onPinchEnd</a>( <span class='pre'>sch, eventRecord, el, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sch</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eventRecord</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>el</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPinchStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.EventPinch'>Sch.feature.EventPinch</span><br/><a href='source/EventPinch.html#Sch-feature-EventPinch-method-onPinchStart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.EventPinch-method-onPinchStart' class='name expandable'>onPinchStart</a>( <span class='pre'>sch, eventRecord, el, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sch</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eventRecord</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>el</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});