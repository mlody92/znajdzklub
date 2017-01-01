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
            cellTemplate: '<md-button ng-href="edit-user-{{row.entity.login}}#?login={{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    delete $http.defaults.headers.common["X-Requested-With"];

    var refreshData = function () {
        $http.get('listUser').success(function (response, status) {
            $scope.gridOptions.data = response;
        }).error(function () {
            alert("Failed to access");
        });
    };

    refreshData();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        var login = data.login;
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Pytanie')
            .textContent('Czy na pewno chcesz usunąć użytkownika: '+login)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            var dataObj = data;
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            delete $http.defaults.headers.common["X-Requested-With"];
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: 'delete-user-' + login,
                data: dataObj,
                headers: {'Content-Type': 'application/json; charset=utf-8'}

            }).success(function (data, status, headers, config) {
                if (data.success == true) {
                    showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie usunięto użyytkownika');
                }
                else {
                    showAlert($scope, $mdDialog, 'Błąd', data.error);
                }
            }).error(function (data, status, headers, config) {
                showAlert($scope, $mdDialog, 'Błąd', "Błąd na serwerze");
            }).finally(function () {
                refreshData();
                $scope.disableMask();
            });
        });
    };
});