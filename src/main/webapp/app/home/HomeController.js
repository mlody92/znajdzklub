'use strict';



app.controller('HomeCtrl', function ($scope, $http, $mdDialog, $location) {
    var chooseClub = function (categoryId) {
        $location.path('sztukiWalki').search({param: 'value'});
    };
    // function to submit the form after all validation has occurred
    $scope.sztukiWalkiButton = function (user, edit) {
        chooseClub(1);
    };


});
