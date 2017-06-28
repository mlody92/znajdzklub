Ext.define('UberGrid.util.Queue', {
    
    intervalTime    : 16,
    intervalId      : null,
    
    actions         : null,
    scope           : null,
    
    tickSource      : 'internal', // 'internal / external'
    
    externalTickCounter     : 0,
    skipTicks               : 1,
    
    isRunning       : false,
    

    constructor : function (config) {
        Ext.apply(this, config)
        
        this.actions        = []
    },
    
    
    schedule : function () {
        this.actions.push.apply(this.actions, arguments)
    },
    
    
    scheduleNext : function () {
        this.actions.unshift.apply(this.actions, arguments)
    },
    
    
    externalTick : function () {
        if (this.externalTickCounter % this.skipTicks === 0) {
            this.process();
        }
        this.externalTickCounter++;
    },
    
    
    process : function () {
        if (!this.isRunning)   throw "Queue is not running"
        
        var actions         = this.actions
        
        if (!actions.length)   {
            this.stop()
            
            return
        }
        
        var action = actions.shift()
        
        ;(action.process || action).call(this.scope || action.scope, action)
        
        if (!actions.length) this.stop()
    },
    
    
    run : function (immediate) {
        if (this.isRunning) return
        
        var me          = this
        
        this.isRunning              = true
        this.externalTickCounter    = 0
        
        if (this.tickSource == 'internal') this.intervalId = setInterval(function () { me.process() }, this.intervalTime)
        
        if (immediate) 
            me.process()
        else
            if (!this.actions.length) this.stop()
    },
    
    
    stop : function () {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            
            this.intervalId = null
        }
        
        this.isRunning              = false
    },
    
    
    switchToInternalTicks : function (runImmediately) {
        if (this.tickSource == 'internal') return
        
        this.tickSource = 'internal'
        
        if (this.isRunning) {
            this.isRunning = false
            
            this.run(runImmediately)
        }
    },
    
    
    switchToExternalTicks : function () {
        if (this.tickSource == 'external') return
        
        this.tickSource = 'external'
        
        if (this.isRunning && this.intervalId) {
            clearInterval(this.intervalId)
            
            this.intervalId = null
        }
    },
    
    
    discard : function () {
        if (this.isRunning) this.stop()
        
        this.actions        = []
    },
    
    
    flush : function () {
        var prevTickSource      = this.tickSource
        
        this.switchToExternalTicks()
        
        this.run()
        
        while (this.isRunning) this.externalTick()
        
        if (prevTickSource == 'internal') this.switchToInternalTicks()
    }
});