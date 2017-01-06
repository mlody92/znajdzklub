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
                    <h1 class="title">Dodawanie klubu</h1>
                </div>
            </section>
            <!-- end top -->

            <section class="wrapper">

                <div class="content " ng-controller="ClubCtrl">

                    <div class="container">
                        <div class="row">

                            <div class="col-sm-6">
                                <!-- FORM ============ -->

                                <form name="form" ng-submit="submitForm(advert, ${edit})" method="post" novalidate modelAttribute="advert" enctype="multipart/form-data">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                    <input type="hidden" path="id" id="id"/>
                                    <div class="form-group" ng-class="{ 'has-error' : form.title.$invalid && !form.title.$pristine }">
                                        <label>Tytuł *</label>
                                        <input type="text" name="title" class="form-control" ng-model="advert.title" required>
                                        <p ng-show="form.title.$invalid && !form.title.$pristine" class="help-block">Pole tytuł jest obowiązkowe.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.description.$invalid && !form.description.$pristine }">
                                        <label>Opis *</label>
                                        <textarea type="text" name="description" class="form-control" ng-model="advert.description" required></textarea>
                                        <p ng-show="form.description.$invalid && !form.description.$pristine" class="help-block">Pole opis jest obowiązkowe.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.website.$invalid && !form.website.$pristine }">
                                        <label>Strona www</label>
                                        <input type="url" name="website" class="form-control" ng-model="advert.website" >
                                        <p ng-show="form.website.$invalid && !form.website.$pristine" class="help-block">Nieprawidłowy adres url</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.address.$invalid && !form.address.$pristine }">
                                        <label>Adres *</label>
                                        <input type="text" name="address" class="form-control" ng-model="advert.address" required>
                                        <p ng-show="form.address.$invalid && !form.address.$pristine" class="help-block">Pole adres jest obowiązkowe.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.email.$invalid && !form.email.$pristine }">
                                        <label>Email *</label>
                                        <input type="email" name="email" class="form-control" ng-model="advert.email">
                                        <p ng-show="form.email.$invalid && !form.email.$pristine" class="help-block">Wpisz poprawny adres e-mail.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.phone.$invalid && !form.phone.$pristine }">
                                        <label>Numer telefonu</label>
                                        <input type="phone" name="phone" class="form-control" ng-model="advert.phone">
                                        <p ng-show="form.phone.$invalid && !form.phone.$pristine" class="help-block">Wpisz poprawny numer telefonu.</p>
                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : form.postalCode.$invalid && !form.postalCode.$pristine }">
                                        <label>Kod pocztowy *</label>
                                        <input type="text" name="postalCode" class="form-control" ng-model="advert.postalCode">
                                        <p ng-show="form.postalCode.$invalid && !form.postalCode.$pristine" class="help-block">Wpisz poprawny kod pocztowy.</p>
                                    </div>

                                    <div class="form-group"  ng-class="{ 'has-error' : form.categoryId.$invalid && !form.categoryId.$pristine }">
                                        <label>Kategoria *</label>
                                        <select name="categoryId" ng-model="advert.categoryId" class="form-control input-sm" required ng-options="categoryId.id as categoryId.name for categoryId in categories">
                                            <option value="" disabled selected>Wybierz kategorię...</option>
                                        </select>
                                        <p ng-show="form.categoryId.$invalid && !form.categoryId.$pristine" class="help-block">Pole kategoria jest obowiązkowe.</p>
                                    </div>


                                    <%--<div class="form-group">--%>
                                        <%--<label>Zdjęcie</label>--%>
                                        <%--<input type="file" name="file">--%>
                                    <%--</div>--%>
                                    <c:choose>
                                        <c:when test="${edit}">
                                            <input type="submit" value="Zapisz" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/> or <input action="action" type="button" value="Powrót" onclick="history.go(-1);" />
                                        </c:when>
                                        <c:otherwise>
                                            <input type="submit" value="Dodaj" class="btn btn-primary btn-sm" ng-disabled="form.$invalid"/>
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

