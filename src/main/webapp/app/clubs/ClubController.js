'use strict';
// var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ngMaterial', 'ui.grid.resizeColumns']);

app.controller('ClubListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
    $scope.gridOptions = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.gridOptions.columnDefs = [
        {name: 'Tytuł', field: "title"},
        {name: 'Opis', field: "description"},
        {name: 'Strona www', field: "website"},
        {name: 'Adres', field: "address"},
        {name: 'Email', field: "email"},
        {name: 'Kontakt', field: "phone"},
        {name: 'Status', field: "status"},
        {name: 'Data dodania', field: "date"},
        {name: 'Kod pocztowy', field: "postalCode"},
        {name: 'Kategoria', field: "categoryId"},
        {
            name: 'action',
            displayName:'',
            enableSorting: false,
            width: 100,
            cellTemplate: '<md-button ng-href="edit-user-{{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity.login)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    delete $http.defaults.headers.common["X-Requested-With"];
    $http.get('listClubs').success(function (response, status) {
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
            .textContent('Czy na pewno chcesz usunąć klub: '+login)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            location.href = 'delete-user-'+login;
        });
    };
});