WorkshopMgmtApp.factory('ColorsService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetColors = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllColor'
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.DeleteColor = function (ColorId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/DeleteColor?ColorId=' + ColorId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddColor = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/AddColor', data: obj
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateColor = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/UpdateColor', data: obj
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

WorkshopMgmtApp.controller('ColorsController', [
    '$scope', '$rootScope', 'ColorsService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, ColorsService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetColors = function () {
            ColorsService.GetColors().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.ColorsList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetColors();
        $scope.AddColor = function (obj, valid) {

            if (valid) {
                ColorsService.AddColor(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.Colors = result.data.Data;
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
        $scope.EditColor = function (obj) {
            $scope.ColorDetails = obj;
        }
        $scope.UpdateColor = function (obj, valid) {
            if (valid) {
                ColorsService.UpdateColor(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UpdatedColor = result.data.Data;
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

        $scope.DeleteColor = function (ColorId) {
            var result = confirm("Are you sure for delete?");
            if (result) {

                ColorsService.DeleteColor(ColorId).then(function (result) {
                    if (result.data.isSuccess) {
                        //$scope.UpdatedColor = result.data.Data;
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