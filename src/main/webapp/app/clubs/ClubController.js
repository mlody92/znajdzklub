'use strict';
app.controller('ClubListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory) {
    $scope.grid = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.grid.columnDefs = [
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
        {name: 'Użytkownik', field: "userId"},
        {
            name: 'action',
            displayName: '',
            enableSorting: false,
            width: 100,
            cellTemplate: '<md-button ng-href="edit-advert?id={{row.entity.id}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    function loadStore() {
        Factory.getData('listClubs').then(function (result) {
            $scope.grid.data = result.data;
        });
    }

    loadStore();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (event, data) {
        var title = data.title;
        var config = {
            event: event,
            textContent: "Czy na pewno chcesz usunąć klub: " + title,
            thenFn: function () {
                var postConfig = {
                    url: 'delete-advert',
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
});

app.controller('ClubCtrl', function ($scope, $http, $mdDialog, $location, Factory) {

    var id = getParameterByName("id");
    if (id != undefined) {
        Factory.getData('club-' + id).then(function (result) {
            $scope.advert = result.data;
        });
    }
    Factory.getData('listCategory').then(function (result) {
        $scope.categories = result.data;
    });

    $scope.submitForm = function (data, edit) {
        Factory.loadMask();
        if ($scope.form.$valid && !edit) {
            addClub(data);
        } else if ($scope.form.$valid && edit) {
            editClub(data);
        }
    };

    var addClub = function (data) {
        var postConfig = {
            url: 'addAdvert',
            data: data,
            successFn: function () {
                location.href = 'myClubs';
            }
        };
        Factory.postData(postConfig);
    };

    var editClub = function (data) {
        var postConfig = {
            url: 'edit-advert',
            data: data,
            successFn: function () {
                location.href = 'myClubs';
            }
        };
        Factory.postData(postConfig);
    };


});

app.controller('ClubListViewCtrl', function ($scope, $http, Factory) {

    $scope.submitFilter = function (data) {
        Factory.loadMask();
        if ($scope.form.$valid) {
            if (data.kod != "" || data.km != "") {
                Factory.getData("clubs-filter-" + data.kod + "-" + data.km + "-" + $scope.categoryId).then(function (result) {
                    $scope.grid.data = result.data;
                });
            } else {
                loadStore($scope.categoryId)
            }
        }
    };

    $scope.grid = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.$watch("edit", function () {
        if ($scope.edit) {
            $scope.grid.columnDefs = [
                {name: 'Tytuł', field: "title"},
                // {name: 'Opis', field: "description"},
                {name: 'Strona www', field: "website"},
                {name: 'Adres', field: "address"},
                {name: 'Email', field: "email"},
                {name: 'Kontakt', field: "phone"},
                // {name: 'Status', field: "status"},
                // {name: 'Data dodania', field: "date"},
                {name: 'Kod pocztowy', field: "postalCode"},
                {
                    name: 'action',
                    displayName: '',
                    enableSorting: false,
                    width: 100,
                    cellTemplate: '<md-button ng-href="edit-advert-{{row.entity.id}}#?id={{row.entity.id}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
                }
            ];
        } else {
            $scope.grid.columnDefs = [
                {
                    name: 'Tytuł',
                    cellTemplate: '<a ng-href="view-advert?id={{row.entity.id}}"><span >{{row.entity.title}}</span></a>'
                },
                // {name: 'Opis', field: "description"},
                {name: 'Strona www', field: "website"},
                {name: 'Adres', field: "address"},
                {name: 'Email', field: "email"},
                {name: 'Kontakt', field: "phone"},
                // {name: 'Status', field: "status"},
                // {name: 'Data dodania', field: "date"},
                {name: 'Kod pocztowy', field: "postalCode"}
            ];
        }
    });

    var loadStore = function (category) {
        var category = 'clubs-category-' + category;
        if (category != undefined) {
            Factory.getData(category).then(function (result) {
                $scope.grid.data = result.data;
            });
        } else {
            Factory.getData('listClubs').then(function (result) {
                $scope.grid.data = result.data;
            });
        }
    };


    $scope.$watch("categoryId", function () {
        loadStore($scope.categoryId);
    });

});


app.controller('MyClubListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia, Factory) {
    $scope.grid = {
        enableColumnResizing: true,
        resizable: true
    };

    $scope.grid.columnDefs = [
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
            displayName: '',
            enableSorting: false,
            width: 100,
            cellTemplate: '<md-button ng-href="edit-advert-{{row.entity.id}}#?id={{row.entity.id}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];

    var loadStore = function (category) {
        Factory.getData('clubs-user').then(function (result) {
            $scope.grid.data = result.data;
        });
    };

    loadStore();
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (event, data) {
        var title = data.title;
        var config = {
            event: event,
            textContent: "Czy na pewno chcesz usunąć użytkownika: " + login,
            thenFn: function () {
                var postConfig = {
                    url: 'delete-advert',
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
});