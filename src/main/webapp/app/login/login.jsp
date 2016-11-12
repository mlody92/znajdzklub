<section class="top">
    <div class="wrapper content_header clearfix">
        <div class="work_nav">

            <ul class="btn clearfix">
                <li><a href="#" class="previous" data-title="Previous"></a></li>
                <li><a href="index.html" class="grid" data-title="Portfolio"></a></li>
                <li><a href="#" class="next" data-title="Next"></a></li>
            </ul>

        </div><!-- end work_nav -->
        <h1 class="title">Logowanie</h1>
    </div>
</section>
<!-- end top -->

<section class="wrapper">
    <div class="content ">


        <%--<div class="col-md-6 col-md-offset-3">--%>
            <form name="form" ng-submit="form.$valid && vm.login()" novalidate>
                <div class="form-group" ng-class="{ 'has-error': form.$submitted && form.username.$invalid }">
                    <label for="username">Username</label>
                    <input type="text" name="username" class="form-control" ng-model="vm.username" required />
                    <div ng-messages="form.$submitted && form.username.$error" class="help-block">
                        <div ng-message="required">Username is required</div>
                    </div>
                </div>
                <div class="form-group" ng-class="{ 'has-error': form.$submitted && form.password.$invalid }">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" ng-model="vm.password" required />
                    <div ng-messages="form.$submitted && form.password.$error" class="help-block">
                        <div ng-message="required">Password is required</div>
                    </div>
                </div>
                <div class="form-group">
                    <button ng-disabled="vm.loading" class="btn btn-primary">Login</button>
                    <img ng-if="vm.loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
                <div ng-if="vm.error" class="alert alert-danger">{{vm.error}}</div>
            </form>

            <div class="alert alert-info">
                Username: test<br />
                Password: test
            </div>





              <%--proba servlet logowanie--%>
            <form:form id="loginForm" method="post" action="login" modelAttribute="loginBean">

                <form:label path="username">Enter your user-name</form:label>
                <form:input id="username" name="username" path="username" /><br>
                <form:label path="username">Please enter your password</form:label>
                <form:password id="password" name="password" path="password" /><br>
                <input type="submit" value="Submit" />
            </form:form>
        <%--</div>--%>
    </div><!-- end content -->
</section>







<%--<div class="col-md-6 col-md-offset-3">--%>
    <%--<h2>Login</h2>--%>
    <%--<form name="form" ng-submit="vm.login()" role="form">--%>
        <%--<div class="form-group" ng-class="{ 'has-error': form.username.$dirty && form.username.$error.required }">--%>
            <%--<label for="username">Username</label>--%>
            <%--<input type="text" name="username" id="username" class="form-control" ng-model="vm.username" required />--%>
            <%--<span ng-show="form.username.$dirty && form.username.$error.required" class="help-block">Username is required</span>--%>
        <%--</div>--%>
        <%--<div class="form-group" ng-class="{ 'has-error': form.password.$dirty && form.password.$error.required }">--%>
            <%--<label for="password">Password</label>--%>
            <%--<input type="password" name="password" id="password" class="form-control" ng-model="vm.password" required />--%>
            <%--<span ng-show="form.password.$dirty && form.password.$error.required" class="help-block">Password is required</span>--%>
        <%--</div>--%>
        <%--<div class="form-actions">--%>
            <%--<button type="submit" ng-disabled="form.$invalid || vm.dataLoading" class="btn btn-primary">Login</button>--%>
            <%--<img ng-if="vm.dataLoading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />--%>
            <%--<a href="#/pages/register" class="btn btn-link">Register</a>--%>
        <%--</div>--%>
    <%--</form>--%>
<%--</div>--%>