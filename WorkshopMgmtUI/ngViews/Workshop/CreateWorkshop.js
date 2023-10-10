WorkshopMgmtApp.factory('CreateWorkshopService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.AddWorkshop = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Account/AddWorkshop', data: obj,
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

WorkshopMgmtApp.controller('CreateWorkshopController', [
    '$scope', '$rootScope', 'CreateWorkshopService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, CreateWorkshopService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {


        $scope.AddWorkshop = async function (obj, valid) {

            if (valid) {
                if (obj.Password == obj.ConfirmPassword) {
                    const file = document.querySelector('#CRDoc').files[0];
                    if (file != undefined) {
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                        });

                        obj.CR = await toBase64(file);
                    }
                
                    obj.OwnerId = 1;
                    obj.MobileNo = obj.MobileNo.toString();
                    CreateWorkshopService.AddWorkshop(obj).then(function (result) {
                        if (result.data.isSuccess) {
                            $scope.Workshop = result.data.Data;
                            $location.path("/Workshop");

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

    }]);