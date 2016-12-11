<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <section class="main clearfix">
    <div class="generic-container">
        <div class="alert alert-success lead">
                ${success}
        </div>

        <span class="well floatRight">
            <a href="<c:url value='/login' />">Zaloguj</a>
        </span>
    </div>
        </section>
</t:wrapper>