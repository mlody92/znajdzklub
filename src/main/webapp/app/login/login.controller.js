// (function () {
//     'use strict';
//     angular
//         .module('app')
//         .controller('LoginController', LoginController);
//     function LoginController($scope, $http) {
//         $scope.listOfCustomers = null;
//
//         $http.get('http://localhost:8080/application/list2')
//             .success(function (data) {
//                 $scope.listOfCustomers = data;
//                 console.log("ok");
//             })
//             .error(function (data, status, headers, config) {
//                 //  Do some error handling here
//                 console.log("error");
//             });
//     }
// })();




// (function () {
//     'use strict';
//
//     angular
//         .module('app')
//         .controller('LoginController', LoginController);
//
//     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
//     function LoginController($location, AuthenticationService, FlashService) {
//         var vm = this;
//
//         vm.login = login;
//
//         (function initController() {
//             // reset login status
//             AuthenticationService.ClearCredentials();
//         })();
//
//         function login() {
//             vm.dataLoading = true;
//             AuthenticationService.Login(vm.username, vm.password, function (response) {
//                 if (response.success) {
//                     AuthenticationService.SetCredentials(vm.username, vm.password);
//                     $location.path('/');
//                 } else {
//                     FlashService.Error(response.message);
//                     vm.dataLoading = false;
//                 }
//             });
//         }
//     }
// })();