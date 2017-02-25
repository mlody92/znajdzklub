<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" ng-disabled="true">
        <section class="main clearfix">
            <t:mask/>
            <section class="topUser">
                <div class="wrapper content_header clearfix">
                    <h1 class="title_kluby_jasne">Lista użytkowników</h1>
                </div>
            </section>
            <!-- end top -->
            <section class="wrapper">
                <div class="content ">
                    <div id="mainWrapper" ng-app="app">
                        <div class="panel panel-default">
                            <div ng-controller="UserListCtrl">
                                <div ui-grid="grid" class="table table-hover"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</t:wrapper>