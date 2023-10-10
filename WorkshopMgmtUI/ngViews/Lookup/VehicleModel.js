WorkshopMgmtApp.factory('VehicleModelsService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetVehicleModels = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllVehicleModel'
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.DeleteVehicleModel = function (VehicleModelId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/DeleteVehicleModel?VehicleModelId=' + VehicleModelId,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddVehicleModel = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/AddVehicleModel', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateVehicleModel = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/UpdateVehicleModel', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
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
        return AdminObj;

    }]);

WorkshopMgmtApp.controller('VehicleModelsController', [
    '$scope', '$rootScope', 'VehicleModelsService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, VehicleModelsService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetVehicleModels = function () {
            VehicleModelsService.GetVehicleModels().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleModelsList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetVehicleModels();
        $scope.GetVehicleMakes = function () {
            VehicleModelsService.GetVehicleMakes().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleMakeList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetVehicleMakes();
        $scope.AddVehicleModel = function (obj, valid) {

            if (valid) {
                VehicleModelsService.AddVehicleModel(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.VehicleModels = result.data.Data;
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
        $scope.EditVehicleModel = function (obj) {
            $scope.VehicleModelDetails = obj;
        }
        $scope.UpdateVehicleModel = function (obj, valid) {
            if (valid) {
                VehicleModelsService.UpdateVehicleModel(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UpdatedVehicleModel = result.data.Data;
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

        $scope.DeleteVehicleModel = function (VehicleModelId) {
            var result = ($rootScope.Language === "en") ? confirm("Are you sure for delete?") : confirm("هل أنت متأكد من الحذف؟");
            if (result) {

                VehicleModelsService.DeleteVehicleModel(VehicleModelId).then(function (result) {
                    if (result.data.isSuccess) {
                        //$scope.UpdatedVehicleModel = result.data.Data;
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