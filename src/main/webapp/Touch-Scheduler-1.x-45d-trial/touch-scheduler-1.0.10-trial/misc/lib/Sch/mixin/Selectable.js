/**
 * A class keeping track of which event records are currently selected in the scheduler.
 * @private
 */
Ext.define('Sch.mixin.Selectable', {
    extend: 'Ext.mixin.Mixin',

    mixinConfig: {
        id: 'sch_selectable',
        hooks: {
            updateStore: 'updateStore'
        }
    },

    /**
     * @event selectionchange
     * Fires when a selection changes
     * @param {Sch.mixin.Selectable} this
     * @param {Sch.data.Event[]} records The event records
     */

    config: {
        /**
         * @cfg {Boolean} disableSelection <p><tt>true</tt> to disable selection.
         * This configuration will lock the selection model that the Scheduler uses.</p>
         * @accessor
         */
        disableSelection: null,

        /**
         * @cfg {String} mode
         * Modes of selection.
         * Valid values are SINGLE, SIMPLE, and MULTI. Defaults to 'SINGLE'
         * @accessor
         */
        selectionMode: 'SINGLE',

        /**
         * @cfg {Boolean} allowDeselect
         * Allow users to deselect a record in a Scheduler. Only applicable when the Selectable's mode is
         * 'SINGLE'. Defaults to false.
         * @accessor
         */
        allowDeselect: false,

        /**
         * @cfg {Sch.model.Event} lastSelected
         * @private
         * @accessor
         */
        lastSelected: null,

        /**
         * @cfg {Sch.model.Event} lastFocused
         * @private
         * @accessor
         */
        lastFocused: null,

        /**
         * @cfg {Boolean} deselectOnContainerClick True to deselect current selection when the container body is
         * clicked. Defaults to true
         * @accessor
         */
        deselectOnContainerClick: true
    },

    modes: {
        SINGLE  : true,
        SIMPLE  : true,
        MULTI   : true
    },

    selectableEventHooks: {
        addrecords      : 'onSelectionStoreAdd',
        removerecords   : 'onSelectionStoreRemove',
        updaterecord    : 'onSelectionStoreUpdate',
        load            : 'refreshSelection',
        refresh         : 'refreshSelection'
    },

    constructor: function() {
        this.selected = new Ext.util.MixedCollection();
        this.callParent(arguments);
    },

    /**
     * @private
     */
    applySelectionMode: function(mode) {
        mode = mode ? mode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        return this.modes[mode] ? mode : 'SINGLE';
    },

    /**
     * @private
     */
    updateStore: function(newStore, oldStore) {
        var me = this,
            bindEvents = Ext.apply({}, me.selectableEventHooks, { scope: me });

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
            else {
                oldStore.un(bindEvents);
            }
        }

        if (newStore) {
            newStore.on(bindEvents);
            me.refreshSelection();
        }
    },

    /**
     * Selects all records.
     * @param {Boolean} silent True to suppress all select events.
     */
    selectAll: function(silent) {
        var me = this,
            selections = me.getEventStore().getRange(),
            ln = selections.length,
            i = 0;
        for (; i < ln; i++) {
            me.select(selections[i], true, silent);
        }
    },

    /**
     * Deselects all records.
     */
    deselectAll: function(supress) {
        var me = this,
            selections = me.getEventStore().getRange();

        me.deselect(selections, supress);

        me.selected.clear();
        me.setLastSelected(null);
        me.setLastFocused(null);
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes.
    selectWithEvent: function(record) {
        var me = this,
            isSelected = me.isSelected(record);
        switch (me.getSelectionMode()) {
            case 'MULTI':
            case 'SIMPLE':
                if (isSelected) {
                    me.deselect(record);
                }
                else {
                    me.select(record, true);
                }
                break;
            case 'SINGLE':
                if (me.getAllowDeselect() && isSelected) {
                    // if allowDeselect is on and this record isSelected, deselect it
                    me.deselect(record);
                } else {
                    // select the record and do NOT maintain existing selections
                    me.select(record, false);
                }
                break;
        }
    },

    /**
     * Adds the given records to the currently selected set
     * @param {Sch.model.Event/Array/Number} records The records to select
     * @param {Boolean} keepExisting If true, the existing selection will be added to (if not, the old selection is replaced)
     * @param {Boolean} suppressEvent If true, the 'select' event will not be fired
     */
    select: function(records, keepExisting, suppressEvent) {
        var me = this,
            record;

        if (me.getDisableSelection()) {
            return;
        }

        if (typeof records === "number") {
            records = [me.getEventStore().getAt(records)];
        }

        if (!records) {
            return;
        }

        if (me.getSelectionMode() == "SINGLE" && records) {
            record = records.length ? records[0] : records;
            me.doSingleSelect(record, suppressEvent);
        } else {
            me.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    /**
     * Selects a single record
     * @private
     */
    doSingleSelect: function(record, suppressEvent) {
        var me = this,
            selected = me.selected;

        if (me.getDisableSelection()) {
            return;
        }

        // already selected.
        // should we also check beforeselect?
        if (me.isSelected(record)) {
            return;
        }

        if (selected.getCount() > 0) {
            me.deselect(me.getLastSelected(), suppressEvent);
        }

        selected.add(record);
        me.setLastSelected(record);
        me.onItemSelect(record, suppressEvent);
        me.setLastFocused(record);

        if (!suppressEvent) {
            me.fireSelectionChange([record]);
        }
    },

    /**
     * Selects a set of multiple records
     * @private
     */
    doMultiSelect: function(records, keepExisting, suppressEvent) {
        if (records === null || this.getDisableSelection()) {
            return;
        }
        records = !Ext.isArray(records) ? [records] : records;

        var me = this,
            selected = me.selected,
            ln = records.length,
            change = false,
            i = 0,
            record;

        if (!keepExisting && selected.getCount() > 0) {
            change = true;
            me.deselect(me.getSelection(), true);
        }
        for (; i < ln; i++) {
            record = records[i];
            if (keepExisting && me.isSelected(record)) {
                continue;
            }
            change = true;
            me.setLastSelected(record);
            selected.add(record);
            if (!suppressEvent) {
                me.setLastFocused(record);
            }

            me.onItemSelect(record, suppressEvent);
        }
        if (change && !suppressEvent) {
            this.fireSelectionChange(records);
        }
    },

    /**
     * Deselects the given record(s). If many records are currently selected, it will only deselect those you pass in.
     * @param {Number/Array/Sch.model.Event} records The record(s) to deselect. Can also be a number to reference by index
     * @param {Boolean} suppressEvent If true the deselect event will not be fired
     */
    deselect: function(records, suppressEvent) {
        var me = this;

        if (me.getDisableSelection()) {
            return;
        }

        records = Ext.isArray(records) ? records : [records];

        var selected = me.selected,
            change   = false,
            i        = 0,
            store    = me.getEventStore(),
            ln       = records.length,
            record;

        for (; i < ln; i++) {
            record = records[i];

            if (typeof record === 'number') {
                record = store.getAt(record);
            }

            if (selected.remove(record)) {
                if (me.getLastSelected() == record) {
                    me.setLastSelected(selected.last());
                }
                change = true;
            }
            if (record) {
                me.onItemDeselect(record, suppressEvent);
            }
        }

        if (change && !suppressEvent) {
            me.fireSelectionChange(records);
        }
    },

    /**
     * Sets a record as the last focused record. This does NOT mean
     * that the record has been selected.
     * @param {Ext.data.Record} newRecord
     * @param {Ext.data.Record} oldRecord
     */
    updateLastFocused: function(newRecord, oldRecord) {
        this.onLastFocusChanged(oldRecord, newRecord);
    },

    fireSelectionChange: function(records) {
        var me = this;
            me.fireAction('selectionchange', [me, records], 'getSelection');
    },

    /**
     * Returns an array of the currently selected records.
     * @return {Array} An array of selected records
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns <tt>true</tt> if the specified event is selected.
     * @param {Sch.model.Event/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.getEventStore().getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },

    /**
     * Returns true if there is a selected event record.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    /**
     * @private
     */
    refreshSelection: function() {
        var me = this,
            selections = me.getSelection();

        me.deselectAll(true);
        if (selections.length) {
            me.select(selections, false, true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onSelectionStoreRemove: function(store, records) {
        var me = this,
            selected = me.selected,
            ln = records.length,
            record, i;

        if (me.getDisableSelection()) {
            return;
        }

        for (i = 0; i < ln; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (me.getLastSelected() == record) {
                    me.setLastSelected(null);
                }
                if (me.getLastFocused() == record) {
                    me.setLastFocused(null);
                }
                me.fireSelectionChange([record]);
            }
        }
    },

    /**
     * Returns the number of selections.
     * @return {Number}
     */
    getSelectionCount: function() {
        return this.selected.getCount();
    },

    onSelectionStoreAdd     : Ext.emptyFn,
    onSelectionStoreUpdate  : Ext.emptyFn,
    onItemSelect            : Ext.emptyFn,
    onItemDeselect          : Ext.emptyFn,
    onLastFocusChanged      : Ext.emptyFn
});
