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
                {text: "Tytuł", dataIndex: 'title', sortable: true},
                {text: "Opis", dataIndex: 'description', sortable: true},
                {text: "Strona www", dataIndex: 'website', sortable: true},
                {text: "Adres", dataIndex: 'address', sortable: true},
                {text: "Email", dataIndex: 'email', sortable: true},
                {text: "Tel.", dataIndex: 'phone', sortable: true},
                {text: "Status", dataIndex: 'status', sortable: true},
                {text: "Data", dataIndex: 'date', sortable: true},
                {text: "Kod pocztowy", dataIndex: 'postalCode', sortable: true},
                {text: "Kategoria", dataIndex: 'categoryId', sortable: true},
                {text: "Użytkownik", dataIndex: 'userId', sortable: true},
                createActionColumn({
                    deleteUrl: 'delete-advert'
                })
            ];

            var grid = createGrid({
                store: store,
                renderTo: 'test',
                title: "Kluby",
                columns: columns
            });
        });

    </script>
</t:wrapper>