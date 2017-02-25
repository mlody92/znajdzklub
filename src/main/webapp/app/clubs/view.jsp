<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<t:wrapper>
    <div ng-app="app" ng-disabled="true" ng-controller="ClubCtrl" modelAttribute="advert">
        <section class="main clearfix">
            <t:mask/>

            <c:choose>
                <c:when test="${advert.categoryId==1}">
                    <section class="topSztukiWalki">
                        <div class="wrapper content_header clearfix">
                            <h1 class="title_kluby_ciemne">{{advert.title}}</h1>
                        </div>
                    </section>
                </c:when>
                <c:when test="${advert.categoryId==5}">
                    <section class="topTaniec">
                        <div class="wrapper content_header clearfix">
                            <h1 class="title_kluby_jasne">{{advert.title}}</h1>
                        </div>
                    </section>
                </c:when>
            </c:choose>

            <!-- end top -->

            <section class="wrapper">

                <div class="content " ng-controller="ClubCtrl">

                    <div class="container">
                        <div class="row">

                            <div class="col-sm-6">

                                <table>
                                    <tr>
                                        <td><label>Opis:</label></td>
                                        <td><span>{{advert.description}}</span></td>
                                    <tr>
                                        <td><label>Strona www: </label></td>
                                        <td><a href="{{advert.website}}">{{advert.website}}</a></td>
                                    </tr>
                                    <tr>
                                        <td><label>Adres: </label></td>
                                        <td><span>{{advert.address}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><label>Email: </label></td>
                                        <td><span>{{advert.email}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><label>Telefon: </label></td>
                                        <td><span>{{advert.phone}}</span></td>
                                    </tr>
                                    <tr>
                                        <td><label>Kod pocztowy:</label></td>
                                        <td><span>{{advert.postalCode}}</span></td>
                                    </tr>
                                </table>
                                <a onclick="history.go(-1);" href>Powrót</a>
                            </div>
                        </div>
                    </div><!-- end content -->
                </div>
            </section>
        </section>
    </div>
</t:wrapper>

