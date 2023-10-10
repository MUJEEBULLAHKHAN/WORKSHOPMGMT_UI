WorkshopMgmtApp.factory('UsersService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetUsers = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Account/GetAllUserByWorkshopId?WorkshopId=' + WorkshopId
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

WorkshopMgmtApp.controller('UsersController', [
    '$scope', '$rootScope', 'UsersService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, UsersService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {

        
        $scope.GetUsers = function () {
            UsersService.GetUsers($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.UsersList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        
        $scope.GetUsers();
       
    }]);