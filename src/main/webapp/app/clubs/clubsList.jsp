<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <section class="main clearfix">
        <section class="topKlaw">
            <div class="wrapper content_header clearfix">
                <h1 class="title_kluby_ciemne">Lista klubów</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper" ng-app="app">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div ng-controller="ClubListCtrl">
                            <div ui-grid="grid" class="table table-hover"></div>
                        </div>


                        <div id="test">
                        </div>
                    </div>
                    <div class="col-md-6 col-md-offset-3">
                    </div>
                </div>

            </div>

            </div><!-- end content -->
        </section>
    </section>

    <script>
        Ext.require([
            'Ext.grid.*',
            'Ext.data.*',
            'Ext.panel.*',
            'Ext.layout.container.Border'
        ]);

        Ext.onReady(function () {

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
                {text: "Tytuł", dataIndex: 'title', sortable: true, locked: true},
                {text: "Opis", dataIndex: 'description', hidden: true},
                {text: "Strona www", dataIndex: 'website', sortable: true, hidden: true},
                {text: "Adres", dataIndex: 'address', sortable: true, hidden: true},
                {text: "Email", dataIndex: 'email', sortable: true, hidden: true},
                {text: "Tel.", dataIndex: 'phone', sortable: true, hidden: true},
                {text: "Status", dataIndex: 'status', sortable: true},
                {text: "Data", dataIndex: 'date', sortable: true, hidden: true},
                {text: "Kod pocztowy", dataIndex: 'postalCode', sortable: true, hidden: true},
                {text: "Kategoria", dataIndex: 'categoryId', sortable: true},
                {text: "Użytkownik", dataIndex: 'userId', sortable: true},
                createActionColumn({
                    deleteUrl: 'delete-advert'
                })
            ];


            var grid = Ext.create('Ext.grid.Panel', {
                store: store,
                renderTo: 'test',
                title: "Kluby",
                columns: columns,
                enableLocking: true,
                lockedViewConfig: {
                    listeners: {
                        render: function (view) {
                            view.tip = Ext.create('Ext.tip.ToolTip', {
                                // The overall target element.
                                id: 'tool',
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
                        }
                    }
                }


            });

        });

    </script>
</t:wrapper>