<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>

    <div ng-app="app" ng-controller="draggableCtrl" ng-disabled="true">
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
                    <div id="mainWrapper">
                        <div class="panel panel-default">
                            <a href="userList">Przełącz widok: Grid</a>
                            <div ng-cloak>
                                <p>( Drag car from the <strong>list of cars</strong> to the <strong>basket</strong>. )</p>
                                <div class="rows">

                                    <div class="col-md-3">
                                        <ul id="aktywny-list" class="list-group">
                                            <li class="list-group-item active">Aktywni</li>
                                            <!-- ========== Usage Drag ========== -->
                                            <li class="list-group-item"
                                                ad-drag="true"
                                                ad-drag-data="user"
                                                ad-drag-begin="onDragStart($data, $dragElement, $event);"
                                                ad-drag-end="onDragEnd($data, $dragElement, $lastDropElement, $event);"
                                                ad-drop="true"
                                                ad-drop-over="onDragOver($data, $dragElement, $dropElement, $event);"
                                                ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                ad-drop-end="onDrop($data, 'aktywny',$dragElement, $dropElement, $event);"
                                                ng-repeat="user in models.aktywny">
          <span>
            <span class="glyphicon glyphicon-th"></span>
            {{ user.login }} - {{ user.email }}
          </span>
                                            </li>
                                            <li class="list-group-item"
                                                ad-drop="true"
                                                ad-drop-over="onDragOver($data, $dragElement, $dropElement, $event);"
                                                ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                ad-drop-end="onDrop($data, 'aktywny',$dragElement, $dropElement, $event);"
                                                ng-hide="models.aktywny.length">
                                                <span> Dodaj</span>
                                            </li>
                                        </ul>
                                    </div>


                                    <div class="col-md-3">
                                        <ul id="nieaktywny-list" class="list-group">
                                            <li class="list-group-item active">Nieaktywni</li>
                                            <!-- ========== Usage Drag ========== -->
                                            <li class="list-group-item"
                                                ad-drag="true"
                                                ad-drag-data="user"
                                                ad-drag-begin="onDragStart($data, $dragElement, $event);"
                                                ad-drag-end="onDragEnd($data, $dragElement, $lastDropElement, $event);"
                                                ad-drop="true"
                                                ad-drop-over="onDragOver($data, $dragElement, $dropElement, $event);"
                                                ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                ad-drop-end="onDrop($data, 'nieaktywny',$dragElement, $dropElement, $event);"
                                                ng-repeat="user in models.nieaktywny">
          <span>
            <span class="glyphicon glyphicon-th"></span>
            {{ user.login }} - {{ user.email }}
          </span>
                                            </li>
                                            <li class="list-group-item"

                                                ng-hide="models.nieaktywny.length">
                                                <span  ad-drop="true"
                                                       ad-drop-over="onDragOver($data, 'nieaktywny', $dropElement, $event);"
                                                       ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                       ad-drop-end="onDrop($data, 'nieaktywny',$dragElement, $dropElement, $event);"> Dodaj</span>
                                            </li>
                                        </ul>
                                    </div>


                                    <div class="col-md-3">
                                        <ul id="zablokowany-list" class="list-group">
                                            <li class="list-group-item active">Zablokowany</li>
                                            <!-- ========== Usage Drag ========== -->
                                            <li class="list-group-item"
                                                ad-drag="true"
                                                ad-drag-data="user"
                                                ad-drag-begin="onDragStart($data, $dragElement, $event);"
                                                ad-drag-end="onDragEnd($data, $dragElement, $lastDropElement, $event);"
                                                ad-drop="true"
                                                ad-drop-over="onDragOver($data, $dragElement, $dropElement, $event);"
                                                ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                ad-drop-end="onDrop($data, 'zablokowany',$dragElement, $dropElement, $event);"
                                                ng-repeat="user in models.zablokowany">
          <span>
            <span class="glyphicon glyphicon-th"></span>
            {{ user.login }} - {{ user.email }}
          </span>
                                            </li>
                                            <li class="list-group-item"
                                                ad-drop="true"
                                                ad-drop-over="onDragOver($data, 'zablokowany', $dropElement, $event);"
                                                ad-drop-leave="onDragLeave($data, $dragElement, $dropElement, $event)"
                                                ad-drop-end="onDrop($data, 'zablokowany',$dragElement, $dropElement, $event);"
                                                ng-hide="models.zablokowany.length">
                                                <span> Dodaj2</span>
                                            </li>
                                        </ul>
                                    </div>


                                        <%--<div class="col-md-3">--%>
                                        <%--<ul class="list-group">--%>
                                        <%--<!-- =========== Drag with handles ============= -->--%>
                                        <%--<li class="list-group-item"--%>
                                        <%--ad-drag="true"--%>
                                        <%--ad-drag-handle="true"--%>
                                        <%--id="drag-handle-demo">--%>
                                        <%--<span class="ad-drag-handle glyphicon glyphicon-align-justify"></span>--%>
                                        <%--Drag me using my handle--%>
                                        <%--</li>--%>
                                        <%--<!-- =========== Drag on the whole element ============= -->--%>
                                        <%--<li class="list-group-item"--%>
                                        <%--ad-drag="true"--%>
                                        <%--id="drag-element-demo">--%>
                                        <%--Drag me without handle--%>
                                        <%--</li>--%>
                                        <%--<!-- =========== Prevent drag on parts of the element ============= -->--%>
                                        <%--<li class="list-group-item"--%>
                                        <%--ad-drag="true"--%>
                                        <%--id="drag-prevent-demo">--%>
                                        <%--Drag me, except <strong ad-prevent-drag>this bold text</strong></li>--%>
                                        <%--</li>--%>
                                        <%--</ul>--%>
                                        <%--</div>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>

</t:wrapper>

