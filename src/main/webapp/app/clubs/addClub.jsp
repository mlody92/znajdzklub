<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<t:wrapper>
    <section class="main clearfix">

            <%--////--%>
        <section class="top">
            <div class="wrapper content_header clearfix">
                <div class="work_nav">
                </div><!-- end work_nav -->
                <h1 class="title">Dodawanie klubu</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">

            <div class="content ">

                <form:form method="POST" modelAttribute="advert" class="form-horizontal">
                    <form:input type="hidden" path="id" id="id"/>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Tytuł</label>
                            <div class="col-md-7">
                                <form:input type="text" path="title" id="title" class="form-control input-sm" ng-model="vm.advert.title"/>
                                <div class="has-error" ng-class="{ 'has-error': form.title.$dirty && form.title.$error.required }">
                                    <form:errors path="title" class="help-inline"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="description">Opis</label>
                            <div class="col-md-7">
                                <form:textarea type="text" path="description" id="description" class="form-control input-sm" ng-model="vm.advert.description"/>
                                <div class="has-error" ng-class="{ 'has-error': form.description.$dirty && form.description.$error.required }">
                                    <form:errors path="description" class="help-inline"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Strona www</label>
                            <div class="col-md-7">
                                <form:input type="text" path="website" id="website" class="form-control input-sm" ng-model="vm.advert.website"/>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Adres</label>
                            <div class="col-md-7">
                                <form:input type="text" path="address" id="address" class="form-control input-sm" ng-model="vm.advert.address"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">E-mail</label>
                            <div class="col-md-7">
                                <form:input type="email" path="email" id="email" class="form-control input-sm" ng-model="vm.advert.email"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Numer telefonu</label>
                            <div class="col-md-7">
                                <form:input type="phone" path="phone" id="phone" class="form-control input-sm" ng-model="vm.advert.phone"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Kod pocztowy</label>
                            <div class="col-md-7">
                                <form:input type="text" path="postalCode" id="phone" class="form-control input-sm" ng-model="vm.advert.postalCode"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="categoryId">Kategoria</label>
                            <div class="col-md-7">
                                <form:select path="categoryId" multiple="false" class="form-control input-sm">
                                    <option value="1">Kategoria 1</option>
                                    <option value="2">Admin</option>
                                </form:select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-actions floatRight">
                            <c:choose>
                                <c:when test="${edit}">
                                    <input type="submit" value="Update" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/userList' />">Cancel</a>
                                </c:when>
                                <c:otherwise>
                                    <input type="submit" value="Dodaj" class="btn btn-primary btn-sm"/> or <a href="<c:url value='/userList' />">Cancel</a>
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

