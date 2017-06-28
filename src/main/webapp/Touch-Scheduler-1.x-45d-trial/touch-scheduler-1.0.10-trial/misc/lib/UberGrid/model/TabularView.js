/**
@class UberGrid.model.TabularView
@aside guide ubergrid_getting_started

This class represents a so called "view model" of the main panel. 

* ** This is a "system" internal class, you only need to use it if you are going to write some UberGrid extension.
For regular usage this class should be considered "private"**

*/
Ext.define('UberGrid.model.TabularView', {

    mixins      : [
        'UberGrid.mixin.Renderer',
        'Ext.mixin.Observable' 
    ],

    requires    : [
        'UberGrid.column.Column',
        'UberGrid.model.Container',
        'UberGrid.model.Row',
        'UberGrid.util.Queue'
    ],

    /**
     * @cfg {Boolean} buffered Whether a grid is in buffered rendering mode
     */
    buffered                        : true,
    
    /**
     * @cfg {Ext.data.Store} store A reference to a store of the main panel.  
     */
    store                           : null,
    
    /**
     * @cfg {UberGrid.column.Column} columns A root column of the whole grid. Note, that it will contain only the columns of **all** grid sections.  
     */
    columns                         : null,

    /**
     * @cfg {Boolean} stripeRows Whether the row striping should be enabled
     */
    stripeRows                      : true,
    
    /**
     * @cfg {Function} getRowCls A function allowing you to provide an additional CSS class for row DOM elements. See {@link UberGrid.Panel#getRowCls getRowCls} config option of the main panel class.
     */
    getRowCls                       : null,
    
    /**
     * @cfg {Object} getRowClsScope A scope for {@link #getRowCls} function.
     */
    getRowClsScope                  : null,

    /**
     * @property {Number} bufferStartPoint An index of the very first rendered record in the data store. In non-buffered mode, this is always 0, but in buffered mode this 
     * property will change while user scrolls the grid.
     */
    bufferStartPoint                : 0,
    
    /**
     * @property {Number} bufferEndPoint An index of the very last rendered record in the data store. In non-buffered mode, this is always equal to the index of last record in the store, but in buffered mode this 
     * property will change while user scrolls the grid.
     */
    bufferEndPoint                  : -1,

    /**
     * @property {Number} estimatedRowHeight A current estimation for an average row height. This value can be different from {@link #rowHeight} if some rows have individual row height. This property
     * is calculated based on the height of several last rows.
     */
    estimatedRowHeight              : null,
    
    /**
     * @cfg {Number} rowHeight A default row height.
     */
    rowHeight                       : null,
    
    /**
     * @cfg {Boolean} rowHeightIsFixed A boolean value, indicating whether row height of all rows is the same. If it is, UberGrid will apply some optimizations to the scrolling process.
     */
    rowHeightIsFixed                : true,
    
    totalHistoryHeight              : 0,
    totalHistoryCount               : 0,
    estimationHistory               : null,
    historyLimit                    : 50,
    
    /**
     * @property {Number} viewportHeight A height of the viewport (visible area provided for content rendering)
     */
    viewportHeight                  : null,
    
    /**
     * @property {Number} viewportScrollTop A current top offset of the viewport.
     */
    viewportScrollTop               : 0,
//    // whether the last value of `totalHeight` was processed in the `moveViewportTo` 
//    viewportScrollTopProcessed      : true,
    
    
    contentHeight                   : null,
    
    /**
     * @property {Number} minScrollRange Minimal scroll top offset that should be allowed when scrolling.
     */
    minScrollRange                  : 0,
    
    /**
     * @property {Number} maxScrollRange Maximal scroll top offset that should be allowed when scrolling.
     */
    maxScrollRange                  : 0,
    
    queue                           : null,
    queueConfig                     : null,
    
    /**
     * @property {Boolean} isPopulated Whether the view has been populated with rows. Note, that this property indicates the fact that tabular 
     * view has made inital processing of the data store and the will be set to `true` even if store contains no records. 
     */
    isPopulated                     : false,
    
    /**
     * @property {Boolean} isAnimating Boolean flag, indicating, whether the content is currently being animated by the scroller. Animation means that content is still scrolling
     * after user has removed the finger from the screen. Content is not considered to be animated while user scrolls it with the finger on screen. 
     */
    isAnimating                     : false,
    
    /**
     * @property {Array[ Objects ]} rowObservers An array with objects who "observers" the "row actions" fired by the tabular view. Tabular view provides
     * its own **very** lightweight and limited events fireing mechanism and bypasses default SenchaTouch capabilities for critical events. 
     * The observers will be notified about events that happens with the rows of the tabular view (like row addition, removal, update, etc).
     * 
     * See also {@link #addRowObserver} and {@link #fireRowAction} methods.  
     */
    rowObservers                    : null,
    
    /**
     * @property {Array[ Objects ]} scrollObservers An array with objects who "observers" the "scroll actions" fired by the tabular view. Tabular view provides
     * its own **very** lightweight and limited events fireing mechanism and bypasses default SenchaTouch capabilities for critical events. 
     * The observers will be notified about the scrolling events that happens with the content.
     * 
     * See also {@link #addScrollObserver} and {@link #fireScrollAction} methods.  
     */
    scrollObservers                 : null,
    
    /**
     * @property {Array[UberGrid.model.Container]} visibleContainers An array of currently rendered row containers. Please do not rely on this property it is likely to be refactored out in one
     * of the next releases.
     */
    visibleContainers               : null,
    containersCache                 : null,
    
    rowsCache                       : null,

    
    constructor : function (config) {
        Ext.apply(this, config)
        
        this.initConfig(config);
        
        var columns             = this.columns
        var store               = this.store

        if (!columns)                   throw "`columns` attribute is required for `UberGrid.model.TabularView`";
        if (!store)                     throw "`store` attribute is required for `UberGrid.model.TabularView`";
        if (!this.rowHeight)            throw "`rowHeight` attribute is required for `UberGrid.model.TabularView`";
        
        this.visibleContainers  = []
        this.containersCache    = []
        
        this.rowObservers       = []
        this.scrollObservers    = []
        
        this.estimationHistory  = []
        
        this.estimatedRowHeight = this.rowHeight
        
        this.rowsCache          = {}
        
        this.queue              = new UberGrid.util.Queue(Ext.apply({
            intervalTime        : 30,
            skipTicks           : 1
        }, this.queueConfig))
        
        this.bindStore(store, true)
    },
    
    
//    renderAllRows : function () {
//        this.generateRows(0, null, 0, false, 1e10)
//        
//        var indices     = []
//        
//        this.fireRowAction('onColumnIndicesRequested', indices)
//        
//        var me      = this
//        
//        var renderingBuffer = document.createElement('div')
//        
//        this.store.each(function (record) {
//            var row     = me.rowsCache[ record.internalId ]
//            
//            for (var i = 0; i < indices.length; i++) {
//                var index   = indices[ i ]
//                
//                renderingBuffer.innerHTML = me.renderRow(row, index.firstColumnIndex, index.lastColumnIndex)
//                
//                row.domCache[ index.firstColumnIndex + '/' + index.lastColumnIndex ] = renderingBuffer.children[ 0 ]
//            }
//        })
//    },


    /**
     * Return a total number of records in the store
     * 
     * @return {Number}
     */
    getTotalCount : function () {
        return this.store.totalCount != null ? this.store.totalCount : this.store.getCount()
    },


    /**
     * Return a number of the currently rendered records.
     * 
     * @return {Number}
     */
    getBufferSize : function () {
        return this.bufferEndPoint - this.bufferStartPoint + 1
    },


    /**
     * Return a number of records that are not rendered and reside above the currently rendered content
     * 
     * @return {Number}
     */
    getRecordsCountBeforeBuffer : function () {
        return this.bufferStartPoint
    },


    /**
     * Return a number of records that are not rendered and reside below the currently rendered content
     * 
     * @return {Number}
     */
    getRecordsCountAfterBuffer : function () {
        return this.getTotalCount() - this.bufferEndPoint - 1
    },
    
    
    /**
     * Return a top offset of the currently rendered content. See also {@link #getContentScrollBottom}.
     * 
     * @return {Number}
     */
    getContentScrollTop : function () {
        // in non-buffered mode, content is always considered to be at the top
        return this.buffered ? (this.visibleContainers.length ? this.visibleContainers[ 0 ].row.offsetTop : 0) : 0
    },
    
    
    /**
     * Return a bottom offset of the currently rendered content. See also {@link #getContentScrollTop}.
     * 
     * @return {Number}
     */
    getContentScrollBottom : function (containers) {
        return this.getContentScrollTop() + this.getContentHeight() - 1
    },
    
    
    /**
     * Return a top offset of the currently visible area. See also {@link #getViewportScrollBottom}.
     * 
     * @return {Number}
     */
    getViewportScrollTop : function () {
        return this.viewportScrollTop
    },
    
    
    /**
     * Return a bottom offset of the currently visible area. See also {@link #getViewportScrollTop}.
     * 
     * @return {Number}
     */
    getViewportScrollBottom : function () {
        return this.viewportScrollTop + this.viewportHeight - 1
    },
    
    
    /**
     * Return a height of the viewport
     * 
     * @return {Number}
     */
    getViewportHeight : function () {
        return this.viewportHeight
    },
    
    
    /**
     * Set a height of the viewport. May cause a change of the viewport's {@link #viewportScrollTop scroll top} position, if the visible area will go outside of the content area.
     * 
     * @param {Number} value New viewport height
     */
    setViewportHeight : function (value) {
        if (value != this.viewportHeight) {
            var delta                   = value - this.viewportHeight
            
            this.viewportHeight         = value
            
            var newViewportScrollBottom = this.getViewportScrollBottom()
            var visibleContainers       = this.visibleContainers
            
            if (delta < 0 && this.buffered) {
                this.cacheContainers(this.freeSpaceAtBottom())
                
                this.updateScrollRange(true)
                
                return
            }
            
            var contentScrollBottom     = this.getContentScrollBottom()
            
            // increasing within rendered content - do nothing
            if (newViewportScrollBottom <= contentScrollBottom) {
                this.updateScrollRange(true)
                
                return
            }
            
            var needMore                = delta - this.fillSpaceAtBottom(visibleContainers, newViewportScrollBottom - contentScrollBottom, null, contentScrollBottom + 1)
            
            if (needMore > 0) this.fillSpaceAtTop(visibleContainers, needMore, null, this.getContentScrollTop())
            
            this.updateScrollRange(true)
            
            this.verifyScrollPositionOutOfRange(true)
        }
    },
    
    
    updateScrollRange : function (scrollContainerChanged) {
        var minScrollRange          = Math.floor(this.getContentScrollTop() - this.getRecordsCountBeforeBuffer() * this.estimatedRowHeight)
        var maxScrollRange          = Math.ceil(this.getContentScrollBottom() + this.getRecordsCountAfterBuffer() * this.estimatedRowHeight)
        
        // in case of change in scroll container size - need to always refresh the scroller, because the 
        // "maxScrollPosition" (not to confuse with `maxScrollRange` is calculated as `maxScrollRange` - `containerSize`
        if (scrollContainerChanged || minScrollRange != this.minScrollRange || maxScrollRange != this.maxScrollRange) {
            this.minScrollRange     = minScrollRange
            this.maxScrollRange     = maxScrollRange
            
            // if we are being animated - no need to fire the `refresh` event of the scroller (which will just update the indicators)
            // indicators will be updated as part of the animation frame 
            this.fireRowAction('onScrollRangeChange', minScrollRange, maxScrollRange, this.isAnimating, scrollContainerChanged)
        }
    },
    
    
    /**
     * Returns a height of the currently rendered content. This method is cached and after 1st call will return the same value until the {@link #resetContentHeightCache} method is called. 
     * 
     * @return {Number} 
     */
    getContentHeight : function () {
        if (this.contentHeight !== null) return this.contentHeight

        var visibleContainers   = this.visibleContainers
        var contentHeight       = 0
        
        for (var i = 0; i < visibleContainers.length; i++) contentHeight += visibleContainers[ i ].row.height
        
        return this.contentHeight = contentHeight
    },
    
    
    /**
     * This method reset the cached content height value. See {@link #getContentHeight}.
     */
    resetContentHeightCache : function () {
        this.contentHeight = null
    },
    
    
    /**
     * This method generate and returns an array of rows - instances of {@link UberGrid.model.Row} class. 
     * 
     * @param {Number} [startAt] An index of the record in the store to start the generation from. Depending from the `bottomToTop` parameter can also mean the index to stop at. 
     * At least one or both of `startAt` and `endAt` should present, depending from the `fillHeight` parameter. 
     * @param {Number} [endAt] An index of the record in the store to end the generation at. Depending from the `bottomToTop` parameter can also mean the index to start from.
     * 
     * @param {Number} offsetTop In case of `bottomToTop = false`, a top offset of the 1st record the generation will start from.
     * In In case of `bottomToTop = true` a top offset of the record that would be placed immediately after the initial record.
     * 
     * @param {Boolean} bottomToTop Pass `false` to generate records in the top to bottom order. In this case `startAt` is a required parameter and
     * `endAt` is required only if `fillHeight` is not provided. Pass `true` to generate them from bottom to top. In the latter case `endAt` is a required parameter
     * (generation will start from `endAt` index) and `startAt` is only required if `fillHeight` is not provided.
     *  
     * @param {Number} fillHeight A content height that should be filled by records. If this parameter is given, one of the boundaries (`endAt` for `bottomToTop = false`
     * and `startAt` for `bottomToTop = true`) can be omitted. Note, that actually generated content may have slightly bigger height, but generation will stop as soon
     * as `fillHeight` height is accumulated.
     * 
     * @return {Array[ UberGrid.model.Row ]}
     */
    generateRows : function (startAt, endAt, offsetTop, bottomToTop, fillHeight) {
        var result              = []

        var store               = this.store
        var columns             = this.columns
        var leafs               = columns.getLeafs()
        
        var getRowCls           = this.getRowCls
        var getRowClsScope      = this.getRowClsScope || this
        
        var rowHeight           = this.rowHeight;

        var records             = store.data.items
        var recsLength          = records.length
        var leafsLen            = leafs.length
        
        if (startAt >= recsLength || endAt >= recsLength) return result
        
        offsetTop               = offsetTop || 0
        
        var rowsCache           = this.rowsCache
        
        var accumulatedHeight   = 0
        var hasBoundary         = bottomToTop ? startAt != null : endAt != null
        
        for (
            var rowIndex = bottomToTop ? endAt : startAt; 
            hasBoundary ? (bottomToTop ? rowIndex >= startAt : rowIndex <= endAt) : accumulatedHeight < fillHeight && rowIndex >= 0 && rowIndex < recsLength; 
            bottomToTop ? rowIndex-- : rowIndex++
        ) {
            var record          = records[ rowIndex ]
            
            var recordRow       = rowsCache[ record.internalId ]
            
            if (recordRow) {
                recordRow.setOffsetTop(bottomToTop ? offsetTop - recordRow.height : offsetTop)
            } else { 
                var columnsData     = []
    
                var thisRowHeight   = null
                
                for (var colIndex = 0; colIndex < leafsLen; colIndex++) {
                    var column      = leafs[ colIndex ];

                    // supports: rowHeight, cellAttr, cellCls, cellStyle
                    var meta        = { rowHeight : thisRowHeight }
                    var field       = column.field || column.dataIndex
                    
                    var value       = field ? record.data[ field ] : ''
    
                    var renderedValue   = null
    
                    if (column.renderer)
                        renderedValue       = column.renderer.call(
                            column.scope || this, 
                            value,
                            meta,
                            record,
                            rowIndex,
                            colIndex,
                            store,
                            column
                        )
    
                    value           = renderedValue != null ? renderedValue : value
                    
                    var cellAttr    = meta.cellAttr
                    if (cellAttr && typeof cellAttr !== 'string') cellAttr = this.attrObjectToString(cellAttr)
                    
                    var cellStyle   = meta.cellStyle
                    if (cellStyle && typeof cellStyle !== 'string') cellStyle = this.styleObjectToString(cellStyle)
                    
                    var cellStyleFromColumn = column.cellStyle
                    if (cellStyleFromColumn && typeof cellStyleFromColumn !== 'string') cellStyleFromColumn = this.styleObjectToString(cellStyleFromColumn)
                    
                    columnsData.push({
                        column      : column,
                        
                        value       : value != null ? value : '&nbsp;',
    
                        cellCls     : (column.cellCls || '') + ' ' + (meta.cellCls || ''),
                        cellStyle   : (cellStyleFromColumn || '') + ';' + (cellStyle || ''),
                        cellAttr    : cellAttr,
    
                        meta        : meta
                    })
                    
                    var metaRowHeight   = meta.rowHeight
                    
                    if (typeof metaRowHeight == 'number' && !isNaN(metaRowHeight) && (metaRowHeight > thisRowHeight || thisRowHeight == null)) thisRowHeight = metaRowHeight
                }
                
                if (thisRowHeight == null) thisRowHeight = rowHeight
            
                // `getRowCls` can also return "null/undefined"
                var rowCls      = (getRowCls ? getRowCls.call(getRowClsScope, record) : null) || ''
                
                recordRow       = new UberGrid.model.Row({
                    record      : record,
                    
                    columnsData : columnsData,
                    
                    offsetTop   : bottomToTop ? offsetTop - thisRowHeight : offsetTop,
                    cls         : rowCls + (this.stripeRows ? (rowIndex % 2 ? ' ubergrid-row-odd' : ' ubergrid-row-even') : ''),
                    
                    height      : thisRowHeight
                })
                
//                if (!this.buffered) rowsCache[ record.internalId ] = recordRow
            }
            
            var recordRowHeight = recordRow.height
            
            accumulatedHeight   += recordRowHeight
            
            if (bottomToTop) {
                offsetTop       -= recordRowHeight
                
                result.unshift(recordRow)
            } else {
                offsetTop       += recordRowHeight
            
                result.push(recordRow)
            }
        }
        
        if ((!this.rowHeightIsFixed || this.estimatedRowHeight == null) && result.length)
            if (this.rowHeightIsFixed)
                // one-time calculation
                this.estimatedRowHeight     = accumulatedHeight / result.length
            else {
                var estimationHistory       = this.estimationHistory
                
                if (estimationHistory.length > this.historyLimit) {
                    var previous                = estimationHistory.shift()
                    
                    this.totalHistoryCount  -= previous.count 
                    this.totalHistoryHeight -= previous.height
                }
                
                this.totalHistoryCount      += result.length
                this.totalHistoryHeight     += accumulatedHeight
                
                estimationHistory.push({
                    count       : result.length,
                    height      : accumulatedHeight
                })
                
                this.estimatedRowHeight     = this.totalHistoryHeight / this.totalHistoryCount
            }
        
        return result
    },
    
    
    freeSpaceAtTop : function () {
        var visibleContainers   = this.visibleContainers
        var freedContainers     = []
        
        for (var i = 0; i < visibleContainers.length; i++) {
            if (visibleContainers[ i ].row.offsetBottom < this.viewportScrollTop) {
                freedContainers.push(visibleContainers[ i ])
            } else {
                break;
            }
        }

        var freedLength             = freedContainers.length
                
        visibleContainers.splice(0, freedLength)
        
        this.bufferStartPoint       += freedLength
        
        if (freedLength) this.resetContentHeightCache()
        
        return freedContainers
    },
    
    
    freeSpaceAtBottom : function () {
        var visibleContainers   = this.visibleContainers
        var freedContainers     = []
        
        var viewportScrollBottom    = this.getViewportScrollBottom()
        
        for (var i = visibleContainers.length - 1; i >= 0; i--) 
            if (visibleContainers[ i ].row.offsetTop > viewportScrollBottom)
                freedContainers.push(visibleContainers[ i ])
            else
                break
                
        var freedLength             = freedContainers.length
                
        visibleContainers.length    -= freedLength
        
        this.bufferEndPoint         -= freedLength
        
        if (freedLength) this.resetContentHeightCache()
        
        return freedContainers
    },
    
    
    fillSpaceAtBottom : function (result, height, additionalContainersCache, contentScrollTop) {
        var containersCache     = this.containersCache
        
        var newRows             = this.generateRows(this.bufferEndPoint + 1, null, contentScrollTop, false, height)
        var newRowsLength       = newRows.length
        
        this.bufferEndPoint     += newRowsLength
        
        var accumulatedHeight   = 0
        
        for (var i = 0; i < newRowsLength; i++) {
            var container       = additionalContainersCache && additionalContainersCache.shift()
            
            if (!container) {
                if (containersCache.length)
                    container   = containersCache.pop()
                else
                    container = new UberGrid.model.Container({
                        tabularView     : this
                    })
            }
            
            result.push(container)
            
            container.setRow(newRows[ i ])
            
            accumulatedHeight   += newRows[ i ].height
        }
        
        if (newRowsLength) this.resetContentHeightCache()
        
        return accumulatedHeight
    },
    
    
    fillSpaceAtTop : function (result, height, additionalContainersCache, contentScrollTop) {
        var containersCache     = this.containersCache
        
        var newRows             = this.generateRows(null, this.bufferStartPoint - 1, contentScrollTop, true, height)
        var newRowsLength       = newRows.length
        
        this.bufferStartPoint   -= newRowsLength
        
        var accumulatedHeight   = 0
        
        for (var i = newRowsLength - 1; i >= 0; i--) {
            var container       = additionalContainersCache && additionalContainersCache.pop()
            
            if (!container) {
                if (containersCache.length)
                    container   = containersCache.pop()
                else
                    container = new UberGrid.model.Container({
                        tabularView     : this
                    })
            }
            
            result.unshift(container)
            
            container.setRow(newRows[ i ])
            
            accumulatedHeight   += newRows[ i ].height
        }
        
        if (newRowsLength) this.resetContentHeightCache()
        
        return accumulatedHeight
    },
    
    
    cacheContainers : function (containers) {
        for (var i = 0; i < containers.length; i++) containers[ i ].setRow(null)
        
        this.containersCache.push.apply(this.containersCache, containers)
    },
    
    
    removeContainers : function (containers) {
        for (var i = 0; i < containers.length; i++) containers[ i ].remove()
    },
    
    
    /**
     * This method performs a refresh of the currently rendered content.
     * 
     * @param {Object} params An object with following properties, all them are optional.
     * 
     * @param {Number} [params.viewportHeight] A new {@link #viewportHeight viewport height} value (will be changed during refresh). 
     * If not provided current viewport height will be used.
     * 
     * @param {Number} [params.bufferStartPoint] A new value for {@link #bufferStartPoint}. If not provided current value will be used. 
     * This value of this option is ignored for non-buffered rendering mode and always set to 0.
     * 
     * @param {Number} [params.contentScrollTop] A top offset to start the content from. If not provided {@link #getContentScrollTop current content top} offset will be used. 
     * 
     * @param {Boolean} [params.completeRefresh] Pass `true` to reset the scroll top position of the viewport (unless the `canMoveViewportIfNeeded` is disabled) 
     * and scroll the viewport to the beginning of the rendered content after refresh operation. If `false` is passed, tabular view will refresh the content w/o changing
     * a visible area offset. 
     * 
     * @param {Boolean} [params.canMoveViewportIfNeeded] Pass `true` if refresh operation is allowed to change the {@link #viewportScrollTop viewport top offset}. 
     */
    refresh : function (params) {
        params                      = params || {}
        
        var buffered                = this.buffered
        
        if (params.viewportHeight != null)      this.viewportHeight     = params.viewportHeight
        if (params.bufferStartPoint != null)    this.bufferStartPoint   = params.bufferStartPoint
        
        if (!buffered) this.bufferStartPoint   = 0
        
        var contentScrollTop        = params.contentScrollTop != null ? params.contentScrollTop : this.getContentScrollTop()
        // default to `true` if missing
        var canMoveViewportIfNeeded = params.canMoveViewportIfNeeded !== false
        
        // ignore current scrolling position
        var completeRefresh         = params.completeRefresh
        // eof init

        // `fillSpaceAtTop/Bottom` will only reset the cache if there were some rows generated
        // in case of empty store the height won't be reset
        this.resetContentHeightCache()
        
        this.isPopulated            = true
        
        var totalCount              = this.getTotalCount()
        var visibleContainers       = this.visibleContainers
        var viewportScrollTop       = this.viewportScrollTop
        
        this.bufferEndPoint         = this.bufferStartPoint - 1
        
        var newContainers           = []
        
        // if content starts a bit above of the visible area - need to add that adjustment to the viewport height
        var delta                   = completeRefresh ? 0 : viewportScrollTop - contentScrollTop
        var needToFill              = buffered ? this.viewportHeight + delta : Infinity 
        
        var filledHeight            = this.fillSpaceAtBottom(newContainers, needToFill, visibleContainers, contentScrollTop)
        
        if (filledHeight < needToFill) {
            // this 2 lines handles the case if buffer is outside of [ 0, totalCount ) range
            this.bufferEndPoint     = totalCount - 1
            this.bufferStartPoint   = totalCount - newContainers.length
            
            // if didn't have enough content after filling at the bottom and we are going to fill at top
            // we don't need the `delta` adjustment - compensating it
            this.fillSpaceAtTop(newContainers, needToFill - filledHeight - delta, visibleContainers, contentScrollTop)
            
            if (newContainers.length) {
                // only need to "stick" the content at the bottom in buffered case
                if (buffered) viewportScrollTop = newContainers[ newContainers.length - 1 ].row.offsetBottom - this.viewportHeight + 1
            } else {
                // empty store case
                viewportScrollTop   = 0
                
                this.visibleContainers  = newContainers
                this.cacheContainers(visibleContainers)
                
                this.updateScrollRange()
                
                if (!this.buffered) this.fireRowAction('onNonBufferedRefresh', this)
                
                if (canMoveViewportIfNeeded) this.scrollViewportTo(viewportScrollTop)

                this.fireEvent('refresh', this);
                return
            }
        } else 
            if (delta < 0) {
                this.fillSpaceAtTop(newContainers, -delta, visibleContainers, contentScrollTop)
            }
            
        this.visibleContainers  = newContainers
        this.cacheContainers(visibleContainers)
        
        // if there are some records before the buffer - all is fine
        // otherwise need need to "stick" the content to the top
        if (buffered && !this.getRecordsCountBeforeBuffer()) {
            var newContentScrollTop = newContainers[ 0 ].row.offsetTop
            
            if (viewportScrollTop < newContentScrollTop) viewportScrollTop = newContentScrollTop
        }
        
        this.updateScrollRange()
        
        if (!this.buffered) this.fireRowAction('onNonBufferedRefresh', this)
        
        if (canMoveViewportIfNeeded) {
            if (buffered) {
                this.scrollViewportTo(completeRefresh ? contentScrollTop : viewportScrollTop)
            } else {
                this.verifyScrollPositionOutOfRange()
            }
        }
        this.fireEvent('refresh', this);
    },
    
    
    /**
     * Scrolls the grid content to the top-most position. 
     */
    scrollToTop : function () {
        // TODO in non-buffered case just move the viewport w/o full refresh
        this.refresh({
            bufferStartPoint        : 0,
            contentScrollTop        : 0,
            
            completeRefresh         : true
        })
    },
    
    
    scrollToBottom : function () {
        throw "implement me"
    },
    
    
    /**
     * Call this method if you'd like to change the viewport position of the grid. This method basically
     * calls the {@link #moveViewportTo} and {@link #fireScrollAction fires} an `onTabularViewScroll` action
     * which will cause all attached grid bodies to update their scroll positions. 
     * 
     * @param {Number} newViewportScrollTop A new top offset of the visible area (of the viewport).
     */
    scrollViewportTo : function (newViewportScrollTop) {
        // TODO should we stop an animation in progress (if there's one) 
        this.moveViewportTo(newViewportScrollTop)
        
        this.fireScrollAction('onTabularViewScroll', this, newViewportScrollTop)
    },


    /**
     * @method moveViewportTo
     * 
     * Call this method to update the internal presentation of the model if the viewport was moved to a new position from the outside.
     * For example this method is repeatedly called while scroller performs an animated scrolling of the grid content.
     * 
     * Note this method does not cause the visual presentation of the grid to be updated - if you need to actually move the 
     * visible area of the grid - use {@link #scrollViewportTo} method.
     * 
     * @param {Number} newViewportScrollTop A new top offset of the visible area (of the viewport).
     */
    
    /** @ignore */
    moveViewportTo : function (newViewportScrollTop, isPostProcessing) {
//        console.log('SCROLL:' + newViewportScrollTop)
//        console.time('moveViewportTo')
        
//        var queue       = this.queue
//        
//        if (queue.isRunning && !isPostProcessing) {
//            // we are saving the new `viewportScrollTop` position, but marking it as not processed yet
//            // it will be processed when called with "isPostProcessing" flag
//            this.viewportScrollTop              = newViewportScrollTop
//            this.viewportScrollTopProcessed     = false
//            
////            console.log("external tick")
//            
//            if (queue.tickSource == 'external') queue.externalTick()
//            
////            console.timeEnd('moveViewportTo')
//            
//            return
//        }
        
        
        if (this.viewportScrollTop == newViewportScrollTop /*&& this.viewportScrollTopProcessed*/) return

        var me                      = this
        var delta                   = newViewportScrollTop - this.viewportScrollTop

        var totalCount              = this.getTotalCount()

        var viewportHeight          = this.viewportHeight
        var newViewportScrollBottom = newViewportScrollTop + viewportHeight - 1

        var contentScrollTop        = this.getContentScrollTop()
        var contentScrollBottom     = contentScrollTop + this.getContentHeight() - 1
        
        this.viewportScrollTop      = newViewportScrollTop
        
        if (
            // if scrolling withing the area of already rendered content - do nothing
            (newViewportScrollTop >= contentScrollTop && newViewportScrollBottom <= contentScrollBottom)
                ||
            (this.bufferStartPoint === 0 && newViewportScrollBottom <= contentScrollBottom)
                ||
            (this.bufferEndPoint === totalCount - 1 && newViewportScrollTop >= contentScrollTop)
                ||
            // buffer contains all records from dataset - (degenerated non-buffered case)
            (this.bufferEndPoint - this.bufferStartPoint + 1 == totalCount)
        ) {
//            console.log('safe move')
//            this.viewportScrollTopProcessed = true

//            console.timeEnd('moveViewportTo')
            
            return
        }
        
//        this.viewportScrollTopProcessed = false
        
        var containersCache         = this.containersCache
        var visibleContainers       = this.visibleContainers
        
        var freedContainers     

        // scrolling DOWN
        if (delta > 0) {
            if (newViewportScrollTop <= contentScrollBottom + 1) {
                freedContainers         = this.freeSpaceAtTop()
                
                this.fillSpaceAtBottom(visibleContainers, newViewportScrollBottom - contentScrollBottom, freedContainers, contentScrollBottom + 1)
                
                this.cacheContainers(freedContainers)
                
                this.updateScrollRange()
                
                return
            }
        } // eof scrolling DOWN
        else {
            // scrolling UP
            if (newViewportScrollBottom >= contentScrollTop - 1) {
                freedContainers     = this.freeSpaceAtBottom()
                
                this.fillSpaceAtTop(visibleContainers, contentScrollTop - newViewportScrollTop, freedContainers, contentScrollTop)
                
                this.cacheContainers(freedContainers)
                
                this.updateScrollRange()
                
                return
            }
        }
        // eof scrolling UP
        
        this.resetContentHeightCache()
        
        var newContentScrollTop = newViewportScrollTop
        
        var newBufferStartPoint = Math.floor((newContentScrollTop - this.minScrollRange) / this.estimatedRowHeight)
        
        // sanity checks this should not happen generally
        if (delta > 0 && newBufferStartPoint <= this.bufferEndPoint)    newBufferStartPoint    = this.bufferEndPoint + 1
        // doesn't make sense much, instead `refresh` should have a special mode to start from "end point" and fill content bottom->top then top->bottom
        if (delta < 0 && newBufferStartPoint >= this.bufferStartPoint)  newBufferStartPoint    = this.bufferStartPoint - 1
        
        this.refresh({
            bufferStartPoint        : newBufferStartPoint, 
            contentScrollTop        : this.rowHeightIsFixed ? newBufferStartPoint * this.estimatedRowHeight : newContentScrollTop,
            // this refresh is part of the move action
            // so it will be followed up by the "translate" and we don't need to move viewport 
            canMoveViewportIfNeeded : false
            // here we do not use `completeRefresh` since the content scroll top position is calculated to be "near" of 
            // the viewport scroll top position
        })
    },


    onAnimationFinished : function () {
        this.isAnimating        = false
        
        this.queue.switchToInternalTicks()
    },
    
    
    onAnimationStarted : function () {
        this.isAnimating        = true
        
        this.queue.switchToExternalTicks()
    },
    
    
    bindStore : function (store, skipRefresh) {
        var bindEvents = {
            addrecords      : this.onStoreAdd,
            removerecords   : this.onStoreRemove,
            updaterecord    : this.onStoreUpdate,
            clear           : this.onStoreClear,
            
//            load            : this.onStoreRefresh,
            sort            : this.onStoreRefresh,
            filter          : this.onStoreRefresh,
            refresh         : this.onStoreRefresh,
            scope           : this
        }

        var oldStore = this.store

        if (oldStore) oldStore.un(bindEvents)

        this.store = store

        if (store) {
            store.on(bindEvents)

            if (!skipRefresh) this.refresh({
                bufferStartPoint : 0,
                contentScrollTop : 0,
                completeRefresh  : true
            })
        }
    },
    
    
    onStoreRefresh : function () {
        if (!this.isPopulated) return
        if (this.queue.isRunning) this.queue.flush()
        
        this.refresh({
            canMoveViewportIfNeeded : !this.isAnimating
        })
    },


    onStoreAdd : function (store, records) {
        if (!this.isPopulated) return
        if (this.queue.isRunning) this.queue.flush()
        
        if (this.buffered)
            this.refresh({
                canMoveViewportIfNeeded : !this.isAnimating
            })
        else {
            var me                  = this
            
            var firstIndex          = store.indexOf(records[ 0 ])
            var count               = records.length
            
            this.bufferEndPoint     += count
            
            var newRows             = this.generateRows(firstIndex, firstIndex + count - 1)
            var newContainers       = []
            
            var newHeight           = 0
            
            newRows.forEach(function (row) {
                newHeight           += row.height
                
                newContainers.push(new UberGrid.model.Container({
                    tabularView     : me,
                    row             : row
                }))
            })
            
            var args                = [ firstIndex, 0 ].concat(newContainers)
            
            this.visibleContainers.splice.apply(this.visibleContainers, args)
            
            // updating the cached value directly
            this.contentHeight      += newHeight
            
            this.updateScrollRange()
            
            this.fireEvent('newrows', this, records, firstIndex, newContainers, newRows)
        }
        
        this.fireEvent('rowsadd', this, store, records)
    },
    
    
    getBoundViewportScrollTopPosition : function () {
        var viewportScrollTop       = this.viewportScrollTop
        
        var contentScrollBottom     = this.getContentScrollBottom()
        
        if (this.getViewportScrollBottom() > contentScrollBottom) viewportScrollTop = Math.max(this.getContentScrollTop(), contentScrollBottom - this.viewportHeight + 1)
        
        return viewportScrollTop
    },
    
    
    verifyScrollPositionOutOfRange : function (scrollAnyway) {
        var boundScrollTop          = this.getBoundViewportScrollTopPosition()
        
        if (scrollAnyway || boundScrollTop != this.viewportScrollTop) this.scrollViewportTo(boundScrollTop)
    },


    onStoreRemove : function (store, records, indicies) {
        if (!this.isPopulated) return
        if (this.queue.isRunning) this.queue.flush()
        
        var rowsCache   = this.rowsCache
        
        records.forEach(function (record) {
            delete rowsCache[ record.internalId ]
        })
        
        if (this.buffered)
            this.refresh({
                canMoveViewportIfNeeded : !this.isAnimating
            })
        else {
            var me                  = this
            var count               = records.length
            var visibleContainers   = this.visibleContainers
            
            this.bufferEndPoint     -= count
            
            var removedHeight       = 0
            
            indicies.forEach(function (index) {
                removedHeight       += visibleContainers[ index ].row.height
                
                visibleContainers.splice(index, 1)
            })
            
            // updating the cached value directly
            this.contentHeight      -= removedHeight
            
            this.updateScrollRange()
            
            this.fireEvent('removedrows', this, records, indicies)
            
            this.verifyScrollPositionOutOfRange()
        }
        
        this.fireEvent('rowsremove', this, store, records, indicies)
    },
    
    
    /**
     * Triggers a refresh of the passed row in the DOM.
     * 
     * Please note, that in buffered mode, refreshing a row which is not currently visible will basically does nothing.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of a record in the {@link #store} or the record instance itself.
     */
    refreshRow : function (recordIndex) {
        var record
        
        if (recordIndex instanceof Ext.data.Model) {
            record          = recordIndex
            recordIndex     = this.store.indexOf(record)
        } else {
            record          = this.store.getAt(recordIndex)
        }
        
        this.onStoreUpdate(this.store, record, recordIndex)
    },
    
    
    /**
     * This method sets a default row height value. Each row still may have an individual row height, 
     * using the "rowHeight" property of the column's {@link UberGrid.column.Column#renderer renderer}.
     * 
     * @param {Number} value New default row height
     */
    setRowHeight : function (value) {
        if (this.rowHeight != value) {
            this.rowHeight      = value
            
            this.refresh()
        } 
    },


    // this method should not use commented args, since they are not passed from `refreshRow` 
    onStoreUpdate : function (store, record, index/*, oldIndex, modifiedFieldNames, modifiedValues*/) {
        if (!this.isPopulated) return
        if (this.queue.isRunning) this.queue.flush();
        
        delete this.rowsCache[ record.internalId ]

        if (index < this.bufferStartPoint || index > this.bufferEndPoint) return
        
        var visibleContainers   = this.visibleContainers
        
        var ctIndex             = index - this.bufferStartPoint
        
        var oldRow              = visibleContainers[ ctIndex ].row
        var newRow              = this.generateRows(index, index, oldRow.offsetTop)[ 0 ]
        
        visibleContainers[ ctIndex ].setRow(newRow)
        
        this.resetContentHeightCache()
        
        if (this.buffered) {
            var heightDelta     = newRow.height - oldRow.height
            
            for (var i = ctIndex + 1; i < visibleContainers.length; i++) {
                visibleContainers[ i ].row.offsetTop        += heightDelta
                visibleContainers[ i ].row.offsetBottom     += heightDelta
            }
            
            var needMore        = this.getViewportScrollBottom() - this.getContentScrollBottom() 
            
            if (needMore > 0) {
                var evenMore    = needMore - this.fillSpaceAtBottom(visibleContainers, needMore, null, this.getContentScrollBottom() + 1)
                
                if (evenMore > 0) this.fillSpaceAtTop(visibleContainers, evenMore, null, this.getContentScrollTop())
                
            } else {
                this.cacheContainers(this.freeSpaceAtBottom())
            }
            
            this.updateScrollRange()
            
            this.verifyScrollPositionOutOfRange()
            
            this.fireEvent('row-offset-change', this, ctIndex + 1)
        } else {
            this.updateScrollRange()
            
            this.fireEvent('row-change', this, record, index, newRow)
            
            this.verifyScrollPositionOutOfRange()
        }
        
        this.fireEvent('rowupdate', this, store, record, index)
    },


    onStoreClear : function (store) {
        if (!this.isPopulated) return
        if (this.queue.isRunning) this.queue.flush()
        
        this.rowsCache      = {}
        
        this.refresh({
            bufferStartPoint        : 0,
            contentScrollTop        : 0,
            
            completeRefresh         : true
        })
    },
    
    
    /**
     * Adds a new observer for row actions. See also {@link #rowObservers} and {@link #fireRowAction}.
     * 
     * @param {Object} observer A new observer
     */
    addRowObserver : function (observer) {
        this.rowObservers.push(observer)
    },
    
    
    /**
     * Adds a new observer for scroll actions. See also {@link #scrollObservers} and {@link #fireScrollAction}.
     * 
     * @param {Object} observer A new observer
     */
    addScrollObserver : function (observer) {
        this.scrollObservers.push(observer)
    },
    
    
    /**
     * Fires a "row action". This method accept variable number of arguments. The 1st argument to this method should be a string, containing a method name.
     * This method will be called on all "row observers" added with {@link #addRowObserver} method (only if observer has that method). Method will be called
     * with exactly the same arguments as the `fireRowAction` itself, including the 1st argument with method name. This is done to avoid extra arguments processing.
     * 
     * For example:
     * 
    var observer = { 
        doProcessing : function (methodName, arg1, arg2) {
            // `methodName` will have value - 'doProcessing'
            // `arg1`       will have value - 1
            // `arg2`       will have value - 2
        }
    }
    
    tabularView.addRowObserver(observer)
    
    tabularView.fireRowAction('doProcessing', 1, 2)
    
     * 
     * @param {String} methodName
     */
    fireRowAction : function (methodName) {
        var rowObservers    = this.rowObservers
        
        for (var i = 0; i < rowObservers.length; i++) {
            var observer        = rowObservers[ i ]

            // do not modify arguments to avoid extra processing cost
            if (observer[ methodName ]) observer[ methodName ].apply(observer, arguments)
        }
    },
    
    
    /**
     * Fires a "scroll action". This method accept variable number of arguments. The 1st argument to this method should be a string, containing a method name.
     * This method will be called on all "scroll observers" added with {@link #addScrollObserver} method (only if observer has that method). Method will be called
     * with exactly the same arguments as the `fireScrollAction` itself, including the 1st argument with method name. This is done to avoid extra arguments processing.
     * 
     * For example:
     * 
    var observer = { 
        doProcessing : function (methodName, arg1, arg2) {
            // `methodName` will have value - 'doProcessing'
            // `arg1`       will have value - 1
            // `arg2`       will have value - 2
        }
    }
    
    tabularView.addScrollObserver(observer)
    
    tabularView.fireScrollAction('doProcessing', 1, 2)
    
     * 
     * @param {String} methodName
     */
    fireScrollAction : function (methodName) {
        var scrollObservers    = this.scrollObservers
        
        for (var i = 0; i < scrollObservers.length; i++) {
            var observer        = scrollObservers[ i ]

            // do not modify arguments to avoid extra processing cost
            if (!observer.suspendScroll && observer[ methodName ]) observer[ methodName ].apply(observer, arguments)
        }
    },
    

    destroy : function() {
        this.queue.flush()
        this.bindStore(null);
        this.callParent(arguments)
    }
});