<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" ng-disabled="true">
        <section class="main clearfix">
            <t:mask/>
            <section class="topKlaw">
                <div class="wrapper content_header clearfix">
                    <div class="work_nav">


                    </div><!-- end work_nav -->
                    <h1 class="title_kluby_ciemne">Moj profil</h1>
                </div>
            </section>
            <!-- end top -->

            <section class="wrapper">

                <div class="content " ng-controller="MyProfileCtrl">

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
                                        <input type="text" name="username" class="form-control" ng-model="user.login" disabled="true">

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
                                        <input type="password" name="password" class="form-control" ng-model="user.password" ng-maxlength="30" ng-minlength="5">
                                        <p ng-show="userForm.password.$error.minlength" class="help-block">Hasło jest zbyt krótkie.</p>
                                        <p ng-show="userForm.password.$error.maxlength" class="help-block">Hasło jest zbyt długie.</p>
                                    </div>
                                    <div class="form-group" ng-class="{ 'has-error' : userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine }">
                                        <label>Powtórz hasło *</label>
                                        <input type="password" name="confirmPassword" class="form-control" ng-model="user.confirmPassword">

                                        <p ng-show="userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine" class="help-block">Hasła nie są takie same.</p>
                                    </div>

                                    <input type="submit" value="Zapisz" class="btn btn-primary btn-sm" ng-disabled="userForm.$invalid"/> or <input action="action" type="button" value="Powrót"
                                                                                                                                                   onclick="history.go(-1);"/>

                                </form>
                            </div>
                        </div>
                    </div><!-- end content -->
                </div>
            </section>
        </section>
    </div>
</t:wrapper>

