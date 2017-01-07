<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" ng-disabled="true">
        <section class="main clearfix">
            <div id="cover" ng-show="mask">
                <div>
                    <md-progress-circular id="mask" md-mode="indeterminate" md-diameter="96"></md-progress-circular>
                </div>
            </div>

            <section class="top">
                <div class="wrapper content_header clearfix">
                    <div class="work_nav">

                        <ul class="btn clearfix">
                            <li><a href="#" class="previous" data-title="Previous"></a></li>
                            <li><a href="index.html" class="grid" data-title="Portfolio"></a></li>
                            <li><a href="#" class="next" data-title="Next"></a></li>
                        </ul>

                    </div><!-- end work_nav -->
                    <h1 class="title">Kategoria</h1>
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
                                            <input type="submit" value="Zapisz" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/> <input action="action" type="button"
                                                                                                                                                               value="Powrót"
                                                                                                                                                               onclick="history.go(-1);"/>
                                        </c:when>
                                        <c:otherwise>
                                            <input type="submit" value="Dodaj" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/> <input action="action" type="button"
                                                                                                                                                      value="Powrót"
                                                                                                                                                      onclick="history.go(-1);"/>
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
