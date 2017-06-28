Ext.data.JsonP.Sch_preset_ViewPreset({"tagname":"class","name":"Sch.preset.ViewPreset","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"sch-core-debug.js","href":"sch-core-debug.html#Sch-preset-ViewPreset"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"columnLinesFor","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-columnLinesFor","meta":{}},{"name":"defaultSpan","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-defaultSpan","meta":{}},{"name":"displayDateFormat","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-displayDateFormat","meta":{}},{"name":"headerConfig","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-headerConfig","meta":{}},{"name":"rowHeight","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-rowHeight","meta":{}},{"name":"shiftIncrement","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-shiftIncrement","meta":{}},{"name":"shiftUnit","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-shiftUnit","meta":{}},{"name":"timeAxisColumnWidth","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-timeAxisColumnWidth","meta":{}},{"name":"timeColumnWidth","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-timeColumnWidth","meta":{}},{"name":"timeResolution","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-timeResolution","meta":{}},{"name":"timeRowHeight","tagname":"cfg","owner":"Sch.preset.ViewPreset","id":"cfg-timeRowHeight","meta":{}},{"name":"headers","tagname":"property","owner":"Sch.preset.ViewPreset","id":"property-headers","meta":{"private":true}},{"name":"mainHeader","tagname":"property","owner":"Sch.preset.ViewPreset","id":"property-mainHeader","meta":{"private":true}},{"name":"name","tagname":"property","owner":"Sch.preset.ViewPreset","id":"property-name","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.preset.ViewPreset","id":"method-constructor","meta":{}},{"name":"clone","tagname":"method","owner":"Sch.preset.ViewPreset","id":"method-clone","meta":{"private":true}},{"name":"getBottomHeader","tagname":"method","owner":"Sch.preset.ViewPreset","id":"method-getBottomHeader","meta":{"private":true}},{"name":"getHeaders","tagname":"method","owner":"Sch.preset.ViewPreset","id":"method-getHeaders","meta":{"private":true}},{"name":"getMainHeader","tagname":"method","owner":"Sch.preset.ViewPreset","id":"method-getMainHeader","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.preset.ViewPreset","short_doc":"Not used directly, but the properties below are rather provided inline as seen in the source of Sch.preset.Manager. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.preset.ViewPreset</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/sch-core-debug.html#Sch-preset-ViewPreset' target='_blank'>sch-core-debug.js</a></div></pre><div class='doc-contents'><p>Not used directly, but the properties below are rather provided inline as seen in the source of <a href=\"#!/api/Sch.preset.Manager\" rel=\"Sch.preset.Manager\" class=\"docClass\">Sch.preset.Manager</a>. This class is just provided for documentation purposes.</p>\n\n<p>A sample preset looks like:</p>\n\n<pre><code>hourAndDay : {\n    timeColumnWidth         : 60,       // Time column width (used for rowHeight in vertical mode)\n    rowHeight               : 24,       // Only used in horizontal orientation\n    resourceColumnWidth     : 100,      // Only used in vertical orientation\n\n    displayDateFormat       : 'G:i',    // Controls how dates will be displayed in tooltips etc\n\n    shiftIncrement          : 1,        // Controls how much time to skip when calling shiftNext and shiftPrevious.\n    shiftUnit               : \"DAY\",    // Valid values are \"MILLI\", \"SECOND\", \"MINUTE\", \"HOUR\", \"DAY\", \"WEEK\", \"MONTH\", \"QUARTER\", \"YEAR\".\n    defaultSpan             : 12,       // By default, if no end date is supplied to a view it will show 12 hours\n\n    timeResolution          : {         // Dates will be snapped to this resolution\n        unit        : \"MINUTE\",         // Valid values are \"MILLI\", \"SECOND\", \"MINUTE\", \"HOUR\", \"DAY\", \"WEEK\", \"MONTH\", \"QUARTER\", \"YEAR\".\n        increment   : 15\n    },\n\n    headerConfig            : {         // This defines your header, you must include a \"middle\" object, and top/bottom are optional.\n        middle      : {                 // For each row you can define \"unit\", \"increment\", \"dateFormat\", \"renderer\", \"align\", and \"scope\"\n            unit        : \"HOUR\",\n            dateFormat  : 'G:i'\n        },\n        top         : {\n            unit        : \"DAY\",\n            dateFormat  : 'D d/m'\n        }\n    },\n\n    linesFor                : 'middle'  // Defines header level column lines will be drawn for\n},\n</code></pre>\n\n<p>See the <a href=\"#!/api/Sch.preset.Manager\" rel=\"Sch.preset.Manager\" class=\"docClass\">Sch.preset.Manager</a> for the list of available presets.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-columnLinesFor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-columnLinesFor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-columnLinesFor' class='name expandable'>columnLinesFor</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Defines the header level that the column lines will be drawn for. ...</div><div class='long'><p>Defines the header level that the column lines will be drawn for. See <a href=\"#!/api/Sch.mixin.AbstractTimelinePanel-property-columnLines\" rel=\"Sch.mixin.AbstractTimelinePanel-property-columnLines\" class=\"docClass\">Sch.mixin.AbstractTimelinePanel.columnLines</a></p>\n<p>Defaults to: <code>&#39;middle&#39;</code></p></div></div></div><div id='cfg-defaultSpan' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-defaultSpan' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-defaultSpan' class='name expandable'>defaultSpan</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The amount of time to show by default in a view (in the unit defined by the middle header) ...</div><div class='long'><p>The amount of time to show by default in a view (in the unit defined by the middle header)</p>\n<p>Defaults to: <code>12</code></p></div></div></div><div id='cfg-displayDateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-displayDateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-displayDateFormat' class='name expandable'>displayDateFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Defines how dates will be formatted in tooltips etc ...</div><div class='long'><p>Defines how dates will be formatted in tooltips etc</p>\n<p>Defaults to: <code>&#39;G:i&#39;</code></p></div></div></div><div id='cfg-headerConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-headerConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-headerConfig' class='name expandable'>headerConfig</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>An object containing one or more Sch.preset.ViewPresetHeaderRow rows defining how your headers shall be composed. ...</div><div class='long'><p>An object containing one or more Sch.preset.ViewPresetHeaderRow rows defining how your headers shall be composed.\nYour 'main' unit should be the middle header unit. This object can contain \"bottom\", \"middle\" and \"top\" header definitions. The 'middle' header is mandatory.</p>\n</div></div></div><div id='cfg-rowHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-rowHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-rowHeight' class='name expandable'>rowHeight</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The height of the row in horizontal orientation</p>\n</div><div class='long'><p>The height of the row in horizontal orientation</p>\n</div></div></div><div id='cfg-shiftIncrement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-shiftIncrement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-shiftIncrement' class='name expandable'>shiftIncrement</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The amount to shift (in shiftUnits) ...</div><div class='long'><p>The amount to shift (in shiftUnits)</p>\n<p>Defaults to: <code>1</code></p></div></div></div><div id='cfg-shiftUnit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-shiftUnit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-shiftUnit' class='name expandable'>shiftUnit</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The unit to shift when calling shiftNext/shiftPrevious to navigate in the chart. ...</div><div class='long'><p>The unit to shift when calling shiftNext/shiftPrevious to navigate in the chart.\nValid values are \"MILLI\", \"SECOND\", \"MINUTE\", \"HOUR\", \"DAY\", \"WEEK\", \"MONTH\", \"QUARTER\", \"YEAR\".</p>\n<p>Defaults to: <code>&quot;HOUR&quot;</code></p></div></div></div><div id='cfg-timeAxisColumnWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-timeAxisColumnWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-timeAxisColumnWidth' class='name expandable'>timeAxisColumnWidth</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The width of the time axis column in the vertical orientation</p>\n</div><div class='long'><p>The width of the time axis column in the vertical orientation</p>\n</div></div></div><div id='cfg-timeColumnWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-timeColumnWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-timeColumnWidth' class='name expandable'>timeColumnWidth</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The width of the time tick column in horizontal orientation. ...</div><div class='long'><p>The width of the time tick column in horizontal orientation. Also used as height of time tick row\nin vertical orientation, unless <a href=\"#!/api/Sch.preset.ViewPreset-cfg-timeRowHeight\" rel=\"Sch.preset.ViewPreset-cfg-timeRowHeight\" class=\"docClass\">timeRowHeight</a> is provided.</p>\n<p>Defaults to: <code>50</code></p></div></div></div><div id='cfg-timeResolution' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-timeResolution' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-timeResolution' class='name expandable'>timeResolution</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>An object containing a unit identifier and an increment variable. ...</div><div class='long'><p>An object containing a unit identifier and an increment variable. Example:</p>\n\n<pre><code>    timeResolution : {\n        unit        : \"HOUR\",  //Valid values are \"MILLI\", \"SECOND\", \"MINUTE\", \"HOUR\", \"DAY\", \"WEEK\", \"MONTH\", \"QUARTER\", \"YEAR\".\n        increment   : 1\n    }\n</code></pre>\n</div></div></div><div id='cfg-timeRowHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-cfg-timeRowHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-cfg-timeRowHeight' class='name expandable'>timeRowHeight</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The height of the time tick row in vertical orientation. ...</div><div class='long'><p>The height of the time tick row in vertical orientation. If omitted, a value of <a href=\"#!/api/Sch.preset.ViewPreset-cfg-timeColumnWidth\" rel=\"Sch.preset.ViewPreset-cfg-timeColumnWidth\" class=\"docClass\">timeColumnWidth</a>\nis used.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-headers' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-property-headers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-property-headers' class='name expandable'>headers</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>internal properties</p>\n</div><div class='long'><p>internal properties</p>\n</div></div></div><div id='property-mainHeader' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-property-mainHeader' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-property-mainHeader' class='name expandable'>mainHeader</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>0</code></p></div></div></div><div id='property-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-property-name' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-property-name' class='name expandable'>name</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.preset.ViewPreset-method-constructor' class='name expandable'>Sch.preset.ViewPreset</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.preset.ViewPreset\" rel=\"Sch.preset.ViewPreset\" class=\"docClass\">Sch.preset.ViewPreset</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.preset.ViewPreset\" rel=\"Sch.preset.ViewPreset\" class=\"docClass\">Sch.preset.ViewPreset</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-clone' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-method-clone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-method-clone' class='name expandable'>clone</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getBottomHeader' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-method-getBottomHeader' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-method-getBottomHeader' class='name expandable'>getBottomHeader</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getHeaders' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-method-getHeaders' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-method-getHeaders' class='name expandable'>getHeaders</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getMainHeader' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.preset.ViewPreset'>Sch.preset.ViewPreset</span><br/><a href='source/sch-core-debug.html#Sch-preset-ViewPreset-method-getMainHeader' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.preset.ViewPreset-method-getMainHeader' class='name expandable'>getMainHeader</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});