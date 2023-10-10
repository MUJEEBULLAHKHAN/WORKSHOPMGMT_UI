WorkshopMgmtApp.factory('WorkshopService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetWorkshop = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Account/GetAllWorkshop'
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

WorkshopMgmtApp.controller('WorkshopController', [
    '$scope', '$rootScope', 'WorkshopService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, WorkshopService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.GetWorkshop = function () {
            WorkshopService.GetWorkshop().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.WorkshopList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetWorkshop();

    }]);