/**
@class UberGrid.column.Column
@aside guide ubergrid_getting_started

This a base column class in UberGrid. Column in UberGrid is a model class - its instance does not have any reference to the visual presentation of the column.
All column headers are rendered as a whole by UberGrid.Header.

Usually the column definitions are provided as an array of column configuration objects or column instances. In case of configuration objects one can use
the `xclass` property to specify the desired class for the column.

    var ubergrid = new UberGrid.Panel({
        columns     : [
            {
                header      : 'Name',
                headerCls   : 'app-header-name',
                
                cellCls     : 'app-data-name',
                
                renderer    : function (value, meta, record, rowIndex, colIndex, store, column) { ... },
            },
            new UberGrid.column.Date({
                header      : 'Start date',
                field       : 'startDate'
            }),
            {
                xclass      : 'UberGrid.column.Date',
                header      : 'End date',
                field       : 'endDate'
            }
        ]
    })

When creating your own custom column, you can subclass this base column class easily. You can be notified of user actions on cells of your column too (see {@link #onCellXXX}):

    Ext.define('My.column.CoolColumn', {
        extend      : 'UberGrid.column.Column',

        width       : 50,

        constructor : function () {
            this.callParent(arguments)

            // Do cool stuff
        },

        onCellTap : function(record, rowIndex, grid, event) {

        },

        onCellTapHold : function(record, rowIndex, grid, event) {

        }
    });

*/
(function () {

    var ID      = 1;

    Ext.define('UberGrid.column.Column', {

        mixins          : {
            observable  : 'Ext.mixin.Observable',
            renderer    : 'UberGrid.mixin.Renderer'
        },

        /**
         * @cfg {String} headerCls
         *
         * A CSS class to be added to the header cell DOM element of this column. Can be a single class or several classes, separated with spaces.
         */
        headerCls       : null,

        /**
         * @cfg {String/Object} headerStyle
         *
         * A CSS style definition to be added to the header cell DOM element of this column. Can be a string or an object,
         * which keys will correspond to CSS propertis and values - to values of those properties.
         *
         * For example:
         *

    {
        headerStyle     : "background-color : red; color : green"
    }
    // same as
    {
        headerStyle     : { 'background-color' : 'red', color : 'green' }
    }
             */
        headerStyle     : null,
    // TODO
    //    headerAlign     : 'center',

        /**
         * @cfg {Function} headerRenderer
         *
         * A function to use for customized rendering of the header. It will receive the following arguments:
         *
         * - headerText - A result of {@link #getHeader} method.
         * - meta - An object that can be used for styling of the header cell. You can set the following properties on it,
         * which will be recognized by the column:
         *     - headerStyle    - A CSS style definition in addition to {@link #headerStyle}. Can be a simple string or an object
         *     with keys and values corresponding to CSS properties.
         *     - headerCls    - A CSS class declaration in addition to {@link #headerCls}. Can be a single class or several classes, separated with space.
         *     - headerAttr   - Additional attributes for the header DOM element. Can be a string of HTML-like format or an object. In the latter case
         *     keys will correspond to attribute names and values - to values.
         * - column - A column instance itself.
         *
         * Function should return an HTML string for a cell content or `null/undefined` to render the `headerText` value. A scope for this function can be
         * set with {@link #headerRendererScope}.
         *
         * For example:

    var ubergrid = new UberGrid.Panel({
        columns     : [
            {
                header  : 'Name',
                headerRenderer : function (header, meta, column) {
                    if (some_condition) {
                        meta.headerCls      = "app-column-bold-text";
                        
                        meta.headerStyle    = "background-color : red; color : green";
                        // same as
                        meta.headerStyle    = { 'background-color' : 'red', color : 'green' };
                        
                        meta.headerAttr     = 'gridId="' + ubergrid.getId() + '"'
                        // same as
                        meta.headerAttr     = { gridId : ubergrid.getId() }
                    }
                }
            }
        ]
    })

         */
        headerRenderer          : null,

        /**
         * @cfg {Object} headerRendererScope
         *
         * A scope to execute the {@link #headerRenderer} function with.
         */
        headerRendererScope     : null,

        /**
         * @cfg {String} cellCls
         *
         * A CSS class to be added to the data cell DOM elements for this column. Can be a single class or several classes, separated with spaces.
         */
        cellCls             : null,

        /**
         * @cfg {String/Object} cellStyle
         *
         * A CSS style definition to be added to the data cell DOM elements for this column. Can be a string or an object,
         * which keys will correspond to CSS propertis and values - to values of those properties.
         *
         * For example:
         *

    {
        cellStyle       : "background-color : red; color : green"
    }
    // same as
    {
        cellStyle       : { 'background-color' : 'red', color : 'green' }
    }
         */
        cellStyle           : null,
    // TODO
    //    align           : null,

        /**
         * @cfg {Function} renderer
         *
         * A function to use for customized rendering of the data cells of this column. It will receive the following arguments:
         *
         * - value - A value of this column's {@link #field} in the current record.
         * - meta - An object that can be used for styling of the data cell. You can set the following properties on it,
         * which will be recognized by the column:
         *     - cellStyle      - A CSS style definition to be added to {@link #cellStyle}. Can be a string or an object,
         *     which keys will correspond to CSS propertis and values - to values of properties.
         *     - cellCls        - A CSS class declaration in addition to {@link #cellCls}. Can be a single class or several classes, separated with space.
         *     - cellAttr       - Additional attributes for data cell DOM element. Can be a string of HTML-like format or an object. In the latter case
         *     keys will correspond to attribute names and values - to values.
         *     - rowHeight      - A row height. The biggest row height from all cells will be used. If none of columns set this property of the `meta` object
         *     a default value {@link UberGrid.Panel#rowHeight rowHeight} will be used.
         * - record - A record instance of the current row
         * - rowIndex - A row index
         * - colIndex - A column index of this column. Please note, that only "leaf" columns are used when counting this index. Also note, that this is a column index
         * in the initial {@link UberGrid.Panel#columns columns} config of the panel and not within the sub-grid.
         * - store - A store instance of grid
         * - column - A column instance itself
         *
         * Function should return a HTML string for the cell content or `null/undefined` to render the `value` from the record.
         * Scope for this function can be specified with the {@link #scope} config.
         * Note, that if value of record is `null/undefined` a non-breaking space `&nbsp;` will be used for cell content.
         *
         * For example:

    var ubergrid = new UberGrid.Panel({
        columns     : [
            {
                header      : 'Votes',
                field       : 'votes',
                renderer    : function (value, meta, record, rowIndex, colIndex, store, column) {
                    if (value < 0) {
                        meta.cellCls        = "app-column-votes-downvoted";
                        
                        meta.cellStyle      = "background-color : red; color : green";
                        // same as
                        meta.cellStyle      = { 'background-color' : 'red', color : 'green' };
                        
                        meta.cellAttr       = 'questionId="' + record.get('questionId') + '"'
                        // same as
                        meta.cellAttr       = { questionId : record.get('questionId') }
                    }
                }
            }
        ]
        
         */
        renderer        : null,

        /**
         * @cfg {Object} scope
         *
         * A scope to execute the {@link #renderer} function in.
         */
        scope           : null,

        /**
         * @cfg {Boolean} hidden Defines whether this column is hidden. See also {@link #hide}, {@link #show} and {@link #setHidden} methods.
         */
        hidden          : false,

        // synonyms
        /**
         * @cfg {String} text Header text. Synonym for {@link #header}. Use {@link #getHeader} method to get a normalized value of the header.
         */
        text            : null,

        /**
         * @cfg {String} header Header text. Has a synonym - {@link #text}. Use {@link #getHeader} method to get a normalized value of the header.
         */
        header          : null,

        // synonyms
        /**
         * @cfg {String} dataIndex Name of the field in the model to take the value from. Synonym for {@link #field}. Use {@link #getField} method to get a normalized value of the field name.
         */
        dataIndex       : null,

        /**
         * @cfg {String} field Name of the field in the model to take the value from. Has a synonym - {@link #dataIndex}. Use {@link #getField} method to get a normalized value of the field name.
         */
        field           : null,

        /**
         * @cfg {Boolean} sortable Defines whether this column is sortable. Tap on the header of sortable column will trigger a store sort by this column's {@link #field}.
         */
        sortable        : false,

        /**
         * @cfg {String} id A unique id for the column. Id has to be unique among all columns - including the columns from other grids. If not provided, an auto-generated id will be used.
         */
        id              : null,

        /**
         * @cfg {Number} flex A `flex` value used to calculate the width of the column. All columns with the width specified as `flex` property will share the remaining width after sizing columns
         * with specified `width` property. The actual width of `flex` columns is calculated proportionally to their `flex` values. Please refer to <a href="#!/guide/ubergrid_getting_started-section-8">Getting Started Guide</a>
         * for more info how column widths are calculated.
         */
        flex            : null,
        
        /**
         * @cfg {Number} defaultWidth Default width of the column. Will be used if column has no defined value neither for {@link #width} nor {@link #flex}.
         */
        defaultWidth    : 100,
        
        /**
         * @cfg {Number} width The width of the column in pixels. Takes priority over {@link #flex}. Please refer to <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a>
         * for more info how column widths are calculated.
         */
        width           : null,
        
        $width          : null,
        
        /**
         * @cfg {Number} minWidth A minium width to which a column with {@link #flex} width can be sized. Please refer to <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a>
         * for more info on how column widths are calculated.
         */
        minWidth        : 30,
        
        /**
         * @cfg {Number} maxWidth A maxium width to which a column with {@link #flex} width can be sized. Please refer to <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a>
         * for more info on how column widths are calculated.
         */
        maxWidth        : Infinity,

        /**
         * @cfg {Boolean} locked Whether this column is "locked" - belongs to "locked" section. Setting this option to `true` is equivalent to specifying the {@link #type} as "locked".
         */
        locked          : false,

        /**
         * @cfg {String} type The type of this column. Should be one of the strings: "normal/locked/right". Columns of the same type will be grouped together
         * in the grid "section" or "subgrid". Each grid section can be scrolled individually in horizontal direction, but vertical scrolling is synchronized among all sections.
         * Please refer to <a href="#!/guide/ubergrid_getting_started">Getting Started Guide</a> for more information.
         */
        type            : 'normal', // normal/locked/right

        /**
         * @property {UberGrid.column.Column} parent A parent column of this column. If this column is the root one this property will contain `null`.
         */
        parent          : null,

        /**
         * @cfg {Array[Object/UberGrid.column.Column]} children An array of child column config objects or column instances. If a column has some children columns then
         * it becomes a "group" column and will not generate data cells. Only "leaf" columns generate data cells.
         */
        children        : null,

        /**
         * @cfg {Function} onCellXXX A callback called any time a user interacts with the cells of this column. You can provide callbacks for
         * most user actions such as 'onCellTap', onCellTaphold', 'onCellSwipe' etc. The callback will be called with these params:
         *
         * - record The row record
         * - rowIndex The row index
         * - grid The grid panel,
         * - subGrid The subgrid
         * - event The event object
         *
         * Full list of events available for such callbacks: 'tap', 'singletap', 'doubletap', 'longpress', 'taphold', 'swipe', 'pinch', 'pinchstart', 'pinchend', 'rotate', 'rotatestart', 'rotateend'
         *
         */
        
        // cached
        $cachedDepth            : null,
        $cachedLeafs            : null,
        $cachedRefs             : null,
        $cachedLeafsOfType      : null,
        $cachedLeafOffsets      : null,

        // cache clearing should be cascaded or these properties should not be cached
        $firstLeafIndex         : null,
        $lastLeafIndex          : null,

        // whether this columns is a sub-root instance, created for sub grid
        isSubRoot               : false,


        constructor : function (config) {
            Ext.apply(this, config)

            if (!this.id) {
                this.id       = 'ubergrid-column-' + ID;
                ID++;
            }

            this.$cachedRefs            = {}
            this.$cachedLeafOffsets     = {}
            this.$cachedLeafsOfType     = {}

            var children    = this.children = this.children || []
            var me          = this

            Ext.each(children, function (child, index) {
                children[ index ] = me.normalizeColumn(child)
            })

            this.mixins.observable.constructor.call(this, config)

            /**
             * @event columnadd
             *
             * This event is fired when a child column of this column is added.
             *
             * @param {UberGrid.column.Column} column The added column
             */

            /**
             * @event columnremove
             *
             * This event is fired when a child column of this column is removed.
             *
             * @param {UberGrid.column.Column} column The removed column
             */

            /**
             * @event columnchange
             *
             * This event is fired when a structure of this column is changed - for example a child column is added / removed or moved to a different position.
             *
             * @param {UberGrid.column.Column} column The column which's structure has changed
             */
            /**
             * @event columnwidthchange
             *
             * This event is fired when a width of this column is changed - via {@link #setWidth} or {@link #setFlex} methods.
             *
             * @param {UberGrid.column.Column} column A column which's width has changed
             * @param {Number} width The new `width` value if any
             * @param {Number} flex The new `flex` value if any
             */
            this.on('columnchange', this.onColumnChange, this)
            this.on('columnwidthchange', this.onColumnwidthchange, this)
        },
        
        
        onColumnChange : function (column) {
            this.clearCache()
            
            var parent      = this.parent
            
            if (parent) parent.fireEvent('columnchange', column)
        },


        onColumnwidthchange : function (column) {
            this.clearCache()
            
            var parent      = this.parent
            
            if (parent) parent.fireEvent('columnwidthchange', column)
        },
        
        
        normalizeColumn : function (column) {
            if (!(column instanceof UberGrid.column.Column)) {
                var constructor     = column.xclass ? Ext.ClassManager.get(column.xclass) : UberGrid.column.Column

                if (!constructor) throw "Column class [" + column.xclass + "] not found"

                column              = new constructor(column)
            }

            // For event bubbling to work properly
            column.parent = this;

            return column
        },

        /**
         * Appends a new child column as the last child of this column
         * @param {UberGrid.column.Column/Object/Array} column The column (or object describing the columns), or an array of columns/objects, to append
         * @return {UberGrid.column.Column} column The inserted column(s)
         */
        appendColumn : function (column) {
            return this.insertColumn(this.children.length, column);
        },

        /**
         * Inserts a new child column at the specified position
         * @param {Int} index The position where to append the column
         * @param {UberGrid.column.Column/Object/Array} column The column (or object describing the columns), or an array of columns/objects, to append
         * @return {UberGrid.column.Column} column The inserted column(s)
         */
        insertColumn : function (index, column) {
            var me = this;

            if (Ext.isArray(column)) {
                column = column.map(function(col) {
                    return me.normalizeColumn(col);
                })
            } else {
                column = me.normalizeColumn(column);
            }

            Ext.Array.insert(this.children, index, Ext.isArray(column) ? column : [column]);

            this.fireEvent('columnadd', this, column);
            this.fireEvent('columnchange', this);

            return column;
        },

        moveColumn : function () {
            this.fireEvent('columnchange', this)
        },

        /**
         * Removes a child column of this column
         * @param {UberGrid.column.Column} column The column to remove
         */
        removeColumn : function (column) {
            Ext.Array.remove(this.children, column);

            this.fireEvent('columnremove', this, column);
            this.fireEvent('columnchange', this);
        },
        
        
        /**
         * Removes this column from it's parent children collection.
         */
        remove : function () {
            if (this.parent) this.parent.removeColumn(this)
        },


        /**
         * Hides this column. See also {@link #hidden} config, {@link #show} and {@link #setHidden} methods.
         */
        hide : function () {
            this.setHidden(true)
        },


        /**
         * Shows this column. See also {@link #hidden} config, {@link #hide} and {@link #setHidden} methods.
         */
        show : function () {
            this.setHidden(false)
        },

        /**
         * Hides or shows this column depending on the `hidden` parameter
         * @param {Boolean} hidden Pass `true` to hide the column and `false` to show it.
         */
        setHidden : function (hidden) {
            if (this.hidden != hidden) {
                this.hidden = hidden;
                this.fireEvent('columnchange', this)
            }
        },


        /**
         * Returns the {@link #flex} value of this column
         * @return {Number}
         */
        getFlex : function () {
            return this.flex
        },

        /**
         * Sets the {@link #flex} value of this column
         * @param {Number} value New flex value
         */
        setFlex : function (value) {
            if (this.width != value) {
                this.width = value;

                this.fireEvent('columnwidthchange', this, null, value)
            }
        },


        /**
         * Returns the current width of the column (not just {@link #width} config, but actually calculated current width, which for example is not known upfront for `flex` columns).
         * Return 0 for hidden columns.
         * @return {Number}
         */
        getWidth : function () {
            return this.hidden ? 0 : this.$width || this.width || this.defaultWidth;
        },


        /**
         * Sets a {@link #width} value of this column
         * @param {Number} value New width value
         */
        setWidth : function (newWidth) {
            if (this.width != newWidth) {
                this.width = newWidth;

                this.fireEvent('columnwidthchange', this, newWidth, null)
            }
        },


        distributeAvailableWidth : function (availableWidth) {
            var changedColumns      = []

            if (this.getMinimalFixedWidth() > availableWidth)
                this.forEachLeaf(function (leaf) {
                    var newWidth    = leaf.getMinimalFixedWidth()

                    if (newWidth != leaf.$width) changedColumns.push(leaf)

                    leaf.$width     = newWidth
                })
            else {
                var remainingWidth  = availableWidth
                var totalFlex       = 0

                this.forEachLeaf(function (leaf) {
                    // hidden columns does not participate in the
                    if (leaf.hidden) return
                    
                    if (leaf.width != null)
                        remainingWidth -= leaf.width
                    else if (leaf.flex != null)
                        totalFlex   += leaf.flex
                    else
                        remainingWidth -= leaf.defaultWidth
                })

                this.forEachLeaf(function (leaf) {
                    var newWidth

                    if (leaf.hidden) 
                        newWidth    = 0
                    else if (leaf.width != null)
                        newWidth    = leaf.width
                    else if (leaf.flex != null)
                        newWidth    = Ext.Number.constrain(Math.round(remainingWidth / totalFlex * leaf.flex), leaf.minWidth, leaf.maxWidth)
                    else
                        newWidth    = leaf.defaultWidth

                    if (newWidth != leaf.$width) changedColumns.push(leaf)

                    leaf.$width     = newWidth
                })
            }

            // clear cached data
            this.$cachedLeafOffsets = {};

            return changedColumns
        },


        getMinimalFixedWidth : function () {
            if (this.children.length) {
                var sum     = 0

                this.forEachLeaf(function (leaf) {
                    sum     += leaf.getMinimalFixedWidth()
                })

                return sum
            } else
                if (this.hidden) 
                    return 0
                else
                    return this.width != null ? this.width : (this.flex != null ? this.minWidth : this.defaultWidth)
        },


        removeAllColumns : function () {
            this.children   = []

            this.fireEvent('columnchange', this)
        },


        /**
         * Returns a root column of this column. If column itself is a root - a reference to itself is returned.
         *
         * @return {UberGrid.column.Column}
         */
        getRoot : function () {
            var root        = this

            while (root.parent) root = root.parent

            return root
        },


        /**
         * Returns a root column of the sub grid this column belongs to.
         *
         * @return {UberGrid.column.Column}
         */
        getSubGridRoot : function () {
            var subRoot     = this
            
            while (!subRoot.isSubRoot && subRoot.parent) subRoot = subRoot.parent

            return subRoot
        },


        /**
         * Returns an index of this column among all ubergrid's columns (including all subgrids).
         * This will be a "global" index. See also {@link #getLocalIndex}
         */
        getIndex : function () {
            return Ext.Array.indexOf(this.getRoot().getLeafs(), this.getLeafs()[ 0 ])
        },


        /**
         * Returns an index of this column among the columns of the subgrid, it belongs to.
         * This will be a "local" index. See also {@link #getIndex}
         */
        getLocalIndex : function () {
            return Ext.Array.indexOf(this.getSubGridRoot().getLeafs(), this.getLeafs()[ 0 ])
        },


        getFirstLeafIndex : function () {
            if (this.$firstLeafIndex !== null) return this.$firstLeafIndex

            return this.$firstLeafIndex = Ext.Array.indexOf(this.getRoot().getLeafs(), this.getLeafs()[ 0 ])
        },


        getLastLeafIndex : function () {
            if (this.$lastLeafIndex !== null) return this.$lastLeafIndex

            var myLeafs     = this.getLeafs()

            return this.$lastLeafIndex = Ext.Array.indexOf(this.getRoot().getLeafs(), myLeafs[ myLeafs.length - 1 ])
        },


        /**
         * This method clears internal cache for various methods. It is safe to call it at any time if you've modified some important properties of this column.
         */
        clearCache : function () {
            this.$cachedLeafsOfType     = {};
            this.$cachedRefs            = {};
            this.$cachedLeafOffsets     = {};
            
            delete this.$cachedDepth;
            this.$cachedLeafs           = null;

            delete this.$firstLeafIndex;
            delete this.$lastLeafIndex;
        },


        /**
         * Returns a "normalized" type of this column - a one of the strings "normal/locked/right". Type of the column can be specified with {@link #type} config or with {@link #locked} config.
         *
         * @return {String}
         */
        getType : function () {
            return this.locked ? 'locked' : this.type
        },


        groupChildrenByType : function () {
            var me              = this

            var parentsOfLockedById     = {}
            var parentsOfLocked         = []

            Ext.Array.forEach(this.getLeafsOfType('locked'), function (lockedLeaf) {
                while (lockedLeaf.parent != me) lockedLeaf = lockedLeaf.parent

                var id  = lockedLeaf.id

                if (!parentsOfLockedById[ id ]) {
                    parentsOfLockedById[ id ]   = true
                    parentsOfLocked.push(lockedLeaf)
                }
            })

            var parentsOfRightById      = {}
            var parentsOfRight          = []

            Ext.Array.forEach(this.getLeafsOfType('right'), function (rightLeaf) {
                while (rightLeaf.parent != me) rightLeaf = rightLeaf.parent

                var id  = rightLeaf.id

                if (!parentsOfRightById[ id ]) {
                    parentsOfRightById[ id ]    = true
                    parentsOfRight.push(rightLeaf)
                }
            })

            // no grouping happened
            if (!parentsOfLocked.length && !parentsOfRight.length) return null

            var parentsOfNormalById     = {}
            var parentsOfNormal         = []

            Ext.Array.forEach(this.getLeafsOfType('normal'), function (normalLeaf) {
                while (normalLeaf.parent != me) normalLeaf = normalLeaf.parent

                var id  = normalLeaf.id

                if (!parentsOfNormalById[ id ] && !parentsOfLockedById[ id ] && !parentsOfRightById[ id ]) {
                    parentsOfNormalById[ id ]   = true
                    parentsOfNormal.push(normalLeaf)
                }
            })

            if (!parentsOfNormal.length) throw "At least one `normal` column is required"

            this.children               = [].concat(
                parentsOfLocked.length ?
                    new this.self({
                        isSubRoot   : true,
                        id          : this.id + '-locked',
                        type        : 'locked',
                        parent      : this,
                        children    : parentsOfLocked
                    })
                :
                    parentsOfLocked,
                new this.self({
                    isSubRoot   : true,
                    id          : this.id + '-normal',
                    type        : 'normal',
                    parent      : this,
                    children    : parentsOfNormal
                }),
                parentsOfRight.length ?
                    new this.self({
                        isSubRoot   : true,
                        id          : this.id + '-right',
                        type        : 'right',
                        parent      : this,
                        children    : parentsOfRight
                    })
                :
                    parentsOfRight
            )

            this.clearCache()

            // column now contains top-level groups
            return {
                locked      : parentsOfLocked.length,
                normal      : parentsOfNormal.length,
                right       : parentsOfRight.length
            }
        },


        getLeafsOfType : function (type) {
            if (this.$cachedLeafsOfType[ type ]) return this.$cachedLeafsOfType[ type ]

            var thisMatchType       = this.getType() == type

            if (!this.children.length)      return this.$cachedLeafsOfType[ type ] = thisMatchType ? [ this ] : []

            if (thisMatchType)              return this.$cachedLeafsOfType[ type ] = this.getLeafs()

            var leafsOfType         = []

            this.forEachChild(function (child) {
                leafsOfType.push.apply(leafsOfType, child.getLeafsOfType(type))
            })

            return this.$cachedLeafsOfType[ type ] = leafsOfType
        },


        /**
         * Returns a child column with the given `id` or `null` if such column could not be found. If this column itself has a matching `id` then
         * this method returns reference to itself.
         *
         * @param {String} id An id of the column to find
         *
         * @return {UberGrid.column.Column}
         */
        getById : function (id) {
            if (this.$cachedRefs[ id ]) return this.$cachedRefs[ id ]

            var found = null

            this.cascade(function (column) {
                if (column.id == id) {
                    found = column

                    return false
                }
            })

            return this.$cachedRefs[ id ] = found
        },


        getDepthBelow : function () {
            if (this.$cachedDepth) return this.$cachedDepth

            if (!this.children.length) return this.$cachedDepth = 0

            var maxDepth = 0

            this.forEachChild(function (child) {
                var childDepth      = child.getDepthBelow()

                if (childDepth > maxDepth) maxDepth = childDepth
            })

            return this.$cachedDepth = 1 + maxDepth
        },


        /**
         * Returns an array of all "leaf" columns for this column (inlcuding nested ones). The returning value of this method is cached, so be careful not to modify it occasionally.
         *
         * @return {Array[UberGrid.column.Column]}
         */
        getLeafs : function () {
            if (this.$cachedLeafs) return this.$cachedLeafs

            if (!this.children.length) return this.$cachedLeafs = [ this ]

            var leafs = []

            this.forEachChild(function (child) {
                leafs.push.apply(leafs, child.getLeafs())
            })

            return this.$cachedLeafs = leafs
        },


        /**
         * This is an iterator for every "leaf" column which is direct or indirect child of this column. Returning `false` from the provided function will stop the iteration.
         *
         * @param {Function} func A function to execute for each child
         * @param {UberGrid.column.Column} func.column A "leaf" column instance
         * @param {Number} func.index An index of the "leaf" column.
         * @param {Object} scope A scope to execute the `func` in
         */
        forEachLeaf : function (func, scope) {
            return Ext.each(this.getLeafs(), func, scope)
        },


        /**
         * This is an iterator for every direct child of this column. Returning `false` from the provided function will stop the iteration.
         *
         * @param {Function} func A function to execute for each direct child
         * @param {UberGrid.column.Column} func.column A child column instance
         * @param {Number} func.index An index of the child column.
         * @param {Object} scope A scope to execute the `func` in
         */
        forEachChild : function (func, scope) {
            return Ext.each(this.children, func, scope)
        },


        /**
         * Returns a normalized value of the field name for this column - either a value of {@link #field} config or {@link #dataIndex}
         *
         * @return {String}
         */
        getField : function () {
            return this.field || this.dataIndex
        },


        /**
         * Returns a normalized value of the header text for this column - either a value of {@link #header} config or {@link #text}
         *
         * @return {String}
         */
        getHeader : function () {
            return this.header || this.text || ''
        },


        snapshotRenderData : function () {
            var totalDepth  = this.getDepthBelow()
            var rowsData    = []

            this.cascadeBreadth(function (column, depth) {
                // not interested in root
                if (!depth) return

                var rowIndex        = depth - 1

                if (!rowsData[ rowIndex ]) rowsData[ rowIndex ] = []

                var field           = column.getField()
                var headerStyle     = column.headerStyle

                if (headerStyle && typeof headerStyle != 'string') headerStyle = this.styleObjectToString(headerStyle)

                var headerText      = column.getHeader();
                // supports: headerCls, headerStyle, headerAttr
                var meta            = {}

                var headerAttr      = null

                if (column.headerRenderer) {
                    var renderedCaption     = column.headerRenderer.call(column.headerRendererScope || column, headerText, meta, column)

                    if (renderedCaption != null) headerText = renderedCaption

                    var metaHeaderStyle     = meta.headerStyle

                    if (metaHeaderStyle && typeof metaHeaderStyle != 'string') metaHeaderStyle = this.styleObjectToString(metaHeaderStyle)

                    headerStyle             = (headerStyle || '') + (headerStyle && metaHeaderStyle ? ';' : '') + (metaHeaderStyle || '')

                    headerAttr              = meta.headerAttr

                    if (headerAttr && typeof headerAttr != 'string') headerAttr = this.attrObjectToString(headerAttr)
                }

                var cls     = []

                if (column.headerCls)   cls.push(column.headerCls)
                if (meta.headerCls)     cls.push(meta.headerCls)
                if (field)              cls.push('ubergrid-header-column-' + field)

                cls.push('ubergrid-header-columnid-' + column.id)

                rowsData[ rowIndex ].push({
                    column      : column,

                    caption     : headerText,
                    field       : field,

                    cls         : cls.join(' '),
                    style       : headerStyle,
                    attr        : headerAttr,

                    colSpan     : column.getLeafs().length,
                    rowSpan     : column.getDepthBelow() ? 1 : totalDepth - depth + 1
                })
            })

            return rowsData
        },


        // TODO fit columns + test coverage!!
        getLeafOffset : function (leafIndex) {
            if (leafIndex instanceof UberGrid.column.Column) leafIndex  = leafIndex.getLocalIndex()
            
            if (this.$cachedLeafOffsets[ leafIndex ] != null) return this.$cachedLeafOffsets[ leafIndex ]

            var offset      = 0

            this.forEachLeaf(function (column, index) {
                if (index < leafIndex)
                    offset += column.getWidth()
                else
                    return false
            })

            return this.$cachedLeafOffsets[ leafIndex ] = offset
        },


        // TODO fit columns + test coverage!!
        gatherWidths : function () {
            var widths          = []

            Ext.each(this.getLeafs(), function (column) {
                widths.push(column.getWidth())
            })

            return widths
        },


        gatherLeafOffsets : function () {
            var offsets         = []
            var me              = this

            Ext.each(this.getLeafs(), function (column, index) {
                offsets.push(me.getLeafOffset(index))
            })

            return offsets
        },


        /**
         * Return a total width of all child columns of this column.
         *
         * @return {Number}
         */
        getTotalWidth : function () {
            return this.getLeafOffset(Infinity)
        },


        getBubbleTarget : function () {
            return this.parent
        },


        /**
         * This is an "in-depth" iterator for every child column of this column. Iterator starts from this column itself,
         * then goes to the 1st child, then to the 1st child of that child, etc. Basically every time there's a possibility to go to a more nested column,
         * this iterator does that. Returning `false` from the provided `func` will stop the iteration.
         *
         * @param {Function} func A function to execute for itself and each child
         * @param {UberGrid.column.Column} func.column A current column instance
         * @param {Object} scope A scope to execute the `func` in
         */
        cascade : function (func, scope) {
            if (func.call(scope || this, this) === false) return false

            this.forEachChild(function (child) {
                if (child.cascade(func, scope) === false) return false
            })
        },


        /**
         * This is an "in-breadth" iterator for every child column of this column. Iterator starts from this column itself,
         * then goes to all its direct children, and next their children. Basically every time when there's a possibility to continue iteration at the current nesting level
         * this iterator does that. Returning `false` from the provided `func` will stop the iteration.
         *
         * @param {Function} func A function to execute for itself and each child
         * @param {UberGrid.column.Column} func.column A current column instance
         * @param {Object} scope A scope to execute the `func` in
         */
        cascadeBreadth : function (func, scope) {
            if (func.call(scope || this, this, 0) === false) return false

            var queue           = this.children;
            var depth           = 1

            while (queue.length) {
                var newQueue    = []

                for (var i = 0; i < queue.length; i++) {
                    var column      = queue[ i ]

                    if (func.call(scope || this, column, depth) === false) return false

                    newQueue.push.apply(newQueue, column.children)
                }

                queue           = newQueue
                depth++
            }
        },


        destroy : function () {
            this.clearCache()

            this.forEachChild(function (child) {
                child.destroy()
            })

            this.callParent(arguments)
        },

        /**
         * Returns true if this column is a leaf column
         * @return {Boolean}
         */
        isLeaf : function() {
            return this.children.length === 0;
        },

        /**
         * Returns true if the column is hidden
         * @return {Boolean}
         */
        isHidden : function() {
            return this.hidden;
        }
    });

})();

