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
        $scope.favClassListSelectorLabel = lang.classPicker["favClassListSelectorLabel"];
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
    }])
    .controller("FirstVisit", ["$scope", function ($scope) {
        $scope.title = lang.firstVisit["title"];
        $scope.descriptions = lang.firstVisit["descriptions"];
        $scope.refresh = lang.firstVisit["refresh"];
        $scope.question_sign = lang.firstVisit["question_sign"];
        $scope.arrow_left = lang.firstVisit["arrow_left"];
        $scope.arrow_right = lang.firstVisit["arrow_right"];
        $scope.time = lang.firstVisit["time"];
        $scope.hamburger = lang.firstVisit["hamburger"];
        $scope.pushpin = lang.firstVisit["pushpin"];
        $scope.calendar = lang.firstVisit["calendar"];
        $scope.list = lang.firstVisit["list"];
        $scope.home = lang.firstVisit["home"];
        $scope.star = lang.firstVisit["star"];
        $scope.star_empty = lang.firstVisit["star_empty"];
        $scope.teacherMode = lang.firstVisit["teacherMode"];
        $scope.comingSoon = lang["comingSoon"];
        $scope.notMobileReady = lang.firstVisit["notMobileReady"];
        $scope.notmobileready_description = lang.firstVisit["notmobileready_description"];
        $scope.menuAndDialogTableTitle = lang.firstVisit["menuAndDialogTableTitle"];
        $scope.menuBarTableTitle = lang.firstVisit["menuBarTableTitle"];
        $scope.beginBtn = lang.firstVisit["beginBtn"];
    }]);
