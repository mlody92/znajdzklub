<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<t:wrapper>
    <section class="main clearfix">

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

            <div class="content ">

                <%--<div class="generic-container">--%>
                        <%--<%@include file="../login/authheader.jsp" %>--%>

                        <%--<div class="well lead">User Registration Form</div>--%>
                    <form:form method="POST" modelAttribute="user" class="form-horizontal">
                        <form:input type="hidden" path="id" id="id"/>

                        <div class="row">


                            <div class="form-group col-md-12">
                                <label class="col-md-3 control-lable" for="firstName">First Name</label>
                                <div class="col-md-7">
                                    <form:input type="text" path="firstName" id="firstName" class="form-control input-sm" ng-model="vm.user.firstName"/>
                                    <div class="has-error" ng-class="{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }">
                                        <form:errors path="firstName" class="help-inline"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="col-md-3 control-lable" for="lastName">Last Name</label>
                                <div class="col-md-7">
                                    <form:input type="text" path="lastName" id="lastName" class="form-control input-sm"/>
                                    <div class="has-error">
                                        <form:errors path="lastName" class="help-inline"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="col-md-3 control-lable" for="login">Login</label>
                                <div class="col-md-7">
                                    <c:choose>
                                        <c:when test="${edit}">
                                            <form:input type="text" path="login" id="login" class="form-control input-sm" disabled="true"/>
                                        </c:when>
                                        <c:otherwise>
                                            <form:input type="text" path="login" id="login" class="form-control input-sm"/>
                                            <div class="has-error">
                                                <form:errors path="login" class="help-inline"/>
                                            </div>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="col-md-3 control-lable" for="password">Password</label>
                                <div class="col-md-7">
                                    <form:input type="password" path="password" id="password" class="form-control input-sm"/>
                                    <div class="has-error">
                                        <form:errors path="password" class="help-inline"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <sec:authorize access="hasRole('ADMIN')">
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <label class="col-md-3 control-lable" for="role">Roles</label>
                                        <div class="col-md-7">
                                            <form:select path="role" multiple="false" class="form-control input-sm">
                                                <option value="USER">User</option>
                                                <option value="ADMIN">Admin</option>
                                            </form:select>
                                            <div class="has-error">
                                                <form:errors path="role" class="help-inline"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </sec:authorize>


                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="col-md-3 control-lable" for="email">Email</label>
                                <div class="col-md-7">
                                    <form:input type="email" path="email" id="email" class="form-control input-sm"/>
                                    <div class="has-error">
                                        <form:errors path="email" class="help-inline"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-actions floatRight">
                                <c:choose>
                                    <c:when test="${edit}">
                                        <input type="submit" value="Update" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/list' />">Cancel</a>
                                    </c:when>
                                    <c:otherwise>
                                        <input type="submit" value="Register" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/list' />">Cancel</a>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </form:form>
                <%--</div>--%>
            </div><!-- end content -->
        </section>
    </section>
</t:wrapper>

