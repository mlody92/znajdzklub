// (function () {
//     'use strict';
//
//     angular
//         .module('app', ['ngRoute', 'ngMessages', 'ngStorage', 'ngMockE2E'])
//         .config(config)
//         .run(run);
//
//     function config($routeProvider, $locationProvider) {
//         // default route
//         // $locationProvider.hashPrefix('!');
//         $routeProvider
//             .when('/', {
//                 controller: ProjectCtrl,
//                 templateUrl: 'home/home',
//                 controllerAs: 'vm'
//             })
//             .when('/menu', {
//                 controller: ProjectCtrl,
//                 templateUrl: 'basic/menu',
//                 controllerAs: 'vm'
//             })
//             .when('/include', {
//                 controller: ProjectCtrl,
//                 templateUrl: 'basic/include',
//                 controllerAs: 'vm'
//             })
//             .when('/webapp', {
//                 controller: HomeCtrl,
//                 templateUrl: 'webapp',
//                 controllerAs: 'vm'
//             })
//             .when('/login', {
//                 controller: 'Login.IndexController',
//                 templateUrl: 'login/login',
//                 controllerAs: 'vm'
//             })
//
//             .when('/register', {
//                 controller: 'RegisterController',
//                 templateUrl: 'register/register',
//                 controllerAs: 'vm'
//             })
//             .when('/inner', {
//                 templateUrl: 'inner/inner',
//                 controller: ProjectCtrl
//             })
//             .when('/contact', {
//                 templateUrl: 'contact/contact',
//                 controller: AboutCtrl,
//                 controllerAs: 'vm'
//             })
//             .otherwise({
//                 redirectTo: '/'
//             });
//     }
//
//     function run($rootScope, $http, $location, $localStorage) {
//
//         // keep user logged in after page refresh
//         if ($localStorage.currentUser) {
//             $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
//         }
//
//         // redirect to login page if not logged in and trying to access a restricted page
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // var publicPages = ['/', '/contact', '/register', '/login'];
//             var privatePages = ['/register'];
//             // var restrictedPage = publicPages.indexOf($location.path()) === -1;
//             var restrictedPage = privatePages.indexOf($location.path()) === 0;
//             if (restrictedPage && !$localStorage.currentUser) {
//                 $location.path('/login');
//             }
//         });
//     }
// })();
