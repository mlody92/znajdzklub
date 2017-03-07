'use strict';
app.controller('UserListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory, uiGridConstants) {
    $scope.grid = {
        enableColumnResizing: true,
        // // resizable: true
        // enableScrollbars : false,
        // enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        // enableVerticalScrollbar : uiGridConstants.scrollbars.NEVER
    };


    var template = '<div class="grid-tooltip" tooltip-html-unsafe="Login: {{ row.entity.login }}<br>Imię: {{ row.entity.firstName }}<br>Nazwisko: {{ row.entity.lastName }}<br>Email: {{ row.entity.email }}<br>Rola: {{ row.entity.role }}" tooltip-placement="right" > ' +
        '<div class="ui-grid-cell-contents">{{ COL_FIELD }} </div></div>';

    $scope.grid.columnDefs = [
        // {name: 'Imię', field: "firstName", cellTemplate: template},
        // {name: 'Nazwisko', field: "lastName"},
        {name: 'Login', field: "login", cellTemplate: template, minWidth:100},
        {name: 'Email', field: "email", cellTemplate: template,minWidth:100},
        // {name: 'Rola', field: "role"},
        {
            name: 'action',
            displayName: '',
            width:100,
            enableSorting: false,
            cellTemplate: '<md-button ng-href="edit-user?login={{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    loadStore();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (event, data) {
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

    function loadStore() {
        Factory.getData('listUser').then(function (result) {
            $scope.grid.data = result.data;
        });
    }
});


