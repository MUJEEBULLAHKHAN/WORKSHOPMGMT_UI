
WorkshopMgmtApp.controller('HomeConroller', ['$scope', '$rootScope', '$location', 'LoginService', '$routeParams', '$cookies', "$http", '$window',
    function ($scope, $rootScope, $location, LoginService, $routeParams, $cookies, $http, $window) {


        $rootScope.Auth = $cookies.get("Auth");
        if ($rootScope.Auth == 'User') {
            $rootScope.UserSignIn = JSON.parse($cookies.get("UserSignIn"));
            $rootScope.Name = $rootScope.UserSignIn.name;            
        }
        //else if ($rootScope.Auth == 'Originator') {
        //    $rootScope.OriginatorSignIn = JSON.parse($cookies.get("OriginatorSignIn"));
        //    $rootScope.UserName = $rootScope.OriginatorSignIn.firstName + ' ' + $rootScope.OriginatorSignIn.lastName;
        //}
    }]);