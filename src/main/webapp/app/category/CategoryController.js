'use strict';
app.controller('CategoryCtrl', function ($scope, $http, $mdDialog, $location, Factory) {

    var name = getParameterByName('name');
    if (name != undefined) {
        Factory.getData('category-' + name).then(function (result) {
            $scope.category = result.data;
        });
    }

    $scope.submitForm = function (data, edit) {
        Factory.loadMask();
        if ($scope.form.$valid && !edit) {
            addCategory(data);
        } else if ($scope.form.$valid && edit) {
            editCategory(data);
        }
    };

    var addCategory = function (data) {
        var postConfig = {
            url: 'addCategory',
            data: data,
            successFn: function () {
                location.href = 'categoryList'
            }
        };
        Factory.postData(postConfig);
    };

    var editCategory = function (data) {
        var postConfig = {
            url: 'edit-category',
            data: data
        };
        Factory.postData(postConfig);
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
            cellTemplate: '<md-button ng-href="edit-category?name={{row.entity.name}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    loadStore();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    $scope.showConfirm = function (event, data) {
        var name = data.name;
        var config = {
            event: event,
            textContent: "Czy na pewno chcesz usunąć kategorię: " + name,
            thenFn: function () {
                var postConfig = {
                    url: 'delete-category',
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
        Factory.getData('listCategory').then(function (result) {
            $scope.grid.data = result.data;
        });
    }
});