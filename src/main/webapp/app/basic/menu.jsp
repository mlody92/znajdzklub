<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<nav>
    <ul>
        <li><a href="home" class="selected">Start</a></li>
        <sec:authorize access="isAnonymous()">
            <li><a href="register">Zarejestruj</a></li>
            <li><a href="login">Zaloguj</a></li>
        </sec:authorize>
        <li><a href="addAdvert">Dodaj klub</a></li>
        <li><a href="addCategory">Dodaj kategorię</a></li>
        <sec:authorize access="isAuthenticated()">
            <li><a href="userList">Lista użytkowników</a></li>
            <li><a href="categoryList">Lista kategorii</a></li>
            <li>
                <%@include file="../login/authheader.jsp" %>
            </li>
        </sec:authorize>

        <li><a href="clubsList">Lista klubów</a></li>
    </ul>
</nav>