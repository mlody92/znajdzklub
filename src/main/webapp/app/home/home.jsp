<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="work">
    <a href="#inner/inner">
        <img src="<c:url value='/img/work1.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work2.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work3.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work4.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work5.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work6.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work2.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work3.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>

<div class="work">
    <a href="inner.jsp">
        <img src="<c:url value='/img/work1.jpg' />" class="media" alt=""/>
        <div class="caption">
            <div class="work_title">
                <h1>culpa qui officia deserunt mollit</h1>
            </div>
        </div>
    </a>
</div>



<%--<div style="width:100%">--%>
    <%--<a class="projectObj" href="#!/project/product1" style="background-color:#87b822">--%>
        <%--<div class="wrap">--%>
            <%--<div class="name">Product #1</div>--%>
            <%--<img class="img" src="images/element.png" />--%>
        <%--</div>--%>
    <%--</a>--%>
    <%--<a class="projectObj" href="#!/project/product2" style="background-color:#3f91d2">--%>
        <%--<div class="wrap">--%>
            <%--<div class="name">Product #2</div>--%>
            <%--<img class="img" src="images/element.png" />--%>
        <%--</div>--%>
    <%--</a>--%>
    <%--<a class="projectObj" href="#!/project/product3" style="background-color:#f1784d">--%>
        <%--<div class="wrap">--%>
            <%--<div class="name">Product #3</div>--%>
            <%--<img class="img" src="images/element.png" />--%>
        <%--</div>--%>
    <%--</a>--%>
    <%--<a class="projectObj" href="#!/project/product4" style="background-color:#f0c42c">--%>
        <%--<div class="wrap">--%>
            <%--<div class="name">Product #4</div>--%>
            <%--<img class="img" src="images/element.png" />--%>
        <%--</div>--%>
    <%--</a>--%>
    <%--<ng-include src="'pages/footer.html'"></ng-include>--%>
<%--</div>--%>
<%--<script>--%>
    <%--$('.projectObj').bind('click', function (e) {--%>
        <%--e.preventDefault();--%>
        <%--var me = this;--%>
        <%--var width = $(me).width() / 1.5;--%>
        <%--$(me).find('.wrap').width($(me).find('.wrap').width());--%>
        <%--$(me).animate({--%>
            <%--opacity: 0,--%>
            <%--marginLeft: -width--%>
        <%--}, 500);--%>
        <%--var delayN = 150;--%>
        <%--var delayP = 150;--%>
        <%--var nextEl = $(me).nextAll('.projectObj');--%>
        <%--var prevEl = $(me).prevAll('.projectObj');--%>
        <%--nextEl.each(function (index, elem) {--%>
            <%--setTimeout(function () {--%>
                <%--$(elem).find('.wrap').width($(elem).find('.wrap').width());--%>
                <%--$(elem).animate({--%>
                    <%--opacity: 0,--%>
                    <%--marginLeft: -width--%>
                <%--}, 500, function () {--%>
                <%--});--%>
            <%--}, delayN);--%>
            <%--delayN += 100;--%>
        <%--});--%>
        <%--prevEl.each(function (index, elem) {--%>
            <%--setTimeout(function () {--%>
                <%--$(elem).find('.wrap').width($(elem).find('.wrap').width());--%>
                <%--$(elem).animate({--%>
                    <%--opacity: 0,--%>
                    <%--marginLeft: -width--%>
                <%--}, 500, function () {--%>
                <%--});--%>
            <%--}, delayP);--%>
            <%--delayP += 100;--%>
        <%--});--%>
        <%--setTimeout(function () {--%>
            <%--document.location = $(me).attr('href');--%>
        <%--},1000)--%>
        <%--return false;--%>
    <%--});--%>
<%--</script>--%>