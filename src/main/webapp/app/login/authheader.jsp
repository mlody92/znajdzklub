
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="authbar">
    <span>Dear <strong>${loggedinuser}</strong>,
        Welcome to CrazyUsers.</span> <span class="floatRight">
    <a href="<c:url value="/logout" />">Logout</a></span>
</div>