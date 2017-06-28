Introduction
-----------------

The Bryntum Touch Scheduler is a custom Sencha Touch component which allows you to visualize and manage "resources" and their scheduled "events".
The concrete semantic of an *event* and *resource* is up to you. For example, an event can be a doctor's appointment, a meeting or an airplane flight.
A resource, can be a doctor (a person in general), a meeting room or an airport gate.

If you have never used Sench Touch before, it's highly recommended that you start by visiting the
<a href="http://www.sencha.com/learn/touch/">Sencha Touch Learning Center</a> to understand the basics of the underlying framework.

{@img ../../doc-resources/scheduler/images/ext-scheduler.png}


Data
-----------------

The information about events and resources should be provided to the scheduler configuration object as two separate data stores: `eventStore` and `resourceStore`. 
The `eventStore` should be an instance of {@link Sch.data.EventStore}, and the `resourceStore` - should be an instance of {@link Sch.data.ResourceStore}.
Both of those classes are subclasses of the normal {@link Ext.data.Store} class. Please refer to the {@link Ext.data.Store} documentation to learn about the base interface.

Each data store is a collection of "models" with additional methods for filtering, grouping and sorting etc. Events and resources in the scheduler are represented with the {@link Sch.model.Event} and {@link Sch.model.Resource} classes.
Refer to their documentation for details on how you can add additional fields, or how you can customize the pre-defined fields.   

The two models are tied together via the 'Id' property on the Resource model and the 'ResourceId' property on the Event model.
This image shows a typical class definition diagram for the two models:

{@img ../../doc-resources/scheduler/images/scheduler-stores.png}

Please refer to this guide <http://docs.sencha.com/ext-js/4-0/#/guide/data> for base information about Ext JS data package.

Synopsys
-----------------

HTML file:

    <!DOCTYPE HTML>
    <html>
    <head>
        <!--SenchaTouch styles  -->
        <link href="_PATH_TO_SENCHA_TOUCH_/sencha-touch-2.1.0/resources/css/sencha-touch.css" rel="stylesheet" type="text/css" />

    	<!--Scheduler styles-->
        <link href="_PATH_TO_SCHEDULER_/resources/css/touch-scheduler-all-debug.css" rel="stylesheet" type="text/css" />

    	<!--Sencha Touch -->
        <script src="_PATH_TO_SENCHA_TOUCH_/sencha-touch-2.1.0/sencha-touch-all.js" type="text/javascript"></script>

        <!--Bryntum Touch Scheduler-->
        <script src="_PATH_TO_SCHEDULER_/tousch-scheduler-all-debug.js" type="text/javascript"></script>

        <!--Application files-->
        <script src="synopsys.js" type="text/javascript"></script>

        <title>Basic SenchaTouch Scheduler</title>
    </head>
    <body>
    </body>
    </html>


synopsys.js:

    Ext.setup({

        onReady: function () {
            var resourceStore = new Sch.data.ResourceStore({
                data: [
                    { Id : 1, Name : 'Johnny Johnson' },
                    { Id : 14, Name : 'Azamat Bagatov' }
                ]
            })

            var eventStore = new Sch.data.EventStore({
                data: [
                    {
                        Id          : 1,
                        ResourceId  : 1,
                        Name        : 'My event',
                        StartDate   : new Date(2012, 2, 1, 12),
                        EndDate     : new Date(2012, 2, 5)
                    }
                ]
            })

            var scheduler = new Sch.panel.SchedulerGrid({
                title       : 'Staff Schedule',
                startDate   : new Date(2012, 2, 1),
                endDate     : new Date(2012, 2, 16),

                rowHeight   : 60,
                viewPreset  : 'dayAndWeek',
                columns     : [
                    {
                        caption: 'Name',
                        field: 'Name',
                        locked: true,
                        width: 180
                    }
                ],

                onEventCreated: function (newEventRecord) {
                    // Supply default record values etc.
                    newEventRecord.set({
                        Name: 'New task'
                    });
                },

                barMargin       : 3,
                resourceStore   : resourceStore,
                eventStore      : eventStore
            })

            Ext.Viewport.add([
                scheduler
            ]);
        }
    });




The scheduler timeline header 
-----------------

{@img ../../doc-resources/scheduler/images/scheduler-timeline-header.png}

The presentation of the scheduler's timeline can be configured using the {@link Sch.panel.SchedulerGrid#viewPreset viewPreset} configuration option. 
You can choose from a list of pre-defined presets or create your own custom view preset. Each view preset can consist of 1-3 header {@link Sch.preset.ViewPresetHeaderRow rows}. 
Each row can be independently configured with its own dateFormat (or custom renderer), time unit and increment. The scheduler comes with several predefined view presets that you can use:

    "hourAndDay"
    "dayAndWeek"
    "weekAndDay"
    "weekAndMonth"
    "monthAndYear"
    "year"

If none of these suits your needs, you can easily create your own custom view presets too. Here's an example of a viewPreset:

    weekAndMonth : {
        timeColumnWidth : 100,
        rowHeight: 24,              // Only used in horizontal orientation
        resourceColumnWidth : 100,  // Only used in vertical orientation
        displayDateFormat : 'Y-m-d',
        shiftUnit : "WEEK",
        shiftIncrement : 5,
        defaultSpan : 6,            // By default, show 6 weeks
        
        timeResolution : {
            unit : "DAY",
            increment : 1
        },

        headerConfig : {
            middle : {
                unit : "WEEK",
                renderer : function(start, end, cfg) {
                    cfg.align = 'left';
                    return Ext.Date.format(start, 'd M');
                }
            },
            top : {
                unit : "MONTH",
                dateFormat : 'M Y'
            }
        }
    }

Please refer to the {@link Sch.preset.Manager} documentation for further information.

Events
-----------------

Virtually every sub-component in the scheduler (including the scheduler itself), implements the Observable pattern. In the Sencha Touch framework,
this pattern is represented with the {@link Ext.mixin.Observable} mixin.

This means that you can be notified about various events happening within the scheduler and provide your custom handlers (listeners) for them. For example:

    scheduler.on('eventtap', function (sch, event) {
        alert("You tapped on the " + event.get('Name') + ' event');
    }); 

The function provided as the 2nd argument to the `on` method call will be called when a user taps an event in scheduler.
Please refer to the {@link Ext.mixin.Observable} documentation for details on how you can customize the behaviour of the listeners.

 
Rendering customization
-----------------

There are several ways you can customize the presentation of the events and timeline itself. This section will briefly summarize them. Please also refer to the documentation of each individual
option.

- {@link Sch.panel.SchedulerGrid#eventBarTextField eventBarTextField} This is the easiest way of defining which field in your model to display in each rendered event (defaults to 'Name'). 

- {@link Sch.panel.SchedulerGrid#eventRenderer eventRenderer} This function can be provided as the configuration option and will be called for each event. It can return a string or an object. 
String will be used as the "event body" and object will be passed to the `eventBodyTemplate` template (must be provided in this case). Returning string from this function is the simplest
method to customize the presentation of event. 

- {@link Sch.panel.SchedulerGrid#eventBodyTemplate eventBodyTemplate} - the template for "event body". The "event body" is the internal content of the event, w/o the wrapping markup. It still can contain arbitrary HTML. This template will
receive either the return value from `eventRenderer` or the whole data object of the event being rendered (each field will be available as the `{FieldName}` symbol).

- {@link Sch.panel.SchedulerGrid#eventTpl eventTpl} - the top-most event template, only override when you know what you are doing. 



Plugins and additional features
-----------------

By itself, the scheduler is merely a visualizing tool. To make it more interactive you can enable and add various features and plugins.
In the simplest case for example, the event drag and drop functionality can be activated with the
{@link Sch.panel.SchedulerGrid#enableEventDragDrop enableEventDragDrop} configuration option (defaults to true).
Under the hood, it will add drag-and-drop support for all the scheduled events.

To add a plugin manually, you need to pass an instance of the plugin in the `plugins` configuration option. For example, to enable the {@link Sch.plugin.Zones pan plugin}:

        var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
            ...
    
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            
            plugins         : [
                new Sch.plugin.CurrentTimeLine()
            ]
        });

A plugin may have its own configuration options. You can pass several plugins at once. For the list of available plugins,
please examine the classes in the `Sch.plugin` namespace.