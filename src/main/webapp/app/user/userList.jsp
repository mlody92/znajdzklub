<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <section class="main clearfix">
        <section class="top">
            <div class="wrapper content_header clearfix">
                <h1 class="title">Lista użytkowników</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper" ng-app="app">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div  ng-controller="UserListCtrl">
                            <div ui-grid="gridOptions" class="table table-hover"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-md-offset-3">
                </div>
            </div>
            </div><!-- end content -->
        </section>
    </section>
</t:wrapper>