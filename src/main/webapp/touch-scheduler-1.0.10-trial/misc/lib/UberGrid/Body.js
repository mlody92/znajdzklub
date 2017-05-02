/**
@class UberGrid.Body
@aside guide ubergrid_getting_started

This class represents the body of the grid {@link UberGrid.SubGrid section}. Usually you don't need to instatiate it manually, as it will be done for you
by the {@link UberGrid.SubGrid section class}.

*/
Ext.define('UberGrid.Body', {

    extend      : 'Ext.Container',

    alias       : 'widget.UberGrid-Body',

    requires    : [
        'UberGrid.column.Column',
        'UberGrid.util.Scroller',
        'UberGrid.util.Translatable'
    ],
    
    mixins      : [
        'Ext.mixin.Bindable'
    ],

    /**
     * @property {UberGrid.column.Column} columns A root column for this section. Note, that it will only contain the columns of current grid section.  
     */
    columns             : null,
    
    /**
     * @property {Ext.data.Store} store A reference to the store of the main panel.  
     */
    store               : null,
    
    /**
     * @property {UberGrid.model.TabularView} tabularView A reference to the {@link UberGrid.model.TabularView tabular view} of the main panel.  
     */
    tabularView         : null,

    config : {
        /**
         * @ignore
         */
        baseCls             : 'ubergrid-bodycmp'
    },
    
    /**
     * @property {Ext.scroll.Scroller} scroller A reference to the scroller instance of this grid body. 
     */
    scroller            : null,

    /**
     * @property {Object} scrollConfig An object defining the scrollable behavior of the body.
     */
    scrollConfig        : null,

    suspendScroll       : false,

    baseIdColumns       : null,
    baseIdTotalWidth    : null,
    
    /**
     * @property {HTMLElement} canvas A native DOM element, serving as a container for the grid content.
     */
    canvas              : null,

    containerElements   : null,
    
    renderBuffer        : null,
    documentFragment    : null,
    
    columnLines         : true,
    stripeRows          : true,
    
    // avoid spaces around the elements - they create extra TextNodes in dom
    allRowsTplNonBuffered           : [
        '<table id="{baseIdTotalWidth}" class="ubergrid-table {tableCls}">',
            '<colgroup id={baseIdColumns}>',
                '<tpl for="columnsData">',
                    '<tpl if="!hidden">',
                        '<col class="ubergrid-column-{id}">',
                    '</tpl>',
                '</tpl>',
            '</colgroup>',

            '<tbody>',
                '<tpl for="containers">',
                    '<tr class="ubergrid-row {row.cls}" recordId="{row.recordInternalId}" style="height:{row.height}px">',
                        '{%',
                            'for (var i = parent.firstColumnIndex, lastColumn = parent.lastColumnIndex; i <= lastColumn; i++) {',
                                'var data = values.row.columnsData[ i ];',
                                'if (data.column.hidden) continue;',
                                'out.push(',
                                    '"<td class=\\"ubergrid-cell ubergrid-column-" + data.column.id + " " + (data.cellCls || "") + "\\" " + (data.cellAttr || "") + " style=\\"" + (data.cellStyle || "") + "\\">" + data.value + "</td>"',
                                ')',
                            '}',
                        '%}',
                    '</tr>',
                '</tpl>',
            '</tbody>',
        '</table>'
    ],
    
    rowsTplNonBuffered              : [
        '<tpl for="containers">',
            '<tr class="ubergrid-row {row.cls}" recordId="{row.recordInternalId}" style="height:{row.height}px">',
                '{%',
                    'for (var i = parent.firstColumnIndex, lastColumn = parent.lastColumnIndex; i <= lastColumn; i++) {',
                        'var data = values.row.columnsData[ i ];',
                        'if (data.column.hidden) continue;',
                        'out.push(',
                            '"<td class=\\"ubergrid-cell ubergrid-column-" + data.column.id + " " + (data.cellCls || "") + "\\" " + (data.cellAttr || "") + " style=\\"" + (data.cellStyle || "") + "\\">" + data.value + "</td>"',
                        ')',
                    '}',
                '%}',
            '</tr>',
        '</tpl>'
    ],
    
    rowTplBuffered                  : [
        '<div class="ubergrid-row {row.cls}" style="height:{row.height}px" recordId="{row.recordInternalId}">',
            '{%',
                'for (var i = values.firstColumnIndex, lastColumn = values.lastColumnIndex; i <= lastColumn; i++) {',
                    'var data = values.row.columnsData[ i ];',
                    'if (data.column.hidden) continue;',
                    'out.push(',
                        '"<div class=\\"ubergrid-cell ubergrid-column-" + data.column.id + " " + (data.cellCls || "") + "\\" " + (data.cellAttr || "") + " style=\\"" + (data.cellStyle || "") + "\\">" + data.value + "</div>"',
                    ')',
                '}',
            '%}',
        '</div>'
    ],
    
    rowTplNonBuffered               : [
        '<tr class="ubergrid-row {row.cls}" style="height:{row.height}px" recordId="{row.recordInternalId}">',
            '{%',
                'for (var i = values.firstColumnIndex, lastColumn = values.lastColumnIndex; i <= lastColumn; i++) {',
                    'var data = values.row.columnsData[ i ];',
                    'out.push(',
                        '"<td class=\\"ubergrid-cell ubergrid-column-" + data.column.id + " " + (data.cellCls || "") + "\\" " + (data.cellAttr || "") + " style=\\"" + (data.cellStyle || "") + "\\">" + data.value + "</td>"',
                    ')',
                '}',
            '%}',
        '</tr>'
    ],
    


    initialize : function () {
        var config      = this.config
        
        // was known as Ext.apply(this, config) previously
        for (var name in config) {
            if (config.hasOwnProperty(name) && name !== 'xtype' && name !== 'xclass' && !this.hasConfig(name)) {
                this[ name ] = config[ name ];
            }
        }
        
        this.allRowsTplNonBuffered  = new Ext.XTemplate(this.allRowsTplNonBuffered)
        this.rowsTplNonBuffered     = new Ext.XTemplate(this.rowsTplNonBuffered)
        this.rowTplBuffered         = new Ext.XTemplate(this.rowTplBuffered)
        this.rowTplNonBuffered      = new Ext.XTemplate(this.rowTplNonBuffered)
        
        var columns                 = this.columns
        var tabularView             = this.tabularView
        var buffered                = tabularView.buffered
        var scrollConfig            = Ext.apply({
            xclass          : 'UberGrid.util.Scroller',
            direction       : 'both',
            // prevents a 2 resize monitors for every simple grid
            autoRefresh     : false,
            translatable    : {
                // force CssTransform on Android
                xclass      : buffered ? 'UberGrid.util.Translatable' : 'Ext.util.translatable.CssTransform'
            }
        }, this.scrollConfig);

        this.setScrollable(scrollConfig)

        if (!(columns instanceof UberGrid.column.Column))      throw "`columns` attribute for `UberGrid.Body` should be an instance of `UberGrid.column.Column`";
        if (!this.store)                throw "`store` attribute is required for `UberGrid.Body`";
        if (!tabularView)               throw "`tabularView` attribute is required for `UberGrid.Body`";
        
        this.callParent()
        
        this.renderBuffer           = document.createElement('tbody')
        this.documentFragment       = document.createDocumentFragment()
        this.containerElements      = {}

        // now the scroller will bubble up (directly to our parent) the additional `scroll-animation-start` and `scroll-animation-end` events
        this.patchScroller(this.getScroller())

        this.enableBubble('dragstart')
        
        var innerHtmlElement        = this.getInnerHtmlElement()
        
        if (buffered) innerHtmlElement.setId(this.baseIdColumns)
        
        this.canvas                 = innerHtmlElement.dom
        
        if (!this.columnLines && buffered) innerHtmlElement.addCls('ubergrid-no-column-lines')

        this.addCls('ubergrid-buffered-' + (buffered ? 'on' : 'off'));

        if (this.stripeRows) {
            innerHtmlElement.addCls('ubergrid-body-striperows');
        }

        innerHtmlElement.on('dragstart', this.onDragStart, this)
        
        tabularView.addRowObserver(this)
        tabularView.addScrollObserver(this)
        
        tabularView.on({
            'row-offset-change'             : this.onRowOffsetChange,
            
            // non-buffered listeners
            'row-change'                    : this.onRowChange,
            'newrows'                       : this.onNewRows,
            'removedrows'                   : this.onRemovedRows,
            
            scope                           : this
        })
        
        columns.on('columnwidthchange', this.onColumnWidthChange, this)
    },
    
    
    onDragStart : function (event, domNode) {
        this.fireEvent('dragstart', this, event, domNode)
    },
    
    
    onColumnWidthChange : function () {
        this.getScroller().setHorizontalScrollRange(this.columns.getTotalWidth())
    },
    
    
    refreshScroller : function () {
        this.getScroller().setScrollRange(this.tabularView.minScrollRange, this.tabularView.maxScrollRange, this.columns.getTotalWidth(), false, true)
    },
    
    
    // ROW OBSERVING LISTENERS
//    onColumnIndicesRequested : function (methodName, result) {
//        result.push({
//            firstColumnIndex        : this.columns.getFirstLeafIndex(),
//            lastColumnIndex         : this.columns.getLastLeafIndex()
//        })
//    },
    
    
    onContainerRemoved : function (methodName, container) {
        var containerEl             = this.containerElements[ container.id ]
        
        containerEl.parentNode.removeChild(containerEl)
    },
    
    
    onNewContainer : function (methodName, container) {
        var containerEl             = this.containerElements[ container.id ] = document.createElement('div')
        
        containerEl.className       = 'ubergrid-rowcontainer'
        
        this.canvas.appendChild(containerEl)
    },
    
    
    onContainerSetRow : function (methodName, container, row) {
        var containerEl             = this.containerElements[ container.id ]
        
        if (row) {
//            var firstColumnIndex    = this.columns.getFirstLeafIndex()
//            var lastColumnIndex     = this.columns.getLastLeafIndex()
            
//            var rowDomCache         = row.domCache[ firstColumnIndex + '/' + lastColumnIndex ]
//            
//            if (rowDomCache) {
////                console.log('using cache')
//                
//                if (containerEl.children.length)
//                    containerEl.replaceChild(rowDomCache, containerEl.children[ 0 ])
//                else
//                    containerEl.appendChild(rowDomCache)
//            } else 
                containerEl.innerHTML   = this.renderRowBuffered(row, this.columns)
        } else {
            Ext.fly(containerEl).translate(0, -10000, 0);
            containerEl.innerHTML = '';
        }
    },
    
    
    onRowOffsetChange : function (tabularView, startingCtIndex) {
        this.suspendScroll  = true
        
        // TODO possible (micro) optimization - update the offset of containers starting from "startingCtIndex" only
        this.scroller.translateSame()
        
        this.suspendScroll  = false
    },
    
    
    onScrollRangeChange : function (methodName, minScrollRange, maxScrollRange, skipScrollerRefresh, scrollContainerChanged) {
        this.getScroller().setScrollRange(minScrollRange, maxScrollRange, this.columns.getTotalWidth(), skipScrollerRefresh, scrollContainerChanged)
    },

    
    onTabularViewScroll : function (methodName, tabularView, viewportScrollTop) {
        this.suspendScroll  = true
        
        // should we use "scrollToY" here to cause the `scroll` event and update the indicators?
        // when using `scrollToY` here though the initial translation in buffered mode does not happen 
        // (since scroller position is the same) 
        this.scroller.translateY(-viewportScrollTop)
        
        this.suspendScroll  = false
    },
    
    
    onUserBodyTranslate : function (methodName, x, y, sourceBody) {
        if (this.suspendScroll) return
        
        this.suspendScroll  = true
        
        // using "translateY" here to avoid the `scroll` event and update of the indicators
        this.scroller.translateY(y)
        
        this.suspendScroll  = false
    },
    
    
    onNonBufferedRefresh : function (methodName, tabularView) {
        this.canvas.innerHTML   = this.renderAllRowsNonBuffered(this.columns, this.baseIdColumns, this.baseIdTotalWidth)
    },
    // EOF ROW OBSERVING LISTENERS
    
    
    // NON-BUFFERED LISTENERS
    onRowChange : function (tabularView, record, index, row) {
        this.renderBuffer.innerHTML     = this.renderRowNonBuffered(row, this.columns)
        
        var tBody                       = this.canvas.children[ 0 ].tBodies[ 0 ]
        
        tBody.replaceChild(this.renderBuffer.children[ 0 ], tBody.children[ index ])
    },
    
    
    onNewRows : function (tabularView, records, firstIndex, newContainers) {
        var renderBuffer                = this.renderBuffer
        
        renderBuffer.innerHTML          = this.renderRowsNonBuffered(newContainers, this.columns)
        
        var tBody                       = this.canvas.children[ 0 ].tBodies[ 0 ]
        
        if (records.length == 1)
            tBody.insertBefore(renderBuffer.children[ 0 ], tBody.children[ firstIndex ])
        else {
            var documentFragment        = this.documentFragment
            
            while (renderBuffer.children.length) documentFragment.appendChild(renderBuffer.children[ 0 ])
            
            tBody.insertBefore(documentFragment, tBody.children[ firstIndex ])
        }
    },
    
    onRemovedRows : function (tabularView, records, indicies) {
        var tBody       = this.canvas.children[ 0 ].tBodies[ 0 ]

        indicies.forEach(function (index) {
            tBody.removeChild(tBody.children[ index ])
        })
    },
    // EOF NON-BUFFERED LISTENERS    
    
    
    beforeTranslate : function (x, y) {
        if (this.suspendScroll) return
        
        this.tabularView.moveViewportTo(-y)
        
        this.suspendScroll  = true
        
        this.tabularView.fireScrollAction('onUserBodyTranslate', x, y, this)
        
        this.suspendScroll  = false
    },
    
    
    patchScroller : function (scroller) {
        var me      = this
        
        scroller.enableBubble('scroll-animation-start', 'scroll-animation-end', 'scroll-idle')
        
        scroller.getBubbleTarget = function () {
            return me.parent
        }
        
        var translatable            = scroller.getTranslatable()
        
        translatable.body           = this
        translatable.tabularView    = this.tabularView
        
        var touchEndTimeout
        
        translatable.on({
            // we need the "animationstart/end" events and not just "scrollstart" because we need to switch the queue to external/internal ticks
            animationstart      : function () { scroller.fireEvent('scroll-animation-start', scroller) },
            animationend        : function () { 
                scroller.fireEvent('scroll-animation-end', scroller)
                
                clearTimeout(touchEndTimeout)
                
                touchEndTimeout = setTimeout(function () {
                    if (!scroller.isDragging && !translatable.isAnimating) scroller.fireEvent('scroll-idle', scroller)
                }, 150)
            }
        })
        
        this.bind(translatable, 'doTranslate', 'beforeTranslate');
    },


    getBubbleTarget: function () {
        return this.parent
    },


    /**
     * Returns a scroller instance of this grid body.
     * 
     * @return {Ext.scroll.Scroller} 
     */
    getScroller : function () {
        if (this.scroller) return this.scroller
        
        return this.scroller = this.getScrollableBehavior().getScrollView().getScroller()
    },
    
    
    /**
     * Returns the current "logical" scroll position of this grid body. Please note, that in buffered rendering mode, it can be different from the `position` property of the scroller,
     * because of a variable row height. You should generally always use this method for getting the scroll position.
     * 
     * @return {Object} An object with logical left / top scroll offset
     * @return {Number} return.left A logical left scroll offset
     * @return {Number} return.top A logical top scroll offset
     */
    getViewportScroll : function () {
        var scroller    = this.scroller
        
        return {
            left        : scroller.position.x,
            top         : scroller.position.y - scroller.getMinPosition().y
        }
    },
    
    
    renderRowsNonBuffered : function (containers, columns) {
        return this.rowsTplNonBuffered.apply({
            containers          : containers,
            
            widths              : columns.gatherWidths(),
            totalWidth          : columns.getTotalWidth(),
            
            firstColumnIndex    : columns.getFirstLeafIndex(),
            lastColumnIndex     : columns.getLastLeafIndex()
        })
    },

    
    renderAllRowsNonBuffered : function (columns, baseIdColumns, baseIdTotalWidth) {
        var columnsData     = []
        
        columns.forEachLeaf(function (column) {
            columnsData.push({
                id      : column.id,
                hidden  : column.hidden,
                width   : column.getWidth()
            })
        })
        
        return this.allRowsTplNonBuffered.apply({
            containers          : this.tabularView.visibleContainers,
            
            tableCls            : this.columnLines ? '' : 'ubergrid-no-column-lines',
            
            columnsData         : columnsData,
            baseIdColumns       : baseIdColumns,
            baseIdTotalWidth    : baseIdTotalWidth,
            
            totalWidth          : columns.getTotalWidth(),
            
            firstColumnIndex    : columns.getFirstLeafIndex(),
            lastColumnIndex     : columns.getLastLeafIndex()
        })
    },
    
    
    renderRowNonBuffered : function (row, columns) {
        return this.rowTplNonBuffered.apply({
            row                 : row,
            
            firstColumnIndex    : columns.getFirstLeafIndex(),
            lastColumnIndex     : columns.getLastLeafIndex()
        })
    },
    
    
    renderRowBuffered : function (row, columns) {
        return this.rowTplBuffered.apply({
            row                 : row,
            
            firstColumnIndex    : columns.getFirstLeafIndex(),
            lastColumnIndex     : columns.getLastLeafIndex()
        })
    },
    
    
    /**
     * Returns a dom element of some record's row or `null` if it can not be found.
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of the record in the {@link #store} or the record instance itself. 
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element. 
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getRow : function (recordIndex, returnElement) {
        var record      = recordIndex instanceof Ext.data.Model ? recordIndex : this.store.getAt(recordIndex)
        
        if (!record) return null
        
        var rowEl       = Ext.DomQuery.select('.ubergrid-row[recordId="' + record.internalId + '"]', this.canvas)[ 0 ]
        
        return returnElement ? Ext.get(rowEl) : rowEl 
    },
    
    
    /**
     * Returns a DOM element for a cell in this sub grid or `null` if it can not be found.
     * 
     * Note, that in buffered rendering mode, only currently visible area is present in the DOM.
     * 
     * @param {Number/Ext.data.Model} recordOrIndex An index of the record in the {@link #store} or the record instance itself.
     * @param {Number/String/UberGrid.column.Column} cellIndex Can be a number - index of column **between all columns of this subgrid only**, 
     * a string with column {@link UberGrid.column.Column#id id} or a column instance itself.
     * @param {Boolean} [returnElement=false] Pass `true` to return an Ext.dom.Element instance instead of a native DOM element.
     * 
     * @return {HTMLElement|Ext.dom.Element}
     */
    getCell : function (rowIndex, cellIndex, returnElement) {
        var row = this.getRow(rowIndex);
        
        if (row) {
            var columns     = this.columns
            
            if (typeof cellIndex == 'string')                   cellIndex   = columns.getById(cellIndex)
            
            if (cellIndex instanceof UberGrid.column.Column)    cellIndex   = cellIndex.getLocalIndex()
            
            var cell = row.childNodes[ cellIndex ];
            
            return returnElement ? Ext.get(cell) : cell;
        }
        
        return null
    },

    
    destroy : function () {
        // just in case (IE is on the mobile scene already)
        this.renderBuffer   = this.documentFragment = null
        
        this.callParent(arguments)
    }
    
});