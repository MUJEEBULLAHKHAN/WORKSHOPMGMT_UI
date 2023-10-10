WorkshopMgmtApp.factory('RolesService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetRoles = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllRoleByWorkshopId?WorkshopId=' + WorkshopId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.DeleteRole = function (RoleId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/DeleteRole?RoleId=' + RoleId,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddRole = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/AddRole', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateRole = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/UpdateRole', data: obj,
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

WorkshopMgmtApp.controller('RolesController', [
    '$scope', '$rootScope', 'RolesService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, RolesService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetRoles = function () {
            RolesService.GetRoles($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.RolesList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetRoles();
        $scope.AddRole = function (obj, valid) {

            if (valid) {

                obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                RolesService.AddRole(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.Roles = result.data.Data;
                        alert(result.data.message);
                        location.reload();
                        
                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }

                });

            }

        }
        $scope.EditRole = function (obj) {
            $scope.RoleDetails = obj;
        }
        $scope.UpdateRole = function (obj, valid) {
            if (valid) {
                obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                RolesService.UpdateRole(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UpdatedRole = result.data.Data;
                        alert(result.data.message);
                        location.reload();

                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }

                });
            }
        }

        $scope.DeleteRole = function (RoleId) {
            var result = ($rootScope.Language === "en") ? confirm("Are you sure for delete?") : confirm("هل أنت متأكد من الحذف؟");
            if (result) {
               
                RolesService.DeleteRole(RoleId).then(function (result) {
                    if (result.data.isSuccess) {
                        //$scope.UpdatedRole = result.data.Data;
                        alert(result.data.message);
                        location.reload();

                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }

                });
            }
        }

    }]);