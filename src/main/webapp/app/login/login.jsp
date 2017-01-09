<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <section class="main clearfix">
        <section class="top">
            <div class="wrapper content_header clearfix">
                <h1 class="title">Logowanie</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper">

                        <%--<div class="login-container">--%>
                    <div class="login-card">
                            <%--<div class="login-form">--%>
                        <c:url var="loginUrl" value="/login"/>
                        <form action="${loginUrl}" method="post" class="form-horizontal">
                            <c:if test="${param.error != null}">
                                <div class="alert alert-danger">
                                    <p>Niepoprawna nazwa użytkownika lub hasło.</p>
                                </div>
                            </c:if>
                            <div class="input-group input-sm">
                                <label class="input-group-addon" for="username"><i class="fa fa-user"></i></label>
                                <input type="text" class="form-control" id="username" name="login" placeholder="Wpisz nazwę użytkownika" required>
                            </div>
                            <div class="input-group input-sm">
                                <label class="input-group-addon" for="password"><i class="fa fa-lock"></i></label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Wpisz hasło" required>
                            </div>
                            <div class="input-group input-sm">
                                <div class="checkbox">
                                    <label><input type="checkbox" id="rememberme" name="remember-me"> Zapamiętaj mnie</label>
                                </div>
                            </div>
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

                            <div class="form-actions">
                                <input type="submit"
                                       class="btn btn-block btn-primary btn-default" value="Zaloguj">
                            </div>
                        </form>
                    </div>
                </div>
            </div><!-- end content -->
        </section>
    </section>
</t:wrapper>