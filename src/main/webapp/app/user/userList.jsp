<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
                <h1 class="title">Lista użytkowników</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper">
                    <%--<div class="generic-container">--%>
                            <%--<%@include file="authheader.jsp" %>--%>
                        <div class="panel panel-default">
                            <!-- Default panel contents -->
                            <%--<div class="panel-heading"><span class="lead">List of Users </span></div>--%>

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
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>Email</th>
                                    <th>Login</th>
                                    <th>Rola</th>
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
                                            <td><a href="<c:url value='/edit-user-${user.login}' />" class="btn btn-success custom-width">edytuj</a></td>
                                        </sec:authorize>
                                        <sec:authorize access="hasRole('ADMIN')">
                                            <td><a href="<c:url value='/delete-user-${user.login}' />" class="btn btn-danger custom-width">usuń</a></td>
                                        </sec:authorize>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                        <%--</div>--%>
                            <%--<sec:authorize access="hasRole('ADMIN')">--%>
                            <%--<div class="well">--%>
                            <%--<a href="<c:url value='/register' />">Add New User</a>--%>
                            <%--</div>--%>
                            <%--</sec:authorize>--%>
                    <%--</div>--%>
                </div>

                <div class="col-md-6 col-md-offset-3">
                </div>
            </div><!-- end content -->
        </section>
    </section>
</t:wrapper>