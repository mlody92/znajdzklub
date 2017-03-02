'use strict';
app.controller('RegisterCtrl', function ($scope, $http, $mdDialog, $location, Factory) {
    var login = getParameterByName('login');
    if (login != undefined) {
        Factory.getData('user-' + login).then(function (result) {
            $scope.user = result.data;
        });
    }

    $scope.submitForm = function (data, edit) {
        Factory.loadMask();
        if ($scope.userForm.$valid && !edit) {
            addUser(data);
        }
        else if ($scope.userForm.$valid && edit) {
            editUser(data);
        }
    };

    var addUser = function (data) {
        var postConfig = {
            url: 'register',
            data: data,
            successFn: function () {
                location.href = 'login'
            }
        };
        Factory.postData(postConfig);
    };

    var editUser = function (data) {
        var postConfig = {
            url: 'edit-user',
            data: data,
            successFn: function () {
                location.href = 'login'
            }
        };
        Factory.postData(postConfig);
    };
});


