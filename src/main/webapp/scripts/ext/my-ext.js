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

function createActionColumn(config) {
    return {
        xtype: 'actioncolumn',
        items: [{
            iconCls: 'glyphicon glyphicon-pencil',
            tooltip: 'Edit',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                alert("Terminate " + rec.get('title'));
            }
        }, {
            iconCls: 'glyphicon glyphicon-trash',
            tooltip: 'Delete',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                createConfirmMessageBox(
                    {
                        url: config.deleteUrl,
                        rec: rec
                    });
            }
        }]
    }
}