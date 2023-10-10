WorkshopMgmtApp.factory('VehicleMakesService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetVehicleMakes = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllVehicleMake'
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.DeleteVehicleMake = function (VehicleMakeId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/DeleteVehicleMake?VehicleMakeId=' + VehicleMakeId,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddVehicleMake = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/AddVehicleMake', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateVehicleMake = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/UpdateVehicleMake', data: obj,
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

WorkshopMgmtApp.controller('VehicleMakesController', [
    '$scope', '$rootScope', 'VehicleMakesService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, VehicleMakesService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetVehicleMakes = function () {
            VehicleMakesService.GetVehicleMakes().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleMakesList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetVehicleMakes();
        $scope.AddVehicleMake = function (obj, valid) {

            if (valid) {
                VehicleMakesService.AddVehicleMake(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.VehicleMakes = result.data.Data;
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
        $scope.EditVehicleMake = function (obj) {
            $scope.VehicleMakeDetails = obj;
        }
        $scope.UpdateVehicleMake = function (obj, valid) {
            if (valid) {
                VehicleMakesService.UpdateVehicleMake(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UpdatedVehicleMake = result.data.Data;
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

        $scope.DeleteVehicleMake = function (VehicleMakeId) {
            var result = ($rootScope.Language === "en") ? confirm("Are you sure for delete?") : confirm("هل أنت متأكد من الحذف؟");
            if (result) {

                VehicleMakesService.DeleteVehicleMake(VehicleMakeId).then(function (result) {
                    if (result.data.isSuccess) {
                        //$scope.UpdatedVehicleMake = result.data.Data;
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