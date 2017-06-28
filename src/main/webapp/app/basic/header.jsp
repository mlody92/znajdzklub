<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<header>
    <div class="logo">
        <a href="home"><img src="<c:url value='/img/logo.png' />" title="Znajdź klub" alt="Znajdź klub"/></a>
    </div>

    <div id="menu_icon"></div>
    <%@ include file="/app/basic/menu.jsp" %>

    <div class="footer clearfix">
        <%--<ul class="social clearfix">--%>
            <%--<li><a href="#" class="fb" data-title="Facebook"></a></li>--%>
            <%--<li><a href="#" class="google" data-title="Google +"></a></li>--%>
            <%--<li><a href="#" class="behance" data-title="Behance"></a></li>--%>
            <%--<li><a href="#" class="rss" data-title="RSS"></a></li>--%>
        <%--</ul>--%>

        <div class="rights">
            <p>Copyright © 2016 ZnajdźKlub</p>
        </div>
    </div>
</header>