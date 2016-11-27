<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <section class="main clearfix">
    <div class="generic-container">
        <%--<%@include file="authheader.jsp" %>--%>
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading"><span class="lead">List of Users </span></div>

            <%--<div ng-app="app" ng-controller='customersCtrl'>--%>
                <%--<tbody>--%>
                <%--<tr ng-repeat="item in names | orderBy:sortingOrder:reverse">--%>
                    <%--<td>{{item.id}}</td>--%>
                <%--</tr>--%>
                <%--</tbody>--%>
            <%--</div>--%>


            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Login</th>
                    <th>Role</th>
                    <sec:authorize access="hasRole('ADMIN')">
                        <th width="100"></th>
                    </sec:authorize>

                </tr>
                </thead>
                <tbody>
                <c:forEach items="${users}" var="user">
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.login}</td>
                        <td>${user.role}</td>
                        <sec:authorize access="hasRole('ADMIN')">
                            <td><a href="<c:url value='/edit-user-${user.login}' />" class="btn btn-success custom-width">edit</a></td>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ADMIN')">
                            <td><a href="<c:url value='/delete-user-${user.login}' />" class="btn btn-danger custom-width">delete</a></td>
                        </sec:authorize>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
        <%--<sec:authorize access="hasRole('ADMIN')">--%>
            <%--<div class="well">--%>
                <%--<a href="<c:url value='/register' />">Add New User</a>--%>
            <%--</div>--%>
        <%--</sec:authorize>--%>
    </div>
    </section>

    <script>
        var app = angular.module('app', [])
                .config(function ($httpProvider) {
                    delete $httpProvider.defaults.headers.common['X-Requested-With'];
                });

        app.controller('customersCtrl', function($scope, $http) {
//            $http.get("list2")
//                    .then(function (response) {$scope.names = response.data;});
            delete $http.defaults.headers.common["X-Requested-With"];
            $http.get('list2').success(function(response,status){
                $scope.names = response.data;
            }).error(function(){
                alert("Failed to access");
            })
        });



    </script>
</t:wrapper>
