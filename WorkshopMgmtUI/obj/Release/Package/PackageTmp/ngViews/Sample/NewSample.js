WorkshopMgmtApp.factory('NewSampleService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetStages = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Lookup/GetAllStageForKanbanByWorkshopId?WorkshopId=' + WorkshopId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.GetJobList = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/GetKanbanJobList?WorkshopId=' + WorkshopId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateJobStatus = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Service/UpdateJobStatus', data: obj
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.GetJobDetails = function (JobId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/GetJobById?JobId=' + JobId
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

WorkshopMgmtApp.controller('NewSampleController', [
    '$scope', '$rootScope','NewSampleService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, NewSampleService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {
        //var dataModel = {
        //    'reds': [{
        //        'id': 'red1',
        //        'text': 'This is red 1'
        //    }, {
        //        'id': 'red2',
        //        'text': 'This is red 2'
        //    }],
        //    'greens': [{
        //        'id': 'green1',
        //        'text': 'This is green 1'
        //    }, {
        //        'id': 'green2',
        //        'text': 'This is green 2'
        //    }]
        //}
        $scope.GetStages = function () {
            NewSampleService.GetStages($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.StageList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetStages();
        $scope.GetJobList = function () {
            NewSampleService.GetJobList($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobList = result.data.data;
                    $scope.data = $scope.JobList;
                    $scope.MoveItem = function (origin, dest, item_id) {
                        // Check if dropped in origin
                        if (origin == dest) return;

                        // Find item in origin array
                        for (i = 0; i < $scope.data[origin].length; i++) {
                            if ($scope.data[origin][i].id == item_id) {
                                // Splice the item from the origin array
                                var item = $scope.data[origin].splice(i, 1);
                                // Push to the destination array
                                $scope.data[dest].push(item[0]);
                                // End loop
                                break;
                            }
                        }

                        // Update UI
                        $scope.$apply();
                    }
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetJobList();
        

    }]);


