<%--<html xmlns:th="http://www.thymeleaf.org" xmlns:tiles="http://www.thymeleaf.org">--%>
<%--<head>--%>
    <%--<title tiles:fragment="title">Messages : Create</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<div tiles:fragment="content">--%>
    <%--<form name="f" th:action="@{/login}" method="post">--%>
        <%--<fieldset>--%>
            <%--<legend>Please Login</legend>--%>
            <%--<div th:if="${param.error}" class="alert alert-error">--%>
                <%--Invalid username and password.--%>
            <%--</div>--%>
            <%--<div th:if="${param.logout}" class="alert alert-success">--%>
                <%--You have been logged out.--%>
            <%--</div>--%>
            <%--<label for="username">Username</label>--%>
            <%--<input type="text" id="username" name="username"/>--%>
            <%--<label for="password">Password</label>--%>
            <%--<input type="password" id="password" name="password"/>--%>
            <%--<div class="form-actions">--%>
                <%--<button type="submit" class="btn">Log in</button>--%>
            <%--</div>--%>
        <%--</fieldset>--%>
    <%--</form>--%>
<%--</div>--%>
<%--</body>--%>
<%--</html>--%>

<%@include file="include.jsp"%>



<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <title>Magnetic - Stunning Responsive HTML5/CSS3 Photography Wensite Template</title>
    <meta charset="utf-8">
    <meta name="author" content="pixelhint.com">
    <meta name="description" content="Magnetic is a stunning responsive HTML5/CSS3 photography/portfolio website template"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
    <link href="<c:url value='/css/reset.css' />" rel="stylesheet"/>
    <link href="<c:url value='/css/main.css' />" rel="stylesheet"/>

    <script src="<c:url value='/scripts/js/jquery-2.0.3.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular-route.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular-cookies.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular-messages.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular-mocks.js' />"></script>
    <script src="<c:url value='/app/app.js' />"></script>
    <script src="<c:url value='/app/main.js' />"></script>
    <script src="<c:url value='/app/controllers.js' />"></script>
    <script src="<c:url value='/app/home/home.controller.js' />"></script>
    <script src="<c:url value='/app/login/login.controller.js' />"></script>
    <script src="<c:url value='/app/index.controller.js' />"></script>
    <script src="<c:url value='/app/register/register.controller.js' />"></script>
    <script src="<c:url value='/scripts/js/service/authentication.service.js' />"></script>
    <script src="<c:url value='/scripts/js/service/flash.service.js' />"></script>
    <script src="<c:url value='/scripts/js/service/user.service.js' />"></script>
    <script src="<c:url value='/scripts/js/service/user.service.local-storage.js' />"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.6/ngStorage.min.js"></script>


    <script src="<c:url value='/scripts/js/service/fake-backend.js' />"></script>

    <!-- Real user service that uses an api -->
    <%--<script src="<c:url value='/scripts/js/service/user.service.js' />"></script>--%>

    <!-- Fake user service for demo that uses local storage -->
    <%--<script src="<c:url value='/scripts/js/service/user.service.local-storage.js' />"></script>--%>

</head>
<body>

<header>
    <div class="logo">
        <a href="#/"><img src="<c:url value='/img/logo.png' />" title="Magnetic" alt="Magnetic"/></a>
    </div><!-- end logo -->

    <div id="menu_icon"></div>
    <div ng-include="'menu'"></div>

    <div class="footer clearfix">
        <ul class="social clearfix">
            <li><a href="#" class="fb" data-title="Facebook"></a></li>
            <li><a href="#" class="google" data-title="Google +"></a></li>
            <li><a href="#" class="behance" data-title="Behance"></a></li>
            <!--<li><a href="#" class="twitter" data-title="Twitter"></a></li>
            <li><a href="#" class="dribble" data-title="Dribble"></a></li>-->
            <li><a href="#" class="rss" data-title="RSS"></a></li>
        </ul><!-- end social -->

        <div class="rights">
            <p>Copyright © 2014 magnetic.</p>
            <p>Template by <a href="">Pixelhint.com</a></p>
        </div><!-- end rights -->
    </div><!-- end footer -->
</header><!-- end header -->

<section class="main clearfix">
    <%--<div ng-view>--%>
        <%--<div ng-include="'home/home.jsp'"></div>--%>
    <%--<div ng-class="{ 'alert': flash, 'alert-success': flash.type === 'success', 'alert-danger': flash.type === 'error' }" ng-if="flash" ng-bind="flash.message"></div>--%>
    <div ng-view>
    </div>

    <%--</div>--%>
</section><!-- end main -->

</body>
</html>