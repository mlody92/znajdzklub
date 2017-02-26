'use strict';
app.controller('RegisterCtrl', function ($scope, $http, $mdDialog, $location, Factory) {
    if ($location.search().login != undefined) {
        Factory.getData('user-' + $location.search().login).then(function (result) {
            $scope.user = result.data;
        });
    }

    $scope.submitForm = function (user, edit) {
        Factory.loadMask();
        if ($scope.userForm.$valid && !edit) {
            addUser(user);
        }
        else if ($scope.userForm.$valid && edit) {
            editUser(user);
        }
    };

    var addUser = function (user) {
        var postConfig = {
            url: 'register',
            data: user,
            successFn: function () {
                location.href = 'login'
            }
        };
        Factory.postData(postConfig);
    };

    var editUser = function (user) {
        var postConfig = {
            url: 'edit-user-' + user.login,
            data: user,
            successFn: function () {
                location.href = 'login'
            }
        };
        Factory.postData(postConfig);
    };
});


