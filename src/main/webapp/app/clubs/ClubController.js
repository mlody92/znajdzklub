'use strict';
// var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ngMaterial', 'ui.grid.resizeColumns']);

app.controller('ClubListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
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
            cellTemplate: '<md-button ng-href="edit-advert-{{row.entity.id}}#?id={{row.entity.id}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity)"><span class="glyphicon glyphicon-trash"></md-button>'
        }
    ];
    var refreshData = function () {
        $http.get('listClubs').success(function (response, status) {
            $scope.grid.data = response;
        }).error(function () {
            alert("Failed to access");
        });
    };

    refreshData();
    delete $http.defaults.headers.common["X-Requested-With"];
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        console.log(data);
        var title = data.title;
        var confirm = $mdDialog.confirm()
            .title('Pytanie')
            .textContent('Czy na pewno chcesz usunąć klub: ' + title)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            delete $http.defaults.headers.common["X-Requested-With"];
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: 'delete-advert',
                data: data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}

            }).success(function (data, status, headers, config) {
                if (data.success == true) {
                    showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie usunięto ogłoszenie');
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

app.controller('ClubCtrl', function ($scope, $http, $mdDialog, $location) {
    if ($location.search().id != undefined) {
        $http.get('club-' + $location.search().id).success(function (response, status) {
            $scope.advert = response;
        }).error(function () {
            alert("Błąd pobrania danych.");
        });
    }

    $http.get('listCategory').success(function (response, status) {
        $scope.categories = response;
    }).error(function () {
        alert("Błąd pobrania danych.");
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function (data, edit) {

        // check to make sure the form is completely valid
        $scope.loadMask();
        if ($scope.form.$valid && !edit) {
            $scope.addRowAsyncAsJSON(data);
        }
        else if ($scope.form.$valid && edit) {
            $scope.editRowAsyncAsJSON(data);
        }
    };

    $scope.addRowAsyncAsJSON = function (dataObj) {
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'addAdvert',
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie dodano ogłoszenie', function () {
                    location.href = 'myClubs'
                });
            }
            else {
                showAlert($scope, $mdDialog, 'Błąd', data.error);
            }
        }).error(function (data, status, headers, config) {
            showAlert($scope, $mdDialog, 'Błąd', "Nie można połączyć się z serwerem");
        }).finally(function () {
            $scope.disableMask();
        });
    };

    $scope.editRowAsyncAsJSON = function (dataObj) {
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'edit-advert-' + dataObj.title,
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie zaktualizowano ogłoszenie');
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

app.controller('ClubListViewCtrl', function ($scope, $http) {
    $scope.submitFilter = function (data) {

        // check to make sure the form is completely valid
        $scope.loadMask();
        if ($scope.form.$valid) {
            if (data.kod != "" || data.km != "") {
                $http.get("clubs-filter-" + data.kod + "-" + data.km + "-" + $scope.categoryId).success(function (response, status) {
                    $scope.grid.data = response;
                }).error(function () {
                    alert("Failed to access");
                }).finally(function () {
                    $scope.disableMask();
                });
            } else {
                refreshData($scope.categoryId)
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
                {name: 'Opis', field: "description"},
                {name: 'Strona www', field: "website"},
                {name: 'Adres', field: "address"},
                {name: 'Email', field: "email"},
                {name: 'Kontakt', field: "phone"},
                {name: 'Status', field: "status"},
                {name: 'Data dodania', field: "date"},
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
                    cellTemplate: '<a ng-href="view-advert-{{row.entity.id}}#?id={{row.entity.id}}"><span >{{row.entity.title}}</span></a>'
                },
                {name: 'Opis', field: "description"},
                {name: 'Strona www', field: "website"},
                {name: 'Adres', field: "address"},
                {name: 'Email', field: "email"},
                {name: 'Kontakt', field: "phone"},
                {name: 'Status', field: "status"},
                {name: 'Data dodania', field: "date"},
                {name: 'Kod pocztowy', field: "postalCode"}
            ];
        }
    });

    var refreshData = function (category) {
        var all = 'listClubs';
        var category = 'clubs-category-' + category;
        if (category != undefined) {
            $http.get(category).success(function (response, status) {
                $scope.grid.data = response;
            }).error(function () {
                alert("Failed to access");
            });
        } else {
            $http.get(all).success(function (response, status) {
                $scope.grid.data = response;
            }).error(function () {
                alert("Failed to access");
            });
        }
    };
    $scope.$watch("categoryId", function () {
        refreshData($scope.categoryId);
    });

});


app.controller('MyClubListCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
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
    var refreshData = function () {
        $http.get('clubs-user').success(function (response, status) {
            $scope.grid.data = response;
        }).error(function () {
            alert("Failed to access");
        });
    };

    refreshData();
    delete $http.defaults.headers.common["X-Requested-With"];
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showConfirm = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app
        var title = data.title;
        var confirm = $mdDialog.confirm()
            .title('Pytanie')
            .textContent('Czy na pewno chcesz usunąć klub: ' + title)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak')
            .cancel('Nie');
        $mdDialog.show(confirm).then(function () {
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            delete $http.defaults.headers.common["X-Requested-With"];
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: 'delete-advert',
                data: data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}

            }).success(function (data, status, headers, config) {
                if (data.success == true) {
                    showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie usunięto ogłoszenie');
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