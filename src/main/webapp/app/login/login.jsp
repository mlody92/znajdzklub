<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <section class="main clearfix">
    <section class="top">
        <div class="wrapper content_header clearfix">
            <div class="work_nav">

                <ul class="btn clearfix">
                    <li><a href="#" class="previous" data-title="Previous"></a></li>
                    <li><a href="index.html" class="grid" data-title="Portfolio"></a></li>
                    <li><a href="#" class="next" data-title="Next"></a></li>
                </ul>

            </div><!-- end work_nav -->
            <h1 class="title">Logowanie</h1>
        </div>
    </section>
    <!-- end top -->

    <section class="wrapper">
        <div class="content ">


            <div class="col-md-6 col-md-offset-3">
                <%--////--%>
                    <div id="mainWrapper">
                        <div class="login-container">
                            <div class="login-card">
                                <div class="login-form">
                                    <c:url var="loginUrl" value="/login" />
                                    <form action="${loginUrl}" method="post" class="form-horizontal">
                                        <c:if test="${param.error != null}">
                                            <div class="alert alert-danger">
                                                <p>Invalid username and password.</p>
                                            </div>
                                        </c:if>
                                        <c:if test="${param.logout != null}">
                                            <div class="alert alert-success">
                                                <p>You have been logged out successfully.</p>
                                            </div>
                                        </c:if>
                                        <div class="input-group input-sm">
                                            <label class="input-group-addon" for="username"><i class="fa fa-user"></i></label>
                                            <input type="text" class="form-control" id="username" name="ssoId" placeholder="Enter Username" required>
                                        </div>
                                        <div class="input-group input-sm">
                                            <label class="input-group-addon" for="password"><i class="fa fa-lock"></i></label>
                                            <input type="password" class="form-control" id="password" name="password" placeholder="Enter Password" required>
                                        </div>
                                        <div class="input-group input-sm">
                                            <div class="checkbox">
                                                <label><input type="checkbox" id="rememberme" name="remember-me"> Remember Me</label>
                                            </div>
                                        </div>
                                        <input type="hidden" name="${_csrf.parameterName}"  value="${_csrf.token}" />

                                        <div class="form-actions">
                                            <input type="submit"
                                                   class="btn btn-block btn-primary btn-default" value="Log in">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                <%--<form:form id="loginForm" method="post" action="login" modelAttribute="loginBean">--%>
                    <%--<form:label path="username">Enter your user-name</form:label>--%>
                    <%--<form:input id="username" name="username" path="username"/><br>--%>
                    <%--<form:label path="username">Please enter your password</form:label>--%>
                    <%--<form:password id="password" name="password" path="password"/><br>--%>
                    <%--<input type="submit" value="Submit"/>--%>
                <%--</form:form>--%>
                    <%--//////--%>

                <form name="form" ng-submit="form.$valid && vm.login()" novalidate>
                    <div class="form-group" ng-class="{ 'has-error': form.$submitted && form.username.$invalid }">
                        <label for="username">Username</label>
                        <input type="text" name="username" class="form-control" ng-model="vm.username" required/>
                        <div ng-messages="form.$submitted && form.username.$error" class="help-block">
                            <div ng-message="required">Username is required</div>
                        </div>
                    </div>
                    <div class="form-group" ng-class="{ 'has-error': form.$submitted && form.password.$invalid }">
                        <label for="password">Password</label>
                        <input type="password" name="password" class="form-control" ng-model="vm.password" required/>
                        <div ng-messages="form.$submitted && form.password.$error" class="help-block">
                            <div ng-message="required">Password is required</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button ng-disabled="vm.loading" class="btn btn-primary">Login</button>
                        <img ng-if="vm.loading"
                             src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                    </div>
                    <div ng-if="vm.error" class="alert alert-danger">{{vm.error}}</div>
                </form>

                <div class="alert alert-info">
                    Username: test<br/>
                    Password: test
                </div>

            </div>
        </div><!-- end content -->
    </section>
        </section>
</t:wrapper>