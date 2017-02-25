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
                    <h1 class="title_kluby_ciemne">Rejestracja</h1>
                </div>
            </section>
            <!-- end top -->

            <section class="wrapper">

                <div class="content " ng-controller="RegisterCtrl">

                    <div class="container">
                        <div class="row">

                            <div class="col-sm-6">
                                <!-- FORM ============ -->

                                <form name="userForm" ng-submit="submitForm(user, ${edit})" method="post" novalidate modelAttribute="user" enctype="text/plain">
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

                                    <c:choose>
                                        <c:when test="${edit}">
                                        </c:when>
                                        <c:otherwise>
                                            <!-- Password -->
                                            <div class="form-group" ng-class="{ 'has-error' : userForm.password.$invalid && !userForm.password.$pristine }">
                                                <label>Hasło *</label>
                                                <c:choose>
                                                    <c:when test="${edit}">
                                                        <input type="password" name="password" class="form-control" ng-model="user.password"  ng-minlength="5" ng-maxlength="30">
                                                    </c:when>
                                                    <c:otherwise>
                                                        <input type="password" name="password" class="form-control" ng-model="user.password" required ng-minlength="5" ng-maxlength="30">
                                                    </c:otherwise>
                                                </c:choose>
                                                <p ng-show="userForm.password.$error.minlength" class="help-block">Hasło jest zbyt krótkie.</p>
                                                <p ng-show="userForm.password.$error.maxlength" class="help-block">Hasło jest zbyt długie.</p>
                                            </div>
                                            <div class="form-group" ng-class="{ 'has-error' : userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine }">
                                                <label>Powtórz hasło *</label>
                                                <c:choose>
                                                    <c:when test="${edit}">
                                                        <input type="password" name="confirmPassword" class="form-control" ng-model="user.confirmPassword">
                                                    </c:when>
                                                    <c:otherwise>
                                                        <input type="password" name="confirmPassword" class="form-control" ng-model="user.confirmPassword" required compare-to="user.password">
                                                    </c:otherwise>
                                                </c:choose>
                                                <p ng-show="userForm.confirmPassword.$invalid && !userForm.confirmPassword.$pristine" class="help-block">Hasła nie są takie same.</p>
                                            </div>
                                        </c:otherwise>
                                    </c:choose>



                                    <sec:authorize access="hasRole('ADMIN')">
                                        <div class="form-group">
                                            <label>Uprawnienie</label>
                                            <select id="roleList" ng-model="user.role" class="form-control input-sm">
                                                <option value="ADMIN">Administrator</option>
                                                <option value="USER">Użytkownik</option>
                                            </select>
                                        </div>
                                    </sec:authorize>
                                    <c:choose>
                                        <c:when test="${edit}">
                                            <input type="submit" value="Zapisz" class="btn btn-primary btn-sm" ng-disabled="userForm.$invalid"/> or <input action="action" type="button" value="Powrót" onclick="history.go(-1);" />
                                        </c:when>
                                        <c:otherwise>
                                            <input type="submit" value="Zarejestruj" class="btn btn-primary btn-sm" ng-disabled="userForm.$invalid"/>
                                        </c:otherwise>
                                    </c:choose>
                                </form>
                            </div>
                        </div>
                    </div><!-- end content -->
                </div>
            </section>
        </section>
    </div>
</t:wrapper>

