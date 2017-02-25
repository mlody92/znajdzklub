<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" ng-disabled="true">
        <section class="main clearfix">
            <t:mask/>
            <section class="topKlaw">
                <div class="wrapper content_header clearfix">
                    <div class="work_nav">


                    </div><!-- end work_nav -->
                    <h1 class="title_kluby_ciemne">Kategoria</h1>
                </div>
            </section>
            <!-- end top -->

            <section class="wrapper">
                <div class="content " ng-controller="CategoryCtrl">

                    <div class="container">
                        <div class="row">

                            <div class="col-sm-6">
                                <!-- FORM ============ -->
                                <form name="form" ng-submit="submitForm(category, ${edit})" method="post" novalidate modelAttribute="category" enctype="text/plain">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                    <input type="hidden" path="id" id="id"/>

                                    <!-- NAME -->
                                    <div class="form-group" ng-class="{ 'has-error' : form.name.$invalid && !form.name.$pristine }">
                                        <label>Nazwa *</label>
                                        <input type="text" name="name" class="form-control" ng-model="category.name" required>
                                        <p ng-show="form.name.$invalid && !form.name.$pristine" class="help-block">Pole nazwa jest obowiązkowe.</p>
                                    </div>
                                    <c:choose>
                                        <c:when test="${edit}">
                                            <input type="submit" value="Zapisz" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/>
                                        </c:when>
                                        <c:otherwise>
                                            <input type="submit" value="Dodaj" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/>
                                        </c:otherwise>
                                    </c:choose>
                                    <input action="action" type="button" value="Powrót" onclick="history.go(-1);"/>
                                </form>
                            </div>
                        </div>
                    </div><!-- end content -->
                </div>
            </section>
        </section>
    </div>
</t:wrapper>
