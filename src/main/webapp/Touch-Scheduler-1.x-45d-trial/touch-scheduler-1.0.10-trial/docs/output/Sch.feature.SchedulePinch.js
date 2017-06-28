Ext.data.JsonP.Sch_feature_SchedulePinch({"tagname":"class","name":"Sch.feature.SchedulePinch","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"SchedulePinch.js","href":"SchedulePinch.html#Sch-feature-SchedulePinch"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"enableHorizontal","tagname":"cfg","owner":"Sch.feature.SchedulePinch","id":"cfg-enableHorizontal","meta":{"private":true}},{"name":"enableVertical","tagname":"cfg","owner":"Sch.feature.SchedulePinch","id":"cfg-enableVertical","meta":{"private":true}},{"name":"precision","tagname":"cfg","owner":"Sch.feature.SchedulePinch","id":"cfg-precision","meta":{"private":true}},{"name":"threshold","tagname":"cfg","owner":"Sch.feature.SchedulePinch","id":"cfg-threshold","meta":{"private":true}},{"name":"direction","tagname":"property","owner":"Sch.feature.SchedulePinch","id":"property-direction","meta":{"private":true}},{"name":"height","tagname":"property","owner":"Sch.feature.SchedulePinch","id":"property-height","meta":{"private":true}},{"name":"scale","tagname":"property","owner":"Sch.feature.SchedulePinch","id":"property-scale","meta":{"private":true}},{"name":"startXDistance","tagname":"property","owner":"Sch.feature.SchedulePinch","id":"property-startXDistance","meta":{"private":true}},{"name":"startYDistance","tagname":"property","owner":"Sch.feature.SchedulePinch","id":"property-startYDistance","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-constructor","meta":{}},{"name":"getEnableHorizontal","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-getEnableHorizontal","meta":{}},{"name":"getEnableVertical","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-getEnableVertical","meta":{}},{"name":"getPrecision","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-getPrecision","meta":{}},{"name":"getThreshold","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-getThreshold","meta":{}},{"name":"onPinch","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-onPinch","meta":{"private":true}},{"name":"onPinchEnd","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-onPinchEnd","meta":{"private":true}},{"name":"onPinchStart","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-onPinchStart","meta":{"private":true}},{"name":"setEnableHorizontal","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-setEnableHorizontal","meta":{}},{"name":"setEnableVertical","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-setEnableVertical","meta":{}},{"name":"setPrecision","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-setPrecision","meta":{}},{"name":"setThreshold","tagname":"method","owner":"Sch.feature.SchedulePinch","id":"method-setThreshold","meta":{}}],"code_type":"ext_define","id":"class-Sch.feature.SchedulePinch","short_doc":"A class implementing the schedule pinch feature. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.feature.SchedulePinch</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch' target='_blank'>SchedulePinch.js</a></div></pre><div class='doc-contents'><p>A class implementing the schedule pinch feature. If enabled on the main scheduler panel, you can pinch the schedule area:\n- horizontally to zoom the time axis\n- vertically to change the row height.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-enableHorizontal' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableHorizontal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-cfg-enableHorizontal' class='name expandable'>enableHorizontal</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>false to disable horizontal pinching (time axis zoom in horizontal mode, column width change in vertical). ...</div><div class='long'><p>false to disable horizontal pinching (time axis zoom in horizontal mode, column width change in vertical).\nNote: not supported if SchedulerPanel is using forceFit mode.</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-enableVertical' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableVertical' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-cfg-enableVertical' class='name expandable'>enableVertical</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>false to disable vertical pinching (changing row height in horizontal mode, time axis zoom in vertical) ...</div><div class='long'><p>false to disable vertical pinching (changing row height in horizontal mode, time axis zoom in vertical)</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-precision' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-precision' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-cfg-precision' class='name expandable'>precision</a> : Int<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The precision to use when pinching (currently only used for vertical pinch, to limit the number of DOM repaints) ...</div><div class='long'><p>The precision to use when pinching (currently only used for vertical pinch, to limit the number of DOM repaints)</p>\n<p>Defaults to: <code>5</code></p></div></div></div><div id='cfg-threshold' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-threshold' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-cfg-threshold' class='name expandable'>threshold</a> : Int<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The distance in pixels required to start the pinch operation. ...</div><div class='long'><p>The distance in pixels required to start the pinch operation.</p>\n<p>Defaults to: <code>30</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-direction' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-property-direction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-property-direction' class='name expandable'>direction</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-height' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-property-height' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-property-height' class='name expandable'>height</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-scale' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-property-scale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-property-scale' class='name expandable'>scale</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>private members</p>\n</div><div class='long'><p>private members</p>\n</div></div></div><div id='property-startXDistance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-property-startXDistance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-property-startXDistance' class='name expandable'>startXDistance</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-startYDistance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-property-startYDistance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-property-startYDistance' class='name expandable'>startYDistance</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.feature.SchedulePinch-method-constructor' class='name expandable'>Sch.feature.SchedulePinch</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.feature.SchedulePinch\" rel=\"Sch.feature.SchedulePinch\" class=\"docClass\">Sch.feature.SchedulePinch</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.feature.SchedulePinch\" rel=\"Sch.feature.SchedulePinch\" class=\"docClass\">Sch.feature.SchedulePinch</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEnableHorizontal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableHorizontal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-getEnableHorizontal' class='name expandable'>getEnableHorizontal</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of enableHorizontal. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-enableHorizontal\" rel=\"Sch.feature.SchedulePinch-cfg-enableHorizontal\" class=\"docClass\">enableHorizontal</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEnableVertical' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableVertical' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-getEnableVertical' class='name expandable'>getEnableVertical</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of enableVertical. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-enableVertical\" rel=\"Sch.feature.SchedulePinch-cfg-enableVertical\" class=\"docClass\">enableVertical</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getPrecision' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-precision' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-getPrecision' class='name expandable'>getPrecision</a>( <span class='pre'></span> ) : Int<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of precision. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-precision\" rel=\"Sch.feature.SchedulePinch-cfg-precision\" class=\"docClass\">precision</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Int</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getThreshold' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-threshold' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-getThreshold' class='name expandable'>getThreshold</a>( <span class='pre'></span> ) : Int<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of threshold. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-threshold\" rel=\"Sch.feature.SchedulePinch-cfg-threshold\" class=\"docClass\">threshold</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Int</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onPinch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-method-onPinch' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-onPinch' class='name expandable'>onPinch</a>( <span class='pre'>event, node</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPinchEnd' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-method-onPinchEnd' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-onPinchEnd' class='name expandable'>onPinchEnd</a>( <span class='pre'>event, node</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPinchStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-method-onPinchStart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-onPinchStart' class='name expandable'>onPinchStart</a>( <span class='pre'>event, node</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setEnableHorizontal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableHorizontal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-setEnableHorizontal' class='name expandable'>setEnableHorizontal</a>( <span class='pre'>enableHorizontal</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of enableHorizontal. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-enableHorizontal\" rel=\"Sch.feature.SchedulePinch-cfg-enableHorizontal\" class=\"docClass\">enableHorizontal</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>enableHorizontal</span> : Boolean<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setEnableVertical' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-enableVertical' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-setEnableVertical' class='name expandable'>setEnableVertical</a>( <span class='pre'>enableVertical</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of enableVertical. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-enableVertical\" rel=\"Sch.feature.SchedulePinch-cfg-enableVertical\" class=\"docClass\">enableVertical</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>enableVertical</span> : Boolean<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setPrecision' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-precision' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-setPrecision' class='name expandable'>setPrecision</a>( <span class='pre'>precision</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of precision. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-precision\" rel=\"Sch.feature.SchedulePinch-cfg-precision\" class=\"docClass\">precision</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>precision</span> : Int<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setThreshold' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.feature.SchedulePinch'>Sch.feature.SchedulePinch</span><br/><a href='source/SchedulePinch.html#Sch-feature-SchedulePinch-cfg-threshold' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.feature.SchedulePinch-method-setThreshold' class='name expandable'>setThreshold</a>( <span class='pre'>threshold</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of threshold. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.feature.SchedulePinch-cfg-threshold\" rel=\"Sch.feature.SchedulePinch-cfg-threshold\" class=\"docClass\">threshold</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>threshold</span> : Int<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});