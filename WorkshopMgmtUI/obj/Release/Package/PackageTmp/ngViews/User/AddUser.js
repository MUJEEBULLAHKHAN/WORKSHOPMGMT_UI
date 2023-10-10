WorkshopMgmtApp.factory('AddUserService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.AddUser = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Account/AddUser', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.GetRoles = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllRoleByWorkshopId?WorkshopId=' + WorkshopId,
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

WorkshopMgmtApp.controller('AddUserController', [
    '$scope', '$rootScope', 'AddUserService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, AddUserService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.AddUser = function (obj, IsProductive, valid) {

            if (valid) {
                if (obj.Password == obj.ConfirmPassword) {
                    if (IsProductive == undefined) {
                        IsProductive = true;
                    }
                    obj.IsProductive = IsProductive;
                    obj.MobileNo = obj.MobileNo.toString();
                    obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                    AddUserService.AddUser(obj).then(function (result) {
                        if (result.data.isSuccess) {
                            $scope.Users = result.data.Data;
                            $location.path("/Users");

                        }
                        else {
                            $scope.serverErrorMsgs = result.data.message;
                            alert($scope.serverErrorMsgs);
                        }

                    });
                }
                else {
                    alert("Password and Confirm Password should be match");
                }
            }

        }
        

        $scope.GetRoles = function () {
            AddUserService.GetRoles($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.RoleList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetRoles();
    }]);