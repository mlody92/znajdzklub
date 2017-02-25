'use strict';
app.controller('CategoryCtrl', function ($scope, $http, $mdDialog, $location, Factory) {

    if ($location.search().name != undefined) {
        Factory.getData('category-' + $location.search().name).then(function (result) {
            $scope.category = result.data;
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

        var postConfig = {
            url: 'addCategory',
            data: dataObj,
            successFn: function () {
                location.href = 'addCategory'
            }

        };
        Factory.postData(postConfig);
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

app.controller('CategoryListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory) {
    $scope.grid = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.grid.columnDefs = [
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
            $scope.grid.data = response;
        }).error(function () {
            alert("Failed to access");
        });
    };


    refreshData();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    $scope.showConfirm = function (event, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        var name = data.name;
        var config = {
            event: event,
            textContent: "Czy na pewno chcesz usunąć kategorię: " + name,
            thenFn: function () {
                var postConfig = {
                    url: 'delete-category-' + name,
                    data: data,
                    finallyFn: function () {
                        refreshData();
                    }
                };
                Factory.postData(postConfig);
            }
        };
        Factory.showConfirm(config);
    };
});