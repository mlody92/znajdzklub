<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:wrapper>
    <section class="main clearfix">
        <div class="generic-container">
            <div class="authbar">
                <span>Drogi <strong>${loggedinuser}</strong>, Nie posiadasz uprawnień do przeglądania tej strony.</span> <span class="floatRight"><a href="<c:url value="/logout" />">Wyloguj</a></span>
            </div>
        </div>
    </section>
</t:wrapper>
