<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<t:wrapper>
    <section class="main clearfix">
            <%--////--%>
        <section class="top">
            <div class="wrapper content_header clearfix">
                <div class="work_nav">
                </div><!-- end work_nav -->
                <h1 class="title">Dodawanie kategorii</h1>
            </div>
        </section>
        <!-- end top -->
        <section class="wrapper">
            <div class="content ">
                <form:form method="POST" modelAttribute="category" class="form-horizontal">
                    <form:input type="hidden" path="id" id="id"/>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label class="col-md-3 control-lable" for="title">Nazwa</label>
                            <div class="col-md-7">
                                <form:input type="text" path="name" id="name" class="form-control input-sm" ng-model="vm.category.name"/>
                                <div class="has-error" ng-class="{ 'has-error': form.name.$dirty && form.name.$error.required }">
                                    <form:errors path="name" class="help-inline"/>
                                </div>
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

