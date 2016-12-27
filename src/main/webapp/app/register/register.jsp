<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" id="maskId" ng-disabled="true">
        <section class="main clearfix">
            <div id="cover" ng-show="mask">
                <div>
                    <md-progress-circular id="mask" md-mode="indeterminate" md-diameter="96"></md-progress-circular>
                </div>
            </div>

                <%--////--%>
            <section class="top">
                <div class="wrapper content_header clearfix">
                    <div class="work_nav">

                        <ul class="btn clearfix">
                            <li><a href="#" class="previous" data-title="Previous"></a></li>
                            <li><a href="index.html" class="grid" data-title="Portfolio"></a></li>
                            <li><a href="#" class="next" data-title="Next"></a></li>
                        </ul>

                    </div><!-- end work_nav -->
                    <h1 class="title">Rejestracja</h1>
                </div>
            </section>
            <!-- end top -->

            <section class="wrapper">

                <div class="content " ng-controller="RegisterCtrl">

                        <%--<div class="generic-container">--%>
                        <%--<%@include file="../login/authheader.jsp" %>--%>

                    <div class="container">
                        <div class="row">

                            <div class="col-sm-6">
                                <!-- FORM ============ -->

                                <form name="userForm" ng-submit="submitForm(user)" method="post" novalidate modelAttribute="user" enctype="text/plain">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                    <input type="hidden" path="id" id="id"/>

                                    <!-- NAME -->
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.firstName.$invalid && !userForm.firstName.$pristine }">
                                        <label>Imię *</label>
                                            <%--<input type="text" path="firstName" id="firstName" class="form-control input-sm" ng-model="vm.user.firstName"/>--%>
                                        <input type="text" name="firstName" class="form-control" ng-model="user.firstName" required>
                                        <p ng-show="userForm.firstName.$invalid && !userForm.firstName.$pristine" class="help-block">Pole imię jest obowiązkowe.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : userForm.lastName.$invalid && !userForm.lastName.$pristine }">
                                        <label>Nazwisko *</label>
                                            <%--<input type="text" path="firstName" id="firstName" class="form-control input-sm" ng-model="vm.user.firstName"/>--%>
                                        <input type="text" name="lastName" class="form-control" ng-model="user.lastName" required>
                                        <p ng-show="userForm.lastName.$invalid && !userForm.lastName.$pristine" class="help-block">Pole nazwisko jest obowiązkowe.</p>
                                    </div>

                                    <!-- USERNAME -->
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.login.$invalid && !userForm.login.$pristine }">
                                        <label>Nazwa użytkownika *</label>
                                        <c:choose>
                                            <c:when test="${edit}">
                                                <input type="text" name="username" class="form-control" ng-model="user.login" disabled="true">
                                            </c:when>
                                            <c:otherwise>
                                                <input type="text" name="username" class="form-control" ng-model="user.login" ng-minlength="3" ng-maxlength="30">
                                            </c:otherwise>
                                        </c:choose>
                                        <p ng-show="userForm.login.$error.minlength" class="help-block">Nazwa użytkownika jest zbyt krótka</p>
                                        <p ng-show="userForm.login.$error.maxlength" class="help-block">Nazwa użytkownika jest za długa.</p>
                                    </div>

                                    <!-- EMAIL -->
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.email.$invalid && !userForm.email.$pristine }">
                                        <label>Email *</label>
                                        <input type="email" name="email" class="form-control" ng-model="user.email">
                                        <p ng-show="userForm.email.$invalid && !userForm.email.$pristine" class="help-block">Wpisz poprawny adres e-mail.</p>
                                    </div>


                                    <!-- Password -->
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.password.$invalid && !userForm.password.$pristine }">
                                        <label>Hasło *</label>
                                        <input type="password" name="password" class="form-control" ng-model="user.password" required ng-minlength="5" ng-maxlength="30">
                                        <p ng-show="userForm.password.$invalid && !userForm.password.$pristine" class="help-block">Wpisz poprawne hasło</p>
                                        <p ng-show="userForm.password.$error.minlength" class="help-block">Hasło jest zbyt krótkie.</p>
                                    </div>
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine }">
                                        <label>Powtórz hasło *</label>
                                        <input type="password" name="confirmPassword" class="form-control" ng-model="user.confirmPassword" required compare-to="user.password">
                                        <p ng-show="userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine" class="help-block">Hasła nie są takie same.</p>
                                    </div>

                                    <sec:authorize access="hasRole('ADMIN')">
                                        <div class="row">
                                            <div class="form-group col-md-12">
                                                <label class="col-md-3 control-lable">Roles</label>
                                                <div class="col-md-7">
                                                    <select path="role" multiple="false" class="form-control input-sm">
                                                        <option value="USER">User</option>
                                                        <option value="ADMIN">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </sec:authorize>


                                    <c:choose>
                                        <c:when test="${edit}">
                                            <input type="submit" value="Update" class="btn btn-primary btn-sm" ng-disabled="userForm.$invalid"/> or <a href="<c:url value='/userList' />">Cancel</a>
                                        </c:when>
                                        <c:otherwise>
                                            <input type="submit" value="Register" class="btn btn-primary btn-sm" ng-disabled="userForm.$invalid"/> or <a
                                                href="<c:url value='/userList' />">Cancel</a>
                                            <button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Submit</button>
                                        </c:otherwise>
                                    </c:choose>
                                </form>
                            </div>


                            <div class="col-sm-6">
                                <!-- VALIDATION TABLES ======== -->
                                <div class="row">
                                    <div class="col-xs-3">
                                        <h3>Form</h3>
                                        <table class="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td ng-class="{ success: userForm.$valid, danger: userForm.$invalid }">Valid</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.$pristine, danger: !userForm.$pristine }">Pristine</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.$dirty }">Dirty</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-xs-3">
                                        <h3>Name</h3>
                                        <table class="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td ng-class="{ success: userForm.firstName.$valid, danger: userForm.name.$invalid }">Valid</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.firstName.$pristine, danger: !userForm.name.$pristine }">Pristine</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.firstName.$dirty }">Dirty</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.firstName.$touched }">Touched</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-xs-3">
                                        <h3>Username</h3>
                                        <table class="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td ng-class="{ success: userForm.login.$valid, danger: userForm.login.$invalid }">Valid</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.login.$pristine, danger: !userForm.login.$pristine }">Pristine</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.login.$dirty }">Dirty</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.login.$touched }">Touched</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-xs-3">
                                        <h3>Email</h3>
                                        <table class="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td ng-class="{ success: userForm.email.$valid, danger: userForm.email.$invalid }">Valid</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.email.$pristine, danger: !userForm.email.$pristine }">Pristine</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.email.$dirty }">Dirty</td>
                                            </tr>
                                            <tr>
                                                <td ng-class="{ success: userForm.email.$touched }">Touched</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>


                            <%--<div class="well lead">User Registration Form</div>--%>
                            <%--<form:form method="POST" modelAttribute="user" class="form-horizontal">--%>
                            <%--<form:input type="hidden" path="id" id="id"/>--%>

                            <%--<div class="row">--%>


                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="firstName">First Name</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<form:input type="text" path="firstName" id="firstName" class="form-control input-sm" ng-model="vm.user.firstName"/>--%>
                            <%--<div class="has-error" ng-class="{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }">--%>
                            <%--<form:errors path="firstName" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>

                            <%--<div class="row">--%>
                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="lastName">Last Name</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<form:input type="text" path="lastName" id="lastName" class="form-control input-sm"/>--%>
                            <%--<div class="has-error">--%>
                            <%--<form:errors path="lastName" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>

                            <%--<div class="row">--%>
                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="login">Login</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<c:choose>--%>
                            <%--<c:when test="${edit}">--%>
                            <%--<form:input type="text" path="login" id="login" class="form-control input-sm" disabled="true"/>--%>
                            <%--</c:when>--%>
                            <%--<c:otherwise>--%>
                            <%--<form:input type="text" path="login" id="login" class="form-control input-sm"/>--%>
                            <%--<div class="has-error">--%>
                            <%--<form:errors path="login" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</c:otherwise>--%>
                            <%--</c:choose>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>

                            <%--<div class="row">--%>
                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="password">Password</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<form:input type="password" path="password" id="password" class="form-control input-sm"/>--%>
                            <%--<div class="has-error">--%>
                            <%--<form:errors path="password" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>

                            <%--<sec:authorize access="hasRole('ADMIN')">--%>
                            <%--<div class="row">--%>
                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="role">Roles</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<form:select path="role" multiple="false" class="form-control input-sm">--%>
                            <%--<option value="USER">User</option>--%>
                            <%--<option value="ADMIN">Admin</option>--%>
                            <%--</form:select>--%>
                            <%--<div class="has-error">--%>
                            <%--<form:errors path="role" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</sec:authorize>--%>


                            <%--<div class="row">--%>
                            <%--<div class="form-group col-md-12">--%>
                            <%--<label class="col-md-3 control-lable" for="email">Email</label>--%>
                            <%--<div class="col-md-7">--%>
                            <%--<form:input type="email" path="email" id="email" class="form-control input-sm"/>--%>
                            <%--<div class="has-error">--%>
                            <%--<form:errors path="email" class="help-inline"/>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="row">--%>
                            <%--<div class="form-actions floatRight">--%>
                            <%--<c:choose>--%>
                            <%--<c:when test="${edit}">--%>
                            <%--<input type="submit" value="Update" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/userList' />">Cancel</a>--%>
                            <%--</c:when>--%>
                            <%--<c:otherwise>--%>
                            <%--<input type="submit" value="Register" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/userList' />">Cancel</a>--%>
                            <%--</c:otherwise>--%>
                            <%--</c:choose>--%>
                            <%--</div>--%>
                            <%--</div>--%>
                            <%--</form:form>--%>
                            <%--</div>--%>
                    </div><!-- end content -->
            </section>
        </section>
    </div>
</t:wrapper>

