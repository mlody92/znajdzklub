function createGrid(config) {
    Ext.create('Ext.grid.Panel', {
        title: config.title,
        store: config.store,
        renderTo: config.renderTo,
        columns: config.columns
    });
}

function createConfirmMessageBox(config) {
    Ext.MessageBox.show({
        title: 'Pytanie',
        msg: 'Czy usunąć wybraną pozycję?',
        buttons: Ext.MessageBox.OKCANCEL,
        icon: Ext.MessageBox.QUESTION,
        fn: function (btn) {
            if (btn == 'ok') {
                Ext.getBody().mask('Proszę czekać ...');
                var token = $("meta[name='_csrf']").attr("content");
                var header = $("meta[name='_csrf_header']").attr("content");
                Ext.Ajax.request({
                    url: config.url,
                    headers: {'Content-Type': 'application/json', [header]: token},
                    jsonData: config.rec.data,
                    callback: function (options, success, response) {
                        var response = Ext.decode(response.responseText);
                        Ext.getBody().unmask();
                        if (response.success) {
                            createInfo(response);
                        } else {
                            createError(response);
                        }
                    }
                });
            }
        }
    })
}

function createInfo(response) {
    Ext.MessageBox.show({
        title: 'Informacja',
        msg: response.info,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    })
}

function createError(response) {
    Ext.MessageBox.show({
        title: 'Błąd',
        msg: response.info,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    })
}

Ext.namespace('App.clubs');

// Ext.require([
//     'Ext.grid.*',
//     'Ext.data.*',
//     'Ext.panel.*',
//     'Ext.layout.container.Border'
// ]);

App.clubs.createClubList = function () {

    Ext.define('Klub', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'title'},
            {name: 'description'},
            {name: 'website'},
            {name: 'address'},
            {name: 'email'},
            {name: 'phone'},
            {name: 'status'},
            {name: 'date'},
            {name: 'postalCode'},
            {name: 'categoryId'},
            {name: 'userId'}
        ]
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        model: 'Klub',
        autoLoad: 'true',
        proxy: {
            type: 'ajax',
            url: 'listClubs',
            reader: {type: 'json'}
        }
    });


    // create the grid
    var columns = [
        {text: "Tytuł", dataIndex: 'title', sortable: true},
        {text: "Status", dataIndex: 'status', sortable: true},
        {text: "Kategoria", dataIndex: 'categoryId', sortable: true},
        {text: "Użytkownik", dataIndex: 'userId', sortable: true},
        {
            xtype: 'actioncolumn',
            maxWidth: 50,
            items: [{
                iconCls: 'glyphicon glyphicon-pencil',
                tooltip: 'Edit',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    location.href = 'edit-advert?id=' + rec.id;
                }
            }, {
                iconCls: 'glyphicon glyphicon-trash',
                tooltip: 'Delete',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    createConfirmMessageBox(
                        {
                            url: 'delete-advert',
                            rec: rec
                        });
                }
            }]
        }
    ];


    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        renderTo: 'test',
        title: "Kluby",
        columns: {items: columns, defaults: {minWidth: 100}},
        autoScroll: true,
        autoFit: true,
        forceFit: true,
        viewConfig: {
            listeners: {
                render: function (view) {
                    view.tip = Ext.create('Ext.tip.ToolTip', {
                        // The overall target element.
                        minWidth: 200,
                        target: view.el,
                        // Each grid row's name cell causes its own separate show and hide.
                        delegate: view.itemSelector,
                        // Moving within the cell should not hide the tip.
                        trackMouse: true,
                        renderTo: 'test',
                        dismissDelay: 10000,
                        layout: {
                            type: 'vbox',
                            align: 'left'
                        },
                        listeners: {
                            // Change content dynamically depending on which element triggered the show.
                            beforeshow: function updateTipBody(tip) {
                                // Fetch grid view here, to avoid creating a closure.

                                var tipGridView = tip.target.component;
                                var record = tipGridView.getRecord(tip.triggerElement);
                                tip.add(items = [{
                                    xtype: 'label',
                                    text: record.get('title')
                                }, {
                                    xtype: 'label',
                                    text: record.get('description')
                                }, {
                                    xtype: 'label',
                                    text: record.get('website')
                                }, {
                                    xtype: 'label',
                                    text: record.get('address')
                                }, {
                                    xtype: 'label',
                                    text: record.get('email')
                                }, {
                                    xtype: 'label',
                                    text: record.get('phone')
                                }, {
                                    xtype: 'label',
                                    text: record.get('status')
                                }, {
                                    xtype: 'label',
                                    text: record.get('date')
                                }, {
                                    xtype: 'label',
                                    text: record.get('postalCode')
                                }, {
                                    xtype: 'label',
                                    text: record.get('userId')
                                }]);
                            },
                            beforeHide: function (tip) {
                                tip.removeAll();
                            }
                        }
                    });
                },
                destroy: function (view) {
                    delete view.tip; // Clean up this property on destroy.
                },
                refresh: function (dataview) {
                    Ext.each(dataview.panel.columns, function (column) {
                        if (column.autoSizeColumn === true)
                            column.autoSize();
                    })
                }
            }
        }
    });

    Ext.on('resize', function () {
        grid.updateLayout();
    });

};