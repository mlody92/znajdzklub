'use strict';
var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ngMaterial', 'ui.grid.resizeColumns', 'ngRoute']);

var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compareTo", compareTo);


app.run(function ($rootScope) {
    $rootScope.loadMask = function () {
        $rootScope.mask = true;
    };

    $rootScope.disableMask = function () {
        $rootScope.mask = false;
    };
});

app.factory('Factory', function ($http, $mdDialog) {
        var factory = this;

        factory.getData = function ($url) {
            return $http.get($url).success(function (response, status) {
                return response;
            }).error(function () {
                alert("Failed to access");
            });
        };

        factory.showAlert = function ($title, $text, $thenFn) {
            var alert = $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title($title)
                .textContent($text)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok');
            $mdDialog.show(alert).then($thenFn);
        };

        factory.showConfirm = function (config) {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title("Pytanie")
                .textContent(config.textContent)
                .ariaLabel('Lucky day')
                .targetEvent(config.event)
                .ok('Tak')
                .cancel('Nie');
            $mdDialog.show(confirm).then(config.thenFn);
        };

        factory.postData = function ($url, $data, $finallyFn) {
            delete $http.defaults.headers.common["X-Requested-With"];
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: $url,
                data: $data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}

            }).success(function (data, status, headers, config) {
                if (data.success == true) {
                    factory.showAlert('Informacja', 'Poprawnie usunięto użyytkownika');
                }
                else {
                    factory.showAlert('Błąd', data.error);
                }
            }).error(function (data, status, headers, config) {
                factory.showAlert('Błąd', "Błąd na serwerze");
            }).finally(function () {
                $finallyFn();
                $scope.disableMask();
            });
        };

        return factory;
    }
);