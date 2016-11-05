
'use strict';
// angular.js main app initialization
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index',
            controller: HomeCtrl
        })
        .when('/pages/inner', {
            templateUrl: 'pages/inner',
            controller: ProjectCtrl
        })
        .when('/pages/contact', {
            templateUrl: 'pages/contact',
            controller: AboutCtrl
        })
        .otherwise({
            redirectTo: '/'
        });
});


//
// config(['$routeProvider', function ($routeProvider) {
//     $routeProvider.
//     when('/', { templateUrl: 'pages/index.jps', activetab: 'projects', controller: HomeCtrl }).
//     when('/project/:projectId', {
//         templateUrl: function (params) { return 'pages/' + params.projectId + '.jsp'; },
//         controller: ProjectCtrl,
//         activetab: 'projects'
//     }).
//     when('/privacy', {
//         templateUrl: 'pages/privacy.jsp',
//         controller: PrivacyCtrl,
//         activetab: 'privacy'
//     }).
//     when('/about', {
//         templateUrl: 'pages/about.jsp',
//         controller: AboutCtrl,
//         activetab: 'about'
//     }).
//     otherwise({ redirectTo: '/' });
// }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {
//     $scope.$on("$routeChangeSuccess", function (scope, next, current) {
//         $scope.part = $route.current.activetab;
//     });
// // onclick event handlers
//     $scope.showForm = function () {
//         $('.contactRow').slideToggle();
//     };
//     $scope.closeForm = function () {
//         $('.contactRow').slideUp();
//     };
// // save the 'Contact Us' form
//     $scope.save = function () {
//         $scope.loaded = true;
//         $scope.process = true;
//         $http.post('sendemail.php', $scope.message).success(function () {
//             $scope.success = true;
//             $scope.process = false;
//         });
//     };
// }]);
// app.config(['$locationProvider', function($location) {
//     $location.hashPrefix('!');
// }]);