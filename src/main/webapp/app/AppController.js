'use strict';
// var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ngMaterial', 'ui.grid.resizeColumns', 'ngRoute']);
app.controller('AppCtrl', ['$interval',
    function ($interval) {
        var self = this;
        self.activated = true;
        self.determinateValue = 30;

        // Iterate every 100ms, non-stop and increment
        // the Determinate loader.
        $interval(function () {
            self.determinateValue += 1;
            if (self.determinateValue > 100) {
                self.determinateValue = 30;
            }
        }, 100);
    }
]);
