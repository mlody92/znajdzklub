/**
 *
 * @class Sch.feature.PullRefresh
 *
 * A class implementing the side pull feature. If enabled on the main scheduler panel, you can pull the left and right sides of the schedule to
 * traverse the time axis.
 */
Ext.define('Sch.feature.PullRefresh', {
    alias : 'plugin.sch_pullrefresh',

    requires : [
        'Ext.XTemplate'
    ],

    config : {
        /*
         * @accessor
         */
        scheduler  : null,

        /*
         * @cfg {String} side The position for this plugin: 'left', 'right'.
         * @accessor
         */
        side       : null,

        /*
         * @cfg {Function} handler The function that will be called to refresh the list.
         * If this is not defined, the store's load function will be called.
         * The refresh function gets called with a reference to this plugin instance.
         * @accessor
         */
        handler    : null,

        /*
         * @cfg {Object} scope The "this" object for the handler
         * @accessor
         */
        scope      : null,

        /*
         * @cfg {Array} steps An array describing how to shift the timeAxis when the side pull happens.
         * Each step can be configured with an amount and optionally a time unit. By default, the time unit for each step is the unit configured on the time axis.
         * @accessor
         *
         * Example configuration for the left side:
         *
         * shiftSteps  : [
         *      { amount : -1 },
         *      { amount : -3 },
         *      { amount : -10, unit : 'w' }
         *  ]
         */
        shiftSteps : null,

        /*
         * @cfg {String} pullTpl The template being used for the pull to refresh markup.
         * @accessor
         */
        pullTpl    : '<div class="sch-pullrefresh sch-pullrefresh-{{side}}">' +
            '<tpl for="steps">' +
            '<dl class="sch-shift-{#}" style="{{sizeProp}}:{[100/xcount]}%;"><dt></dt><dd>{[Math.abs(values.amount)]}{[ Sch.util.Date.getShortNameOfUnit(values.unit || parent.unit).substring(0,2) ]}</dd></dl>' +
            '</tpl>' +
            '</div>',

        timeAxis : null,
        scroller : null
    },

    isRefreshing     : false,
    activateDistance : 20,
    steps            : null,
    currentStep      : null,
    isReleased       : false,
    maxScroll        : null,
    el               : null,

    constructor               : function (config) {
        Ext.apply(this, config);

        this.initConfig(config);

        var tpl = this.getPullTpl();
        var isHorizontal = this.scheduler.getOrientation() === 'horizontal';
        var scroller = this.scheduler.getScheduleScroller();

        if (!(tpl instanceof Ext.XTemplate)) {
            tpl = new Ext.XTemplate(tpl.replace('{{side}}', this.getSide()).replace('{{sizeProp}}', isHorizontal ? 'width' : 'height'));
            this.setPullTpl(tpl);
        }

        if (isHorizontal) {
            var containerCmp = this.scheduler.normalGrid.headerCmp;

            containerCmp.on('refresh', this.onHorizontalHeaderRefresh, this, { buffer : 50 });
        } else {
            this.scheduler.on('refresh', this.onSchedulerRefresh, this, { buffer : 50 });
            this.scheduler.on('refresh', this.setupVertical, this, { single : true });
        }

        this.setScroller(scroller);

        scroller.on({
            scroll : this.onScrollChange,
            scope  : this
        });

        // Initialize this value, even this it's likely way too early since view is not done painting itself
        this.maxScroll = scroller.getMaxPosition();
    },

    // After the header is painted, inject the elements
    onHorizontalHeaderRefresh : function (header) {
        // Header may have been destroyed
        if (!header.element) return;

        var me = this,
            pullTpl = me.getPullTpl(),
            timeAxis = me.getTimeAxis(),
            ctElement = header.element.down('.ubergrid-header-wrap'),
            scroller = this.scheduler.getScheduleScroller();

        pullTpl.insertFirst(ctElement, {
            unit  : timeAxis.getUnit(),
            steps : this.getShiftSteps()
        });

        me.el = ctElement.dom.querySelector('.sch-pullrefresh');
        me.steps = [];

        Ext.each(me.el.childNodes, function (node, index) {
            if (me.side === 'left') {
                var headerX = ctElement.getX();

                me.steps[index] = Ext.fly(node).getX() - headerX;
            }
            else {
                var headerRight = ctElement.getX() + ctElement.getWidth();

                me.steps[index] = Ext.fly(node).getX() + Ext.fly(node).getWidth() - headerRight;
            }
        });

        me.maxScroll = scroller.getMaxPosition();
    },

    // After the schedule is refreshed, get fresh scroller max value
    onSchedulerRefresh        : function () {
        this.maxScroll = this.getScroller().getMaxPosition();
    },

    setupVertical        : function () {
        var me = this,
            pullTpl = me.getPullTpl(),
            timeAxis = me.getTimeAxis(),
            ctElement = this.scheduler.lockedGrid.bodyCmp.element.down('.ubergrid-bodycmp-inner'),
            scroller = this.getScroller();

        pullTpl.insertFirst(ctElement, {
            unit  : timeAxis.getUnit(),
            steps : me.side === 'top' ? this.getShiftSteps().slice().reverse() : this.getShiftSteps()
        });

        me.el = ctElement.dom.querySelector('.sch-pullrefresh');
        me.steps = [];

        Ext.each(me.el.childNodes, function (node, index) {
            if (me.side === 'top') {
                var headerY = ctElement.getY();

                me.steps[index] = Ext.fly(node).getY() - headerY;
            }
            else {
                var headerBottom = ctElement.getY() + ctElement.getHeight();

                me.steps[index] = Ext.fly(node).getY() + Ext.fly(node).getHeight() - headerBottom;
            }
        });
    },

    onScrollChange : function (scroller, x, y) {
        var side = this.getSide();

        // Scheduler may not have been fully rendered yet
        if (!this.el) return;

        if (
            (side === 'left' && x < 0) ||
                (side === 'right' && x > this.maxScroll.x) ||
                (side === 'top' && y < 0) ||
                (side === 'bottom' && y > this.maxScroll.y)
            ) {
            this.onScroll(side, this.scheduler.getOrientation() === 'horizontal' ? x : y);
        }
    },

    onScroll : function (side, val) {
        var me = this,
            scroller = this.getScroller(),
            exceeded = this.isPullThresholdExceeded(val);

        if (!me.isReleased) {
            if (exceeded) {
                var start = side === 'top' ? 0 : me.steps.length - 1;
                var stop  = side !== 'top' ? -1 : me.steps.length;
                var inc = side === 'top' ? 1 : -1;

                for (var i = start; i !== stop; i+=inc) {
                    if (
                        (side === 'left' && val < me.steps[i]) ||
                        (side === 'right' && (val - this.maxScroll.x) > me.steps[i]) ||
                        (side === 'top' && val < me.steps[i]) ||
                        (side === 'bottom' && (val - this.maxScroll.y) > me.steps[i])
                        ) {

                        if (i === this.currentStep) {
                            break;
                        }

                        Ext.fly(me.el).select('.active').removeCls('active');
                        this.currentStep = i;
                        Ext.fly(me.el).down('.sch-shift-' + (i + 1)).addCls('active');
                        break;
                    }
                }

                if (i < 0 && this.currentStep >= 0) {
                    this.currentStep = null;
                    Ext.fly(me.el).select('.active').removeCls('active');
                }
            }
            else {
                Ext.fly(me.el).select('.active').removeCls('active');
            }

            if (!me.isRefreshing && exceeded) {
                me.isRefreshing = true;

                scroller.getContainer().onBefore({
                    dragend : 'onScrollerDragEnd',
                    single  : true,
                    scope   : me
                });
            }
            else if (me.isRefreshing && !me.isPullThresholdExceeded(val)) {
                me.isRefreshing = false;
                this.currentStep = null;
            }
        }
    },

    isPullThresholdExceeded : function (val) {
        switch (this.side) {
            case 'left':
            case 'top':
                return -val >= this.activateDistance;

            case 'right':
                return val >= this.getScroller().maxPosition.x + this.activateDistance;

            case 'bottom':
                return val >= this.getScroller().maxPosition.y + this.activateDistance;
        }
    },

    onScrollerDragEnd : function () {
        var me = this;

        if (me.isRefreshing) {
            me.getScroller().on({
                scrollend : 'doAction',
                single    : true,
                scope     : me
            });

            me.isReleased = true;
        }
    },

    doAction : function () {
        var me = this,
            scroller = this.getScroller(),
            scrollTo = 0,
            step = me.currentStep,
            side = this.getSide(),
            isHorizontal = this.scheduler.getOrientation() === 'horizontal';

        me.isReleased = false;

        switch (side) {
            case 'left':
                scroller.minPosition.x = 0;
                break

            case 'top':
                scroller.minPosition.y = 0;
                break;

            case 'right':
                scrollTo = me.maxScroll.x;
                break;

            case 'bottom':
                scrollTo = me.maxScroll.y;
                break;
        }

        scroller.scrollTo(isHorizontal ? scrollTo : null, isHorizontal ? null : scrollTo);

        if (Ext.isNumber(step)) {
            var stepCfg = me.getShiftSteps()[me.side === 'top' ? me.steps.length - 1 - step : step];

            me.handler.call(me.scope || me, stepCfg.amount, stepCfg.unit || me.getTimeAxis().getUnit());
        }

        me.currentStep = null;
    },

    destroy : function() {
        this.callParent(arguments);
    }
});
