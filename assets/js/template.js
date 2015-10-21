/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/app.d.ts" />
angular.module("vpTemplate", [])
    .controller("MenuButtons", ["$scope", function ($scope) {
        $scope.title = lang.hamburgerMenu["title"];
        $scope.viewLabel = lang.hamburgerMenu["viewLabel"];
        $scope.calendarBtn = lang.hamburgerMenu["calendarBtn"];
        $scope.listBtn = lang.hamburgerMenu["listBtn"];
        $scope.refreshClassListBtn = lang.hamburgerMenu["refreshClassListBtn"];
        $scope.aboutBtn = lang.hamburgerMenu["aboutBtn"];
        $scope.aboutTxt = lang.hamburgerMenu["aboutTxt"];
        $scope.close = lang["closeBtn"];
    }])
    .controller("ClassPicker", ["$scope", function ($scope) {
        $scope.title = lang.classPicker["title"];
        $scope.bigPlan = lang.classPicker["bigPlan"];
        $scope.classListSelectorLabel = lang.classPicker["classListSelectorLabel"];
        $scope.favClassListSelectorlabel = lang.classPicker["favClassListSelectorLabel"];
        $scope.dismissBtn = lang["dismissBtn"];
        $scope.selectBtn = lang["selectBtn"];
    }])
    .controller("LoginDialog", ["$scope", function ($scope) {
        $scope.title = lang.login["title"];
        $scope.descriptions = lang.login["descriptions"];
        $scope.wrongCredentialsAlert = lang.login["wrongCredentialsAlert"];
        $scope.username = lang.login["username"];
        $scope.password = lang.login["password"];
        $scope.dismissBtn = lang["dismissBtn"];
        $scope.loginBtn = lang.login["loginBtn"];
    }]);
