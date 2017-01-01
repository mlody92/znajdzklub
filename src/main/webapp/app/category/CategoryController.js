'use strict';
app.controller('CategoryCtrl', function ($scope, $http, $mdDialog, $location) {

    if ($location.search().name != undefined) {
        $http.get('category-' + $location.search().name).success(function (response, status) {
            $scope.category = response;
        }).error(function () {
            alert("Błąd pobrania danych kategorii");
        });
    }
    // function to submit the form after all validation has occurred
    $scope.submitForm = function (data, edit) {

        // check to make sure the form is completely valid
        $scope.loadMask();
        $scope.data = data;
        if ($scope.form.$valid && !edit) {
            $scope.addRowAsyncAsJSON();
        }
        else if ($scope.form.$valid && edit) {
            $scope.editRowAsyncAsJSON();
        }
    };

    $scope.addRowAsyncAsJSON = function () {
        var dataObj = {
            name: $scope.data.name
        };

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'addCategory',
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie dodano kategorię', function () {
                    location.href = 'addCategory'
                });
            }
            else {
                showAlert($scope, $mdDialog, 'Błąd', data.error);
            }
        }).error(function (data, status, headers, config) {
            showAlert($scope, $mdDialog, 'Błąd', "Błąd na serwerze");
        }).finally(function () {
            $scope.disableMask();
        });
    };

    $scope.editRowAsyncAsJSON = function () {
        var dataObj = {
            id: $scope.data.id,
            name: $scope.data.name
        };

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'edit-category-' + $scope.data.name,
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie zaktualizowano kategorię');
            }
            else {
                showAlert($scope, $mdDialog, 'Błąd', data.error);
            }
        }).error(function (data, status, headers, config) {
            showAlert($scope, $mdDialog, 'Błąd', "Błąd na serwerze");
        }).finally(function () {
            $scope.disableMask();
        });
    };
});

app.controller('CategoryListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
    $scope.gridOptions = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.gridOptions.columnDefs = [
        {name: 'Nazwa', field: "name"},
        {
            name: 'action',
            displayName: '',
            enableSorting: false,
            cellTemplate: '<md-button ng-href="edit-category-{{row.entity.name}}#?name={{row.entity.name}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    delete $http.defaults.headers.common["X-Requested-With"];
    var refreshData = function () {
        $http.get('listCategory').success(function (response, status) {
            $scope.gridOptions.data = response;
        }).error(function () {
            alert("Failed to access");
        });
    };


    refreshData();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        var name = data.name;
        var confirm = $mdDialog.confirm()
            
            .title('Pytanie')
            .textContent('Czy na pewno chcesz usunąć kategorię: ' + name)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            var dataObj = {
                id: data.id,
                name: data.name
            };
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            delete $http.defaults.headers.common["X-Requested-With"];
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: 'delete-category-' + name,
                data: dataObj,
                headers: {'Content-Type': 'application/json; charset=utf-8'}

            }).success(function (data, status, headers, config) {
                if (data.success == true) {
                    showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie usunięto kategorię');
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