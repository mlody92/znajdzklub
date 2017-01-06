<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <div ng-app="app" ng-controller="AppCtrl" ng-disabled="true">
        <section class="main clearfix">
            <div id="cover" ng-show="mask">
                <div>
                    <md-progress-circular id="mask" md-mode="indeterminate" md-diameter="96"></md-progress-circular>
                </div>
            </div>
            <section class="topTaniec"></section>
            <!-- end top -->
            <section class="wrapper">
                <div class="content ">
                    <div id="mainWrapper" ng-app="app">
                        <div class="panel panel-default">
                            <!-- Default panel contents -->
                            <div ng-controller="ClubListViewCtrl" ng-init="categoryId = ${categoryId}">
                                <div ui-grid="gridOptions" class="table table-hover"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-md-offset-3">
                    </div>
                </div>
            </section>

        </section>
    </div>
</t:wrapper>


