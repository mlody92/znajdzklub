<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
    <title>Magnetic - Stunning Responsive HTML5/CSS3 Photography Wensite Template</title>
    <meta charset="utf-8">
    <meta name="author" content="pixelhint.com">
    <meta name="description" content="Magnetic is a stunning responsive HTML5/CSS3 photography/portfolio website template"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
    <link href="<c:url value='/css/reset.css' />" rel="stylesheet"/>
    <link href="<c:url value='/css/main.css' />" rel="stylesheet"/>
    <script src="<c:url value='/scripts/js/jquery-2.0.3.min.js' />"></script>
    <script src="<c:url value='/scripts/js/main.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular.min.js' />"></script>
    <script src="<c:url value='/scripts/angular/angular-route.min.js' />"></script>
    <script src="<c:url value='/scripts/js/app.js' />"></script>
    <script src="<c:url value='/scripts/js/controllers.js' />"></script>
</head>
<body>

<header>
    <div class="logo">
        <a href="#/"><img src="<c:url value='/img/logo.png' />" title="Magnetic" alt="Magnetic"/></a>
    </div><!-- end logo -->

    <div id="menu_icon"></div>
    <nav>
        <ul>
            <li><a href="index.jsp" class="selected">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">The Team</a></li>
            <li><a href="#">Journal</a></li>
            <li><a href="#/pages/contact">Contact Us</a></li>
        </ul>
    </nav><!-- end navigation menu -->

    <div class="footer clearfix">
        <ul class="social clearfix">
            <li><a href="#" class="fb" data-title="Facebook"></a></li>
            <li><a href="#" class="google" data-title="Google +"></a></li>
            <li><a href="#" class="behance" data-title="Behance"></a></li>
            <!--<li><a href="#" class="twitter" data-title="Twitter"></a></li>
            <li><a href="#" class="dribble" data-title="Dribble"></a></li>-->
            <li><a href="#" class="rss" data-title="RSS"></a></li>
        </ul><!-- end social -->

        <div class="rights">
            <p>Copyright © 2014 magnetic.</p>
            <p>Template by <a href="">Pixelhint.com</a></p>
        </div><!-- end rights -->
    </div ><!-- end footer -->
</header><!-- end header -->

<section class="main clearfix">
        <div ng-view>
        </div>
</section><!-- end main -->

</body>
</html>




<%--<header>--%>
    <%--<div class="wrap">--%>
        <%--<!-- logo -->--%>
        <%--<a href="#!"><img class="logo" src="<c:url value='/img/logo.png' />" /></a>--%>
        <%--<!-- navigation menu -->--%>
        <%--<nav>--%>
            <%--<ul>--%>
                <%--<li><a id="workBtn" href="#!/" ng-class="{activeSmall:part == 'projects'}" >Our Projects</a></li>--%>
                <%--<li><a id="privacyBtn" href="#!/privacy" ng-class="{activeSmall:part == 'privacy'}">Privacy &amp; Terms</a></li>--%>
                <%--<li><a id="aboutBtn" href="#!/about" ng-class="{activeSmall:part == 'about'}">About</a></li>--%>
                <%--<li style="margin-right:0px"><a id="contactBtn" class="active" href="javascript: void(0)" ng-click="showForm()">Contact Us</a></li>--%>
            <%--</ul>--%>
        <%--</nav>--%>
    <%--</div>--%>
<%--</header>--%>

<%--<!-- contact us form -->--%>
<%--<div class="paddRow contactRow">--%>
    <%--<div class="wrap">--%>
        <%--<div class="head">Contact Us</div>--%>
        <%--<img class="close" src="<c:url value='/img/close.png' />" ng-click="closeForm()" />--%>
        <%--<form ng-submit="save()" class="contactForm" name="form" ng-hide="loaded">--%>
            <%--<input class="input" required="required" type="text" name="name" placeholder="your name" ng-model="message.name" />--%>
            <%--<input class="input email" required="required" type="email" name="email" value="" placeholder="your email" ng-model="message.email" /><br />--%>
            <%--<textarea class="textarea" rows="5" required="required" placeholder="your message" ng-model="message.text" ></textarea>--%>
            <%--<button class="btn green">send message</button>--%>
        <%--</form>--%>
        <%--<!-- contact us form response messages -->--%>
        <%--<div ng-show="process" style="text-align:center">--%>
            <%--<img class="loader" src="<c:url value='/img/loader.png' />" />--%>
        <%--</div>--%>
        <%--<div ng-show="success"><p>Your message has been sent, thank you.</p></div>--%>
    <%--</div>--%>
<%--</div>--%>

<%--<!-- main content -->--%>
<%--<div style="position:relative">--%>
    <%--<div style="width:100%" ng-view ng-animate="{enter: 'view-enter', leave: 'view-leave'}"></div>--%>
<%--</div>--%>


















<%--<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>--%>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>


<%--&lt;%&ndash;<!DOCTYPE html>&ndash;%&gt;--%>
<%--&lt;%&ndash;<html lang="en-US">&ndash;%&gt;--%>
<%--<html>--%>
<%--<head>--%>
    <%--<meta charset="UTF-8">--%>
    <%--<meta name="viewport" content="width=device-width, initial-scale=1.0" />--%>
    <%--<title>Free responsive Online Store template</title>--%>
    <%--<link href="<c:url value='/css/components.css' />" rel="stylesheet"/>--%>
    <%--<link href="<c:url value='/css/icons.css' />" rel="stylesheet"/>--%>
    <%--<link href="<c:url value='/css/responsee.css' />" rel="stylesheet"/>--%>

    <%--<script src="<c:url value='/scripts/js/jquery-1.8.3.min.js' />"></script>--%>
    <%--<script src="<c:url value='/scripts/js/jquery-ui.min.js' />"></script>--%>
    <%--<script src="<c:url value='/scripts/js/responsee.js' />"></script>--%>
    <%--<script src="<c:url value='/scripts/angular/angular.js' />"></script>--%>
    <%--<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800&subset=latin,latin-ext' rel='stylesheet' type='text/css'>--%>

<%--</head>--%>
<%--<body class="size-1280">--%>
<%--<!-- HEADER -->--%>
<%--<header>--%>
    <%--<div class="line">--%>
        <%--<div class="box">--%>
            <%--<div class="s-6 l-2">--%>
                <%--<img src="img/logo.png">--%>
            <%--</div>--%>
            <%--<div class="s-12 l-8 right">--%>
                <%--<div class="margin">--%>
                    <%--<form  class="customform s-12 l-8" method="get" action="http://google.com/">--%>
                        <%--<div class="s-9"><input type="text" placeholder="Search form" title="Search form" /></div>--%>
                        <%--<div class="s-3"><button type="submit">Search</button></div>--%>
                    <%--</form>--%>
                    <%--<div class="s-12 l-4">--%>
                        <%--<p class="right">3 items / EUR 199</p>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<!-- TOP NAV -->--%>
    <%--<div class="line">--%>
        <%--<nav>--%>
            <%--<p class="nav-text">Main navigation</p>--%>
            <%--<div class="top-nav s-12 l-10">--%>
                <%--<ul>--%>
                    <%--<li><a>Home</a></li>--%>
                    <%--<li>--%>
                        <%--<a>Product</a>--%>
                        <%--<ul>--%>
                            <%--<li><a>Product 1</a></li>--%>
                            <%--<li><a>Product 2</a></li>--%>
                            <%--<li>--%>
                                <%--<a>Product 3</a>--%>
                                <%--<ul>--%>
                                    <%--<li><a>Product 3-1</a></li>--%>
                                    <%--<li><a>Product 3-2</a></li>--%>
                                    <%--<li><a>Product 3-3</a></li>--%>
                                <%--</ul>--%>
                            <%--</li>--%>
                        <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li>--%>
                        <%--<a>Company</a>--%>
                        <%--<ul>--%>
                            <%--<li><a>About</a></li>--%>
                            <%--<li><a>Location</a></li>--%>
                        <%--</ul>--%>
                    <%--</li>--%>
                    <%--<li><a>Contact</a></li>--%>
                <%--</ul>--%>
            <%--</div>--%>
            <%--<div class="hide-s hide-m l-2">--%>
                <%--<i class="icon-facebook_circle icon2x right padding"></i>--%>
            <%--</div>--%>
        <%--</nav>--%>
    <%--</div>--%>
<%--</header>--%>
<%--<!-- ASIDE NAV AND CONTENT -->--%>
<%--<div class="line">--%>
    <%--<div class="box">--%>
        <%--<div class="margin2x">--%>
            <%--<!-- CONTENT -->--%>
            <%--<section class="s-12 m-8 l-9 right">--%>
                <%--<h1>Content</h1>--%>
                <%--<div class="margin">--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                    <%--<div class="s-12 m-6 l-4">--%>
                        <%--<img src="img/330x190-2.jpg">--%>
                        <%--<h4 class="margin-bottom"><strong>Name</strong> | EUR 20</h4>--%>
                        <%--<form class="customform s-12 margin-bottom2x" action="">--%>
                            <%--<div><button class="button rounded-btn submit-btn s-12" type="submit">Add to Cart</button></div>--%>
                        <%--</form>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</section>--%>
            <%--<!-- ASIDE NAV -->--%>
            <%--<aside class="s-12 m-4 l-3">--%>
                <%--<div class="aside-nav minimize-on-small">--%>
                    <%--<p class="aside-nav-text">Sidebar navigation</p>--%>
                    <%--<ul>--%>
                        <%--<li><a>Home</a></li>--%>
                        <%--<li>--%>
                            <%--<a>Product</a>--%>
                            <%--<ul>--%>
                                <%--<li><a>Product 1</a></li>--%>
                                <%--<li><a>Product 2</a></li>--%>
                                <%--<li>--%>
                                    <%--<a>Product 3</a>--%>
                                    <%--<ul>--%>
                                        <%--<li><a>Product 3-1</a></li>--%>
                                        <%--<li><a>Product 3-2</a></li>--%>
                                        <%--<li><a>Product 3-3</a></li>--%>
                                    <%--</ul>--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>
                        <%--<li>--%>
                            <%--<a>Company</a>--%>
                            <%--<ul>--%>
                                <%--<li><a>About</a></li>--%>
                                <%--<li><a>Location</a></li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>
                        <%--<li><a>Contact</a></li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
            <%--</aside>--%>
        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>
<%--<!-- FOOTER -->--%>
<%--<footer class="line">--%>
    <%--<div class="s-12 l-6">--%>
        <%--<p>Copyright 2016, Vision Design - graphic zoo</p>--%>
    <%--</div>--%>
    <%--<div class="s-12 l-6">--%>
        <%--<a class="right" href="http://www.myresponsee.com" title="Responsee - lightweight responsive framework">Design and coding by Responsee Team</a>--%>
    <%--</div>--%>
<%--</footer>--%>
<%--</body>--%>
<%--</html>--%>