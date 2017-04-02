'use strict';
app.controller('UserListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory, uiGridConstants) {
        $scope.currentNavItem = 'aktywny';

        $scope.grid = {
            enableColumnResizing: true,
            // // resizable: true
            // enableScrollbars : false,
            // enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
            // enableVerticalScrollbar : uiGridConstants.scrollbars.NEVER
        };

        var template = '<div class="grid-tooltip" tooltip-html-unsafe="Login: {{ row.entity.login }}<br>Imię: {{ row.entity.firstName }}<br>Nazwisko: {{ row.entity.lastName }}<br>Email: {{ row.entity.email }}<br>Rola: {{ row.entity.role }}" tooltip-placement="right" > ' +
            '<div class="ui-grid-cell-contents">{{ COL_FIELD }} </div></div>';

        function createColumns(status) {

            $scope.grid.columnDefs = new Array();
            $scope.grid.columnDefs.push({name: 'Login', field: "login", cellTemplate: template, minWidth: 100});
            $scope.grid.columnDefs.push({name: 'Email', field: "email", cellTemplate: template, minWidth: 100});
            $scope.grid.columnDefs.push({
                name: 'action',
                displayName: '',
                width: 100,
                enableSorting: false,
                cellTemplate: '<md-button ng-href="edit-user?login={{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirmDelete($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
            });

            if (status == 'aktywny') {
                $scope.grid.columnDefs.push({
                    name: 'action1',
                    displayName: 'Status',
                    width: 100,
                    enableSorting: false,
                    cellTemplate: '<md-button ng-click="grid.appScope.changeStatus($event, row.entity, \'zablokowany\')"><span class="glyphicon glyphicon-remove iconDisactive"></span>'
                });
            } else if (status == 'nieaktywny' || status == 'zablokowany') {
                $scope.grid.columnDefs.push({
                    name: 'action2',
                    displayName: 'Status',
                    width: 100,
                    enableSorting: false,
                    cellTemplate: '<md-button ng-click="grid.appScope.changeStatus($event, row.entity, \'aktywny\')"><span class="glyphicon glyphicon-remove iconActive"></span>'
                });
            }
        }

        $scope.grid.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.showConfirmDelete = function (event, data) {
            // Appending dialog to document.body to cover sidenav in docs app
            var login = data.login;
            var config = {
                event: event,
                textContent: "Czy na pewno chcesz usunąć użytkownika: " + login,
                thenFn: function () {
                    var postConfig = {
                        url: 'delete-user',
                        data: data,
                        finallyFn: function () {
                            loadStore();
                        }

                    };
                    Factory.postData(postConfig);
                }
            };
            Factory.showConfirm(config);
        };

        $scope.changeStatus = function (event, data, status) {
            data.status = status;
            var postConfig = {
                url: 'user-status',
                data: data,
                finallyFn: function () {
                    loadStore($scope.currentNavItem);
                }

            };
            Factory.onlyPostData(postConfig);
        };

        $scope.$watch("currentNavItem", function () {
            $scope.grid.columnDefs = new Array();
            createColumns($scope.currentNavItem);
            loadStore($scope.currentNavItem);
            $scope.gridApi.grid.refresh();
        });

        function loadStore(status) {
            Factory.getData('listUser-' + status).then(function (result) {
                $scope.grid.data = result.data;
            });
        }
    }
);


// ========== initialize documentation app module ========== //

// ========== controllers ========== //
app.controller('draggableCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory, uiGridConstants) {

    $scope.models = {};

    function loadStore(status) {
        Factory.getData('listUser-' + status).then(function (result) {
            $scope.models[status] = result.data;
        });
    }

    loadStore("aktywny");
    loadStore("nieaktywny");
    loadStore("zablokowany");

    $scope.currentDropElement = null;

    $scope.remove = function (l, o) {
        var index = l.indexOf(o);
        if (index > -1) {
            l.splice(index, 1);
        }
    };

    $scope.onDragStart = function () {
    };

    $scope.onDragEnd = function () {

    };

    $scope.onDragOver = function (data, dragElement, dropElement) {
        $scope.currentDropElement = dropElement;
    };

    $scope.onDragLeave = function () {
        $scope.currentDropElement = null;
    };

    $scope.onDrop = function (data, status) {
        var statusBeforeDrop = data.status;
        if (data && $scope.currentDropElement && statusBeforeDrop!=status) {
            data.status = status;
            changeStatus(data, statusBeforeDrop);
        }
    };

    changeStatus = function (data, removeStatusFrom) {
        var postConfig = {
            url: 'user-status',
            data: data,
            finallyFn: function () {
                $scope.models[data.status].push(data);
                $scope.remove($scope.models[removeStatusFrom], data);
            }

        };
        Factory.onlyPostData(postConfig);
    };
})