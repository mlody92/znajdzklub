/**
 * A event recogniser which knows when you tap and hold for more than {@link #minDuration} ms (defaults to 400ms).
 *
 * @private
 */
Ext.define('Sch.recognizer.SemiLongPress', {
    extend: 'Ext.event.recognizer.SingleTouch',

    /**
     * @cfg {Int} moveTolerance
     * While pressing a finger on the screen, it can be hard to keep it perfectly still - which aborts a normal 'longpress' gesture.
     * Setting this tolerance value allows for some slight movement during the press.
     */
    moveTolerance : 5,

    inheritableStatics: {
        DURATION_NOT_ENOUGH: 0x20
    },

    config: {
        minDuration: 400
    },

    handledEvents: ['semilongpress'],

    /**
     * @event semilongpress
     * Fires when you touch and hold finger (almost) still for more than 400 ms.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */
    fireLongPress: function(e) {
        var touch = e.changedTouches[0];
        
        this.fire('semilongpress', e, [touch], {
            touch: touch,
            duration: this.getMinDuration()
        });

        this.isLongPress = true;
    },

    onTouchStart: function(e) {
        var me = this;

        if (this.callParent(arguments) === false) {
            return false;
        }

        this.isLongPress = false;
        this._touchX = e.touch.pageX;
        this._touchY = e.touch.pageY;

        this.timer = setTimeout(function() {
            me.fireLongPress(e);
        }, this.getMinDuration());
    },

    onTouchMove: function(e) {
        if (Math.abs(this._touchX - e.touch.pageX) > this.moveTolerance ||
            Math.abs(this._touchY - e.touch.pageY) > this.moveTolerance) {
            return this.fail(this.self.TOUCH_MOVED);
        }
    },

    onTouchEnd: function() {
        if (!this.isLongPress) {
            return this.fail(this.self.DURATION_NOT_ENOUGH);
        }
    },

    fail: function() {
        clearTimeout(this.timer);

        return this.callParent(arguments);
    }

});