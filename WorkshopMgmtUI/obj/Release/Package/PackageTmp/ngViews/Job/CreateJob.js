WorkshopMgmtApp.factory('CreateJobService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.CreateJob = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Service/CreateJob', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.GetCustomerTypes = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllCustomerType',
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };

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

        AdminObj.GetVehicleMakes = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllVehicleMake',
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };

        AdminObj.GetVehicleModel = function (VehicleMakeId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllVehicleModelByMakeId?VehicleMakeId=' + VehicleMakeId,
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

WorkshopMgmtApp.controller('CreateJobController', [
    '$scope', '$rootScope', 'CreateJobService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, CreateJobService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {
        //$scope.array = []; // Initialize the array
        $scope.files = [];
        const input = document.getElementById('image-input');
        const list = document.getElementById('image-list');
        input.addEventListener('change', () => {
            for (const file of input.files) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const li = document.createElement('div');
                    const img = document.createElement('img');
                    li.classList.add("col-md-3");
                    img.classList.add("card-img-top");
                    img.src = reader.result;
                    li.appendChild(img);
                    const button = document.createElement('button');
                    button.classList.add("btn", "btn-danger");
                    button.innerHTML = 'Remove';
                    button.addEventListener('click', () => {
                        li.remove();
                        $scope.files.pop(img.src);
                    });
                    const label = document.createElement('p');
                    label.innerHTML = file.name;
                    button.innerHTML = 'Remove';
                    li.appendChild(label);
                    li.appendChild(button);
                    list.appendChild(li);
                    var VehiclePic = {
                        VehiclePic: img.src,
                        PicName: file.name
                    };
                    $scope.files.push(VehiclePic);
                });
                reader.readAsDataURL(file);
            }
        });

        //$scope.addValue = function (index) {
        //    if ($scope.newValue) {
        //        $scope.array.push($scope.newValue); // Add value to the array
        //        $scope.newValue = ''; // Clear the textbox
        //    }
        //};

        //$scope.removeValue = function (index) {
        //    $scope.array.splice(index, 1); // Remove value from the array
        //};

        $scope.CreateJob = function (obj, valid) {
            
            if (valid) {
                var saudiOffset = 3 * 60; // Offset in minutes for Saudi Arabia (UTC+3)
                var currentUtcDatetime = new Date();
                var saudiDatetime = new Date(currentUtcDatetime.getTime() + saudiOffset * 60 * 1000);
                $scope.saudiDatetime = saudiDatetime;
                obj.JobCreated = $scope.saudiDatetime;
                obj.WorkshopId = $rootScope.UserSignIn.workshopId;
                obj.UserId = $rootScope.UserSignIn.userId;
                obj.OwnerId = 1;
                obj.MobileNo = obj.MobileNo.toString();
                //obj.JobDiscription = comma_separated_string;
                obj.VehiclePictures = $scope.files;
                CreateJobService.CreateJob(obj).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.CreateJob = result.data.data;
                        alert(result.data.message);
                        $location.path('/JobList');
                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }

                });

            }

        }

        $scope.GetCustomerTypes = function () {
            CreateJobService.GetCustomerTypes().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.CustomerTypeList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetCustomerTypes();

        $scope.GetColors = function () {
            CreateJobService.GetColors().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.ColorList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetColors();

        $scope.GetVehicleMakes = function () {
            CreateJobService.GetVehicleMakes().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleMakeList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetVehicleMakes();

        $scope.GetVehicleMakes = function () {
            CreateJobService.GetVehicleMakes().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleMakeList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetVehicleMakes();

        $scope.GetVehicleModel = function (VehicleMakeId) {
            CreateJobService.GetVehicleModel(VehicleMakeId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.VehicleModelList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
    }]);