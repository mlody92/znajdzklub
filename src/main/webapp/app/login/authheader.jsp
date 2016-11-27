<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="authbar">
    <span>Użytkownik: <strong>${loggedinuser}</strong></span>
        <br>
        <a href="<c:url value="/logout" />">Wyloguj</a>
</div>