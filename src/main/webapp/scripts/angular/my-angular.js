'use strict';
var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.bootstrap', 'ui.grid.autoResize', 'ngMaterial', 'ui.grid.resizeColumns', 'ngRoute', 'ngSanitize', 'adaptv.adaptStrap']);

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

app.factory('Factory', function ($http, $mdDialog, $rootScope) {
        var factory = this;

        factory.loadMask = function () {
            $rootScope.mask = true;
        };

        factory.disableMask = function () {
            $rootScope.mask = false;
        };

        factory.getData = function ($url) {
            return $http.get($url).success(function (response, status) {
                return response;
            }).error(function () {
                alert("Failed to access");
            }).finally(function () {
                factory.disableMask();
            });
        };

        factory.getData2 = function (config) {
            $http({
                method: 'GET',
                url: config.url,
                params: config.params
            }).success(function (response, status) {
                return response;
            }).error(function () {
                alert("Failed to access");
            }).finally(function () {
                factory.disableMask();
            });
        };

        factory.showAlert = function (title, text, thenFn) {
            var alert = $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(text)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok');
            $mdDialog.show(alert).then(function () {
                if (typeof thenFn == 'function') {
                    thenFn()
                }
            });
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

        factory.postData = function (config) {
            delete $http.defaults.headers.common["X-Requested-With"];
            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");
            $http.defaults.headers.common['content-type'] = 'application/json';
            $http.defaults.headers.common[header] = token;
            $http({
                method: 'POST',
                url: config.url,
                data: config.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
                // }).success(function (data, status, headers, config) {
            }).success(function (data, status) {
                if (data.success == true) {
                    factory.showAlert('Informacja', data.info, config.successFn);
                }
                else {
                    factory.showAlert('Błąd', data.error);
                    if (typeof config.failureFn == 'function') {
                        config.failureFn();
                    }
                }
            }).error(function (data, status, headers, config) {
                factory.showAlert('Błąd', "Błąd na serwerze");
                if (typeof config.errorFn == 'function') {
                    config.errorFn();
                }
            }).finally(function () {
                if (typeof config.finallyFn == 'function') {
                    config.finallyFn();
                }
                factory.disableMask();
            });
        };

    factory.onlyPostData = function (config) {
        delete $http.defaults.headers.common["X-Requested-With"];
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        $http.defaults.headers.common['content-type'] = 'application/json';
        $http.defaults.headers.common[header] = token;
        $http({
            method: 'POST',
            url: config.url,
            data: config.data,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
            // }).success(function (data, status, headers, config) {
        }).success(function (data, status) {
            if (data.success == false) {
                factory.showAlert('Błąd', data.error);
                if (typeof config.failureFn == 'function') {
                    config.failureFn();
                }
            }
        }).error(function (data, status, headers, config) {
            factory.showAlert('Błąd', "Błąd na serwerze");
            if (typeof config.errorFn == 'function') {
                config.errorFn();
            }
        }).finally(function () {
            if (typeof config.finallyFn == 'function') {
                config.finallyFn();
            }
            factory.disableMask();
        });
    };
        return factory;
    }
);

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}