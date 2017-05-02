var Harness = new Siesta.Harness.Browser.SenchaTouch()

Harness.configure({
    title              : 'Touch Scheduler Test Suite',
    testClass          : Bryntum.STSchedulerTest,
    keepResults        : true,
    autoCheckGlobals   : true,
    overrideSetTimeout : true,
    enableCodeCoverage : !!(Siesta.Harness.Browser.UI && Siesta.Harness.Browser.UI.CoverageReport),
    excludeCoverageUnits : /^UberGrid|^Ext/,
    runCore            : 'parallel',
    expectedGlobals    : [
        'Ext',
        'Sch',
        'UberGrid',

        'InputBlocker'
    ],

    preload : [
        "../../sencha-touch-2.3.0/resources/css/sencha-touch.css",
        "../../sencha-touch-2.3.0/sencha-touch-all-debug.js",

        {
            url         : "../touch-scheduler-all-debug.js",
            instrument  : true
        },

        "../resources/css/touch-scheduler-all-debug.css"
    ]
})


var suite = [
    {
        group : 'Sanity',
        items : [
            'sanity/001_sanity.t.js',
            'sanity/002_no_overrides.t.js',
            {
                url         : 'sanity/003_lint.t.js',
                alsoPreload : [ "sanity/jshint.js" ]
            },
            'sanity/004_subclass.t.js',
            'sanity/005_dom_footprint.t.js',
            'sanity/006_store_id.t.js',
            {
                url     : 'sanity/007_unscoped_css_rules.t.js',
                preload : [
                    "../../sencha-touch-2.3.0/sencha-touch-all-debug.js",
                    "../resources/css/touch-scheduler-all-debug.css"
                ]
            },
            {
                url     : 'sanity/008_on_demand.t.js',
                preload : [
                    "../../sencha-touch-2.3.0/sencha-touch-debug.js",
                    "../../sencha-touch-2.3.0/resources/css/sencha-touch.css",
                    "../resources/css/touch-scheduler-all-debug.css"
                ]
            }
        ]
    },
    {
        group : 'Models and data',
        items : [
            'data/001_model_fields.t.js',
            'data/002_store_bindings.t.js',
            'data/003_store_sanity.t.js',
            'data/004_event_model.t.js',
            'data/005_store_load.t.js'
        ]
    },
    {
        group : 'Event bar',
        items : [
            'event_bar/100_drag_drop.t.js',
            'event_bar/100_drag_drop_vertical.t.js',
            'event_bar/050_event_firing.t.js',
            'event_bar/051_content.t.js',
            'event_bar/052_sel_model.t.js',
            'event_bar/053_pinch.t.js',
            'event_bar/053_pinch_vertical.t.js',
            'event_bar/101_delete.t.js',
            'event_bar/102_drag_drop_zindex.t.js',
            'event_bar/103_drag_drop_selected.js',
            'event_bar/104_drag_invalid.t.js',
            'event_bar/105_drag_drop_conflict.t.js',
            'event_bar/106_drag_drop_events.t.js',
            'event_bar/107_drag_drop_scroll.t.js',
            'event_bar/108_drag_drop2.t.js',
            'event_bar/109_drag_drop3.t.js',
            'event_bar/110_drag_drop4.t.js'
        ]
    },
    {
        group : 'Features',
        items : [
            'features/050_create_event.t.js',
            'features/050_create_event_vertical.t.js',
            'features/051_pull_refresh.t.js',
            'features/051_pull_refresh_vertical.t.js',
            'features/052_lines_zones.t.js',
            'features/053_resource_zones.t.js',
            'features/054_resource_zones_vertical.t.js',
        ]
    },
    {
        group : 'Performance',
        items : [
            'performance/201_paint.t.js'
        ]
    },
    {
        group : 'Panel',
        items : [
            'panel/300_event_store_bindings.t.js',
            'panel/301_api.t.js',
            'panel/302_scrolling.t.js',
            'panel/303_lockedWidth.t.js',
            'panel/304_resource_store_bindings.t.js',
            'panel/305_scroll_sync.t.js',
            'panel/306_css_sanity.t.js',
            'panel/307_compact_mode.t.js',
            'panel/308_panel_not_rendered.t.js',
            'panel/309_timeaxis.t.js',
            'panel/310_scrolling_setrowheight.t.js',
            'panel/311_schedule_pinch.t.js',
            'panel/311_schedule_pinch_vertical.t.js',
            'panel/312_resizing.t.js',
            'panel/313_vertical.t.js',
            'panel/313_vertical_compact.t.js',
            'panel/314_memory.js'
        ]
    },
    {
        group : 'Scheduling View',
        items : [
            'schedulingview/400_sanity.t.js',
            'schedulingview/401_css.t.js',
            'schedulingview/403_rowheight_1.t.js',
            'schedulingview/404_rowheight_2.t.js',
            'schedulingview/405_rowheight_3.t.js'
        ]
    },
    {
        group : 'Header',
        items : [
            'header/200_tap_to_scroll_top.t.js',
            'header/201_event_firing.t.js',
            'header/202_sizing.t.js',
            'header/203_forcefit.t.js'
        ]
    }
];


// Inject tests exercising the examples
var exampleUrls =
        [
            'basic/basic.html',
            'compact/compact.html',
            'customtemplate/customtemplate.html',
            'editor/editor.html',
            'zooming/zooming.html',
            'linesandzones/linesandzones.html',
            'resourcezones/resourcezones.html',
            'styling/styling.html'
        ],
    exampleItems = [];

for (var i = 0; i < exampleUrls.length; i++) {
    exampleItems[i] = {
        hostPageUrl : '../examples/' + exampleUrls[i],
        url         : 'sdk_examples/10000_sanity.t.js?' + exampleUrls[i],
        name        : exampleUrls[i]
    };
}

suite.push(
    {
        group              : 'Exercising SDK Examples',
        expanded           : false,
        autoCheckGlobals   : false,
        overrideSetTimeout : false,
        performSetup       : false,
        preload            : [],
        items              : exampleItems
    }
);

// Should not see any Ext logs during test runs (could come from exceptions during template rendering)
Harness.on('teststart', function(ev, test) {

    if (test.global.Ext && test.global.Ext.Logger) {
        var win = test.global;
        var Ext = test.Ext();

        // Enable this line for Sencha 5
        // Ext.Logger.log = win.console.warn = win.console.error = fail;
    }
})

Harness.start.apply(Harness, suite);
