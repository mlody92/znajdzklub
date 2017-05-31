<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<nav>
    <ul>
        <li><a href="home" class="selected">Start</a></li>
        <sec:authorize access="isAnonymous()">
            <li><a href="register">Zarejestruj</a></li>
            <li><a href="login">Zaloguj</a></li>
            <li><a href="scheduler">Scheduler</a></li>
        </sec:authorize>
        <sec:authorize access="hasRole('ADMIN')">
            <li><a href="userList">Lista użytkowników</a></li>
            <li><a href="categoryList">Kategorie</a></li>
            <li><a href="clubsList">Lista klubów</a></li>
        </sec:authorize>
        <sec:authorize access="isAuthenticated()">
            <li>
                <%--<div id="dodajButton"></div>--%>
                <a onclick="App.clubs.addNew()" style="cursor:pointer;">Dodaj klub</a></li>
                <%--<a href="addAdvert">Dodaj klub</a></li>--%>
            <li><a href="myClubs">Moje kluby</a></li>
            <li><a href="edit-profile">Mój profil</a></li>
            <li>
                <%@include file="../login/authheader.jsp" %>
            </li>
        </sec:authorize>

    </ul>
</nav>