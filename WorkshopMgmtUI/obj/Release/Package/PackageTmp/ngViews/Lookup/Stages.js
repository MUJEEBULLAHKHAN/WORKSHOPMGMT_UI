WorkshopMgmtApp.factory('StagesService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetStages = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllStageByWorkshopId?WorkshopId=' + WorkshopId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddStage = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/AddStage', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateStage = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Lookup/UpdateStage', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.DeleteStage = function (StageId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/DeleteStage?StageId=' + StageId,
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

WorkshopMgmtApp.controller('StagesController', [
    '$scope', '$rootScope', 'StagesService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, StagesService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetStages = function () {
            StagesService.GetStages($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.StagesList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetStages();
        $scope.AddStage = function (obj, valid) {

            if (valid) {

                obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                StagesService.AddStage(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.Stages = result.data.Data;
                       
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
        $scope.EditStage = function (obj) {
            $scope.StageDetails = obj;
        }
        $scope.UpdateStage = function (obj, valid) {
            if (valid) {
                obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                StagesService.UpdateStage(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.UpdatedStage = result.data.Data;
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
        $scope.DeleteStage = function (StageId) {
            var result = ($rootScope.Language === "en") ? confirm("Are you sure for delete?") : confirm("هل أنت متأكد من الحذف؟");
            if (result) {

                StagesService.DeleteStage(StageId).then(function (result) {
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