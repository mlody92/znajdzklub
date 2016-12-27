'use strict';
app.controller('UserListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
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
            displayName:'',
            enableSorting: false,
            cellTemplate: '<md-button ng-href="edit-user-{{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity.login)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    delete $http.defaults.headers.common["X-Requested-With"];
    $http.get('listUser').success(function (response, status) {
        $scope.gridOptions.data = response;
    }).error(function () {
        alert("Failed to access");
    });

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        var login = data;
        var confirm = $mdDialog.confirm()
            .title('Pytanie')
            .textContent('Czy na pewno chcesz usunąć użytkownika: '+login)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            location.href = 'delete-user-'+login;
        });
    };
});