Ext.define('UberGrid.util.Scroller', {
    
    extend              : 'Ext.scroll.Scroller',
    
    requires: [
        'Ext.scroll.View'
    ],
    
    getAnimationEasing : function (axis) {
        var easing      = this.callParent(arguments)
        
        if (axis == 'y' && easing instanceof Ext.fx.easing.BoundMomentum) easing.setMaxMomentumValue(-this.getMinPosition().y)
        
        return easing
    },
    
    
    setScrollRange : function (minScrollRange, maxScrollRange, totalWidth, skipScrollerRefresh, scrollContainerChanged) {
        this.minPosition        = { x : 0, y : minScrollRange }
        this.maxPosition        = null
        
        // to prevent "min/maxpositionchange" event from "setSize" which will reset the animation
        if (!scrollContainerChanged) this.suspendEvents()
        
        if (scrollContainerChanged) this.setContainerSize(this.givenContainerSize);
        
        // this will reset the cached "maxPosition" value which will be, in turn, used in "changeYBoundaries"
        this.setSize({ x : totalWidth, y : maxScrollRange + 1})
        this.changeYBoundaries()
        
        if (!scrollContainerChanged) this.resumeEvents()
        
        if (!skipScrollerRefresh) this.fireEvent('refresh', this)
    },
    
    
    setHorizontalScrollRange : function (totalWidth, skipScrollerRefresh, scrollContainerChanged) {
        this.maxPosition        = null
        
        // to prevent "min/maxpositionchange" event from "setSize" which will reset the animation
        this.suspendEvents()
        
        if (scrollContainerChanged) this.setContainerSize(this.givenContainerSize);
        // this will reset the cached "maxPosition" value 
        this.setSize({ x : totalWidth, y : this.getSize().y })
        
        this.resumeEvents()
        
        if (!skipScrollerRefresh) this.fireEvent('refresh', this)
    },
    
    
    changeYBoundaries : function () {
        var translatable        = this.getTranslatable()
        
        var activeEasingY       = translatable.activeEasingY
        
        if (activeEasingY && activeEasingY instanceof Ext.fx.easing.BoundMomentum && !activeEasingY.isOutOfBound) {
            activeEasingY.setMinMomentumValue(-this.getMaxPosition().y)
            activeEasingY.setMaxMomentumValue(-this.getMinPosition().y)
        }
    },
    
    
    scrollToY : function (y) {
        this.scrollTo(this.position.x, y)
    },
    
    
    translateY : function (y) {
        var position        = this.position
        var translatable    = this.getTranslatable()
        
        translatable.translate(translatable.x, y)
        
        position.x          = -translatable.x
        position.y          = -y
    },
    
    
    translateSame : function () {
        var position        = this.position
        var translatable    = this.getTranslatable()
        
        translatable.translate(translatable.x, translatable.y)
        
        position.x          = -translatable.x
        position.y          = -translatable.y
    },
    
    
    onAxisDrag: function(axis, delta) {
        if (!this.isAxisEnabled(axis)) {
            return;
        }

        var flickStartPosition = this.flickStartPosition,
            flickStartTime = this.flickStartTime,
            lastDragPosition = this.lastDragPosition,
            dragDirection = this.dragDirection,
            old = this.position[axis],
            min = this.getMinPosition()[axis],
            max = this.getMaxPosition()[axis],
            start = this.startPosition[axis],
            last = lastDragPosition[axis],
            current = start - delta,
            lastDirection = dragDirection[axis],
            restrictFactor = this.getOutOfBoundRestrictFactor(),
            startMomentumResetTime = this.getStartMomentumResetTime(),
            now = Ext.Date.now(),
            distance;

        if (current < min) {
            current = min + (current - min) * restrictFactor;
        }
        else if (current > max) {
            distance = current - max;
            current = max + distance * restrictFactor;
        }

        if (current > last) {
            dragDirection[axis] = 1;
        }
        else if (current < last) {
            dragDirection[axis] = -1;
        }

        if ((lastDirection !== 0 && (dragDirection[axis] !== lastDirection))
                || (now - flickStartTime[axis]) > startMomentumResetTime) {
            flickStartPosition[axis] = old;
            flickStartTime[axis] = now;
        }

        lastDragPosition[axis] = current;
    }
}, function () {

    Ext.scroll.View.override({
        
        setIndicatorValue: function(axis, scrollerPosition) {
            if (!this.isAxisEnabled(axis)) {
                return this;
            }
    
            var scroller = this.getScroller(),
                scrollerMinPosition = scroller.getMinPosition()[axis],
                scrollerMaxPosition = scroller.getMaxPosition()[axis],
                scrollerContainerSize = scroller.getContainerSize()[axis],
                value;
                
                
            var scrollableDistance  = scrollerMaxPosition - scrollerMinPosition
            
            // wonder what does this code mean - some workaround?
            if (scrollableDistance === 0) {
                value = scrollerPosition / scrollerContainerSize;
    
                if (scrollerPosition >= 0) {
                    value += 1;
                }
            }
            else {
                if (scrollerPosition > scrollerMaxPosition) {
                    value = 1 + ((scrollerPosition - scrollerMaxPosition) / scrollerContainerSize);
                }
                else if (scrollerPosition < scrollerMinPosition) {
                    value = (scrollerPosition - scrollerMinPosition) / scrollerContainerSize;
                }
                else {
                    value = (scrollerPosition - scrollerMinPosition) / scrollableDistance;
                }
            }
    
            this.getIndicators()[axis].setValue(value);
        }
    })

});



