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
                            <a href="userListDragAndDrop">Przełącz widok: Drag And Drop</a>
                            <div ng-controller="UserListCtrl" ng-cloak>
                                <md-content class="md-padding">
                                    <md-nav-bar
                                            md-selected-nav-item="currentNavItem"
                                            nav-bar-aria-label="navigation links">
                                        <md-nav-item md-nav-click="goto('aktywny')" name="aktywny" onclick="javascript:currentNavItem = 'aktywny'">
                                            Aktywni
                                        </md-nav-item>
                                        <md-nav-item md-nav-click="goto('nieaktywny')" name="nieaktywny" onclick="javascript:currentNavItem = 'nieaktywny'">
                                            Nieaktywni
                                        </md-nav-item>
                                        <md-nav-item md-nav-click="goto('zablokowany')" name="zablokowany" onclick="javascript:currentNavItem = 'zablokowany'">
                                            Zablokowani
                                        </md-nav-item>
                                        <!-- these require actual routing with ui-router or ng-route, so they
                                        won't work in the demo
                                        <md-nav-item md-nav-href="#page4" name="page5">Page Four</md-nav-item>
                                        <md-nav-item md-nav-sref="app.page5" name="page4">Page Five</md-nav-item>
                                        You can also add options for the <code>ui-sref-opts</code> attribute.
                                        <md-nav-item md-nav-sref="page6" sref-opts="{reload:true, notify:true}">
                                          Page Six
                                        </md-nav-item>
                                        -->
                                    </md-nav-bar>
                                        <%--<div class="ext-content">--%>
                                    <div>
                                        <div ui-grid="grid" class="table table-hover"/>
                                    </div>

                                        <%--<md-checkbox ng-model="disableInkBar">Disable Ink Bar</md-checkbox>--%>

                                </md-content>

                                    <%--<div ui-grid="grid" class="table table-hover"></div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>



</t:wrapper>

