'use strict';
// var app = angular.module('app2', []);

// app.controller('RegisterCtrl', function ($scope) {
//     $scope.submitForm = function (isValid) {
//         // check to make sure the form is completely valid
//         if (isValid) {
//             alert('our form is amazing');
//         }
//     };
// });

// var validationApp = angular.module('app', []);

// create angular controller


app.controller('RegisterCtrl', function ($scope, $http, $mdDialog, $location) {
    if ($location.search().login != undefined) {
        $http.get('user-' + $location.search().login).success(function (response, status) {
            $scope.user = response;
        }).error(function () {
            alert("Błąd pobrania danych użytkownika");
        });
    }

    // function to submit the form after all validation has occurred
    $scope.submitForm = function (user, edit) {

        // check to make sure the form is completely valid
        $scope.loadMask();
        $scope.user = user;
        if ($scope.userForm.$valid && !edit) {
            $scope.addRowAsyncAsJSON();
        }
        else if ($scope.userForm.$valid && edit) {
            $scope.editRowAsyncAsJSON();
        }
    };

    $scope.addRowAsyncAsJSON = function () {
        var dataObj = {
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            login: $scope.user.login,
            email: $scope.user.email,
            password: $scope.user.password
        };

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'register',
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie zarejestrowano użytkownika', function () {
                    location.href = 'login'
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

    $scope.editRowAsyncAsJSON = function () {
        var dataObj = {
            id: $scope.user.id,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            login: $scope.user.login,
            email: $scope.user.email,
            role : $scope.user.role
        };

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        delete $http.defaults.headers.common["X-Requested-With"];
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: 'edit-user-' + $scope.user.login,
            data: dataObj,
            headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).success(function (data, status, headers, config) {
            if (data.success == true) {
                showAlert($scope, $mdDialog, 'Informacja', 'Poprawnie zaktualizowano użytkownika');
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


