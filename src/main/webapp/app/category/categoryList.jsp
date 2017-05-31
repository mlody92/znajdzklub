<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:wrapper>

    <section class="main clearfix" ng-app="app">
        <section class="topKlaw">
            <div class="wrapper content_header clearfix">
                <h1 class="title_kluby_jasne">Kategorie</h1>
            </div>
        </section>
        <!-- end top -->

        <section class="wrapper" ng-controller="CategoryListCtrl">

            <script type="text/ng-template" id="myModalContent.html">
                <div class="modal-header">
                    <h3>Dodawanie kategorii!</h3>
                </div>
                <form ng-submit="submit()" modelAttribute="category">
                    <div class="modal-body">
                        <div class="form-group" ng-class="{ 'has-error' : form.name.$invalid && !form.name.$pristine }">
                            <label>Nazwa *</label>
                            <input type="text" name="name" class="form-control" ng-model="category.name" required>
                            <p ng-show="form.name.$invalid && !form.name.$pristine" class="help-block">Pole nazwa jest obowiązkowe.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" ng-click="cancel()">Anuluj</button>
                        <input type="submit" class="btn primary-btn" value="Dodaj"/>
                    </div>
                </form>
            </script>

            <div class="content ">
                <div id="mainWrapper">
                    <div class="panel panel-default">
                        <%--<a href="addCategory">Dodaj kategorię</a>--%>
                        <a ng-click="open()" style="cursor: pointer;">Dodaj kategorię</a>
                        <!-- Default panel contents -->
                        <div >
                            <div ui-grid="grid" class="table table-hover"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-md-offset-3">
                </div>
            </div><!-- end content -->
        </section>
    </section>



</t:wrapper>