<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <section class="main clearfix">
        <section class="top">
            <div class="wrapper content_header clearfix">
                <h1 class="title">Lista użytkowników</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper" ng-app="app">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div  ng-controller="SztukiWalkiCtrl">
                            <div ui-grid="gridOptions" class="table table-hover"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-md-offset-3">
                </div>
            </div>
            </div><!-- end content -->
        </section>
    </section>

    <script>
        var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ngMaterial']);

        app.controller('SztukiWalkiCtrl', function ($scope, $http, $location, $mdDialog, $mdMedia) {
            $scope.gridOptions = {
                enableColumnResizing: true,
                resizable: true
            };
            //you can override the default assignment if you wish
            //$scope.gridOptions.appScopeProvider = someOtherReference;

            $scope.gridOptions.columnDefs = [
                {name: 'Imię', field: "firstName"},
                {name: 'Nazwisko', field: "lastName"},
                {name: 'Email', field: "email"},
                {name: 'Login', field: "login"},
                {name: 'Rola', field: "role"},
                {
                    name: 'action',
                    displayName:'',
                    enableSorting: false,
                    cellTemplate: '<md-button ng-href="edit-user-{{row.entity.login}}"><span class="glyphicon glyphicon-pencil"></span></md-button><md-button ng-click="grid.appScope.showConfirm($event, row.entity.login)"><span class="glyphicon glyphicon-trash"></md-button>'
                }
            ];

            delete $http.defaults.headers.common["X-Requested-With"];
            $http.get('listUser').success(function (response, status) {
                $scope.gridOptions.data = response;
            }).error(function () {
                alert("Failed to access");
            });

            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            $scope.showConfirm = function (ev, data) {
                // Appending dialog to document.body to cover sidenav in docs app
                var login = data;
                var confirm = $mdDialog.confirm()
                        .title('Pytanie')
                        .textContent('Czy na pewno chcesz usunąć użytkownika: '+login)
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('Tak')
                        .cancel('Nie');
                $mdDialog.show(confirm).then(function () {
                    location.href = 'delete-user-'+login;
                });
            };
        });

//        function DialogController($scope, $mdDialog) {
//            $scope.hide = function () {
//                $mdDialog.hide();
//            };
//            $scope.cancel = function () {
//                $mdDialog.cancel();
//            };
//        }
    </script>

</t:wrapper>