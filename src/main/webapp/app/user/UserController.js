'use strict';
app.controller('UserListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory) {
    $scope.gridOptions = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.gridOptions.columnDefs = [
        {name: 'Imię', field: "firstName"},
        {name: 'Nazwisko', field: "lastName"},
        {name: 'Email', field: "email"},
        {name: 'Login', field: "login"},
        {name: 'Rola', field: "role"},
        {
            name: 'action',
            displayName: '',
            enableSorting: false,
            cellTemplate: '<md-button ng-href="edit-user-{{row.entity.login}}#?login={{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
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
                Factory.postData('delete-user-' + login, data, function () {
                        loadStore();
                    }
                );
            }
        };
        Factory.showConfirm(config);
    };

    function loadStore() {
        Factory.getData('listUser').then(function (result) {
            $scope.gridOptions.data = result.data;
        });
    }
});