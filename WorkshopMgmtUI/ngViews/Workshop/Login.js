WorkshopMgmtApp.factory('LoginService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.Login = function (EmailId, Password) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Account/WorkshopLogin?EmailId=' + EmailId + '&Password=' + Password,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        
        AdminObj.UserLogin = function (EmailId, Password) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Account/UserLogin?EmailId=' + EmailId + '&Password=' + Password,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.OwnerLogin = function (EmailId, Password) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Account/OwnerLogin?EmailId=' + EmailId + '&Password=' + Password,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        return AdminObj;

    }]);

WorkshopMgmtApp.controller('LoginController', [
    '$scope', '$rootScope', 'LoginService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, LoginService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {
        $scope.SetLanguage = function () {
            if (localStorage.getItem("lang") != null) {
                $scope.langname = localStorage.getItem("lang");
            }
            else {
                $scope.langname = 'en';
            }
        }
        $scope.SetLanguage();
        $scope.Login = function () {
            if ($scope.UserType == undefined) {
                $scope.UserType = 'Workshop';
            }
            if ($scope.UserType == 'Workshop') {
                LoginService.Login($scope.EmailId, $scope.Password).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.LoginDetails = result.data.data;
                        $cookies.put("Auth", "User");
                        $rootScope.Auth = $cookies.get("Auth");
                        $cookies.put("SidebarHide", "false");
                        $cookies.put("UserSignIn", JSON.stringify($scope.LoginDetails));
                        $rootScope.UserSignIn = JSON.parse($cookies.get("UserSignIn"));
                        $scope.UserType = '';
                        $location.path('/Users');

                    } else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }

                });
            }
            else if ($scope.UserType == 'Owner') {
                LoginService.OwnerLogin($scope.EmailId, $scope.Password).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UserLoginDetails = result.data.data;
                        $cookies.put("Auth", "User");
                        $rootScope.Auth = $cookies.get("Auth");
                        $cookies.put("SidebarHide", "false");
                        $cookies.put("UserSignIn", JSON.stringify($scope.UserLoginDetails));
                        $rootScope.UserSignIn = JSON.parse($cookies.get("UserSignIn"));
                        $scope.UserType = '';
                        $location.path('/Workshop');

                    } else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }


                });
            }
            else {
                LoginService.UserLogin($scope.EmailId, $scope.Password).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UserLoginDetails = result.data.data;
                        $cookies.put("Auth", "User");
                        $rootScope.Auth = $cookies.get("Auth");
                        $cookies.put("SidebarHide", "false");
                        $cookies.put("UserSignIn", JSON.stringify($scope.UserLoginDetails));
                        $rootScope.UserSignIn = JSON.parse($cookies.get("UserSignIn"));
                        $scope.UserType = '';
                        $location.path('/Job');

                    } else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }


                });
            }
        }

        $scope.RadioChange = function (lang) {
            if (lang == 'ar') {
                localStorage.setItem("lang", 'ar');
            }
            else {
                localStorage.setItem("lang", 'en');
            }
            location.reload();
        }
    }]);