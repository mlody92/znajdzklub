<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html manifest="" lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <script src="<c:url value='/scheduler/development.js' />"></script>
    <script src="<c:url value='/scheduler/examples-shared.js' />"></script>
    <title>Kalendarz zajeć</title>
</head>
<body>
<input action="action" type="button" value="Powrót" onclick="history.go(-1);"/>
</body>
</html>
