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

function changeStatus(config) {

    Ext.getBody().mask('Proszę czekać ...');
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    Ext.Ajax.request({
        url: config.url,
        headers: {'Content-Type': 'application/json', [header]: token},
        jsonData: config.rec.data,
        method: 'POST',
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

function post(config) {
    Ext.getBody().mask('Proszę czekać ...');
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    Ext.Ajax.request({
        url: config.url,
        headers: {'Content-Type': 'application/json', [header]: token},
        jsonData: config.data,
        method: 'POST',
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
    function createStore(config) {
        return Ext.create('Ext.data.Store', {
            model: 'Klub',
            autoLoad: 'true',
            proxy: {
                type: 'ajax',
                url: config.url,
                reader: {type: 'json'}
            }
        });

    }


    var loadColumns = function () {
        return [{text: "Tytuł", dataIndex: 'title', sortable: true},
            {text: "Status", dataIndex: 'status', sortable: true},
            {text: "Kategoria", dataIndex: 'categoryId', sortable: true},
            {text: "Użytkownik", dataIndex: 'userId', sortable: true},
            {
                xtype: 'actioncolumn',
                width: 80,
                maxWidth: 80,
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
                        grid.getStore().reload();
                    }
                }]
            }]
    };

    // create the grid
    var columnsAktywne = loadColumns();
    columnsAktywne.push({
        text: 'Status',
        xtype: 'actioncolumn',
        width: 80,
        maxWidth: 80,
        items: [{
            iconCls: 'glyphicon glyphicon-remove iconDisactive',
            tooltip: 'Zablokuj',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                rec.data.status = 'nieaktywne';
                changeStatus(
                    {
                        url: 'club-status',
                        rec: rec
                    }
                );
                storeAktywne.reload();
                storeNieaktywne.reload();
            }
        }]
    });

    var columnsDoZatwierdzania = loadColumns();
    columnsDoZatwierdzania.push({
        text: 'Status',
        xtype: 'actioncolumn',
        width: 80,
        maxWidth: 80,
        items: [{
            iconCls: 'glyphicon glyphicon-ok iconActive',
            tooltip: 'Akceptuj',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                rec.data.status = 'aktywne';
                changeStatus(
                    {
                        url: 'club-status',
                        rec: rec
                    }
                );
                storeDoZatwierdzania.reload();
                storeAktywne.reload();
            }
        }, {
            iconCls: 'glyphicon glyphicon-remove iconDisactive',
            tooltip: 'Odrzuć',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                rec.data.status = 'odrzucone';
                changeStatus(
                    {
                        url: 'club-status',
                        rec: rec
                    }
                );
                storeDoZatwierdzania.reload();
                storeOdrzuocne.reload();
            }
        }]
    });


    var columnsOdrzucone = loadColumns();
    columnsOdrzucone.push({
        text: 'Status',
        xtype: 'actioncolumn',
        width: 80,
        maxWidth: 80,
        items: [{
            iconCls: 'glyphicon glyphicon-ok iconActive',
            tooltip: 'Do zatwierdzenia',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                rec.data.status = 'do zatwierdzenia';
                changeStatus(
                    {
                        url: 'club-status',
                        rec: rec
                    }
                );
                storeOdrzuocne.reload();
                storeDoZatwierdzania.reload();
            }
        }]
    });

    var columnsNieaktywne = loadColumns();
    columnsNieaktywne.push({
        text: 'Status',
        xtype: 'actioncolumn',
        width: 80,
        maxWidth: 80,
        items: [{
            iconCls: 'glyphicon glyphicon-ok iconActive',
            tooltip: 'Do zatwierdzenia',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                rec.data.status = 'do zatwierdzenia';
                changeStatus(
                    {
                        url: 'club-status',
                        rec: rec
                    }
                );
                storeNieaktywne.reload();
                storeDoZatwierdzania.reload();
            }
        }]
    });

    function createGrid(config) {
        return Ext.create('Ext.grid.Panel', {
            store: config.store,
            title: config.title,
            columns: {items: config.columns, defaults: {minWidth: 100}},
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
    }


    var storeAktywne = createStore({url: 'listClubsAktywne'});
    var storeDoZatwierdzania = createStore({url: 'listClubsDoZatwierdzenia'});
    var storeOdrzuocne = createStore({url: 'listClubsOdrzucone'});
    var storeNieaktywne = createStore({url: 'listClubsNieaktywne'});

    var tabPanel = Ext.create('Ext.TabPanel', {
        fullscreen: true,
        tabBarPosition: 'bottom',
        renderTo: 'test',
        defaults: {
            styleHtmlContent: true
        },
        items: [
            createGrid({
                title: 'Aktywne',
                store: storeAktywne,
                columns: columnsAktywne
            }),
            createGrid({
                title: 'Do zatwierdzenia',
                store: storeDoZatwierdzania,
                columns: columnsDoZatwierdzania
            }),
            createGrid({
                title: 'Odrzucone',
                store: storeOdrzuocne,
                columns: columnsOdrzucone
            }),
            createGrid({
                title: 'Nieaktywne',
                store: storeNieaktywne,
                columns: columnsNieaktywne
            })
        ]
    });

    // tabPanel.on('tabchange', function (tab, item) {
    //     item.getStore().reload();
    // });

    Ext.on('resize', function () {
        tabPanel.updateLayout();
        // gridDoZatwierdzenia.updateLayout();
        // gridOdrzucone.updateLayout();
        // gridNieaktywne.updateLayout();
    });

};

App.clubs.addNew = function () {

    var navigate = function (panel, direction) {
        // This routine could contain business logic required to manage the navigation steps.
        // It would call setActiveItem as needed, manage navigation button state, handle any
        // branching logic that might be required, handle alternate actions like cancellation
        // or finalization, etc.  A complete wizard implementation could get pretty
        // sophisticated depending on the complexity required, and should probably be
        // done as a subclass of CardLayout in a real-world implementation.
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('move-next').setHidden(!layout.getNext());
        Ext.getCmp('save-button').setHidden(layout.getNext());
    };

    var storeCategory = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        autoLoad: 'true',
        proxy: {
            type: 'ajax',
            url: 'listCategory',
            reader: {type: 'json'}
        }
    });

    var firstPage = Ext.create('Ext.form.Panel', {
        // bodyPadding: 10,

        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            name: 'title',
            fieldLabel: 'Tytuł',
            allowBlank: false  // requires a non-empty value
        }, {
            xtype: 'textareafield',
            grow: true,
            name: 'description',
            fieldLabel: 'Opis',
            anchor: '100%',
            allowBlank: false  // requires a non-empty value
        }, Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Kategoria',
            store: storeCategory,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'categoryId',
            allowBlank: false  // requires a non-empty value
        })
        ]

        // listeners: {
        //     afterrender: function () {
        //         this.validate();
        //     },
        //     validitychange: function (me, isValid) {
        //         Ext.getCmp('move-next').setDisabled(!isValid);
        //     }
        // }
    });

    var secondPage = Ext.create('Ext.form.Panel', {
        // bodyPadding: 10,
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            name: 'website',
            fieldLabel: 'Strona www'
        }, {
            name: 'address',
            fieldLabel: 'Adres',
            allowBlank: false  // requires a non-empty value
        }, {
            name: 'postalCode',
            fieldLabel: 'Kod pocztowy',
            allowBlank: false  // requires a non-empty value
        }, {
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email',  // requires value to be a valid email address format
            allowBlank: false
        }, {
            xtype:'numberfield',
            name: 'phone',
            fieldLabel: 'Numer telefonu'
        }]
    });

    var panel = Ext.create('Ext.panel.Panel', {
        layout: 'card',
        xtype: 'form',
        bodyStyle: 'padding:15px',
        defaults: {
            // applied to each contained panel
            border: false
        },
        // just an example of one possible navigation scheme, using buttons
        bbar: [
            {
                id: 'move-prev',
                text: 'Wróć',
                handler: function (btn) {
                    navigate(btn.up("panel"), "prev");
                },
                disabled: true
            },
            '->', // greedy spacer so that the buttons are aligned to each side
            {
                id: 'move-next',
                text: 'Dalej',
                handler: function (btn) {
                    if (firstPage.isValid()) {
                        navigate(btn.up("panel"), "next");
                    } else {
                        Ext.MessageBox.alert('Błąd', 'Wypełnij formularz poprawnie');
                    }
                }
            }, // greedy spacer so that the buttons are aligned to each side
            {
                id: 'save-button',
                text: 'Zapisz',
                hidden: true,
                handler: function (btn) {
                    if (secondPage.isValid()) {
                        var data = jQuery.extend(firstPage.getValues(), secondPage.getValues());
                        post({
                            url: 'addAdvert',
                            data: data
                        });
                    } else {
                        Ext.MessageBox.alert('Błąd', 'Wypełnij formularz poprawnie');
                    }

                }
            }
        ],
        // the panels (or "cards") within the layout
        items: [firstPage, secondPage]
    });

    if (Ext.getCmp('dodajWindowId') == undefined) {
        Ext.create('Ext.window.Window', {
            id: 'dodajWindowId',
            title: 'Dodaj klub',
            height: 400,
            width: 500,
            layout: 'fit',
            items: panel,
            listeners: {
                beforeShow: function () {
                    Ext.getBody().mask('Proszę czekać ...');
                }
            }
        }).show();
    }
};