<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>
    <section class="main clearfix">
        <section class="topKlaw">
            <div class="wrapper content_header clearfix">
                <h1 class="title_kluby_ciemne">Lista klubów</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper">
            <div class="content ">
                <div id="mainWrapper" ng-app="app">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->

                            <%--ANGULAR LISTA KLUBÓW--%>
                            <%--<div ng-controller="ClubListCtrl">--%>
                            <%--<div ui-grid="grid" class="table table-hover"></div>--%>
                            <%--</div>--%>


                        <div id="test"></div>
                        <%--<div id="test2"></div>--%>
                    </div>
                    <div class="col-md-6 col-md-offset-3">
                    </div>
                </div>

            </div>

            </div><!-- end content -->
        </section>
    </section>

    <script>
        Ext.onReady(function () {
            App.clubs.createClubList();
//            Ext.create('Abstrakcyjna.Formularz',{
//                renderTo: 'test2'
//            });
//            App.example.getData({url:'listCategory'});
        });
    </script>
</t:wrapper>