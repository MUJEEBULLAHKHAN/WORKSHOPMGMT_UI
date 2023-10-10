WorkshopMgmtApp.factory('JobService', [
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
        AdminObj.AddPartsCharges = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Service/FinalStage', data: obj,
                headers: { 'Culture': localStorage.getItem("lang") }
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
                method: 'Get', url: dotnetapi + 'Service/GetJobById?JobId=' + JobId,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.UpdateJobDesc = function (JobId, JobDesctiption) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/UpdateJobDesc?JobId=' + JobId + '&JobDescription=' + JobDesctiption,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };
        AdminObj.AddVehicleParts = function (JobId, VehicleParts) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/AddParts?JobId=' + JobId + '&PartsName=' + VehicleParts,
                headers: { 'Culture': localStorage.getItem("lang") }
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;

        };

        AdminObj.StartJob = function (JobId, StageId, UserId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/StartJob?JobId=' + JobId + '&StageId=' + StageId + '&UserId=' + UserId,
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

WorkshopMgmtApp.controller('KanbanCtrl', [
    '$scope', '$rootScope', 'JobService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, JobService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {
        $scope.dotnetfilepath = dotnetfilepath;

        $scope.array = [];
        $scope.partsArray = [];
        $scope.RoleName = $rootScope.UserSignIn.roleName;
        $scope.GetJobLists = function () {
            JobService.GetJobList($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobLists = result.data.data;

                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        //$scope.GetJobLists();

        $scope.GetStages = function () {
            $("#ShowDetails").hide();
            JobService.GetStages($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.StageList = result.data.data;
                    var dp = new DayPilot.Kanban("dp", {

                        onCardMoved: (args) => {
                            //args.control.message("Card moved: " + args.card.data.name + "And Id is " + args.card.data.id + " To column " + args.column.data.name);

                            var obj = { JobId: args.card.data.id, StageId: args.column.data.id, UserId: $rootScope.UserSignIn.userId }

                            $scope.UpdateJobStatus(obj)

                        }

                    });
                    dp.onCardClicked = function (args) {
                        $("#ShowDetails").show();
                        $scope.GetJobDetails(args.card.data.id);
                    }
                    dp.columns.list = $scope.StageList;
                    JobService.GetJobList($rootScope.UserSignIn.workshopId).then(function (result) {
                        if (result.data.isSuccess) {
                            $scope.JobList = result.data.data;
                            dp.cards.list = $scope.JobList;
                            dp.init();
                        }
                        else {
                            $scope.serverErrorMsgs = result.data.message;
                        }
                    });

                    //angular.forEach($scope.JobList,  function (item, index) {

                    //    var obj = { id: item.id, "name": item.name, column: item.column, text: item.text }

                    //   $scope.ABC.push(obj);

                    //});
                    //dp.cards.list = $scope.ABC;
                    //dp.cards.list = $scope.JobList;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetStages();
        $scope.GetJobDetails = function (JobId) {
            JobService.GetJobDetails(JobId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobDetails = result.data.data;
                    $scope.jsonObject = JSON.parse($scope.JobDetails.jobDescription);
                    if ($scope.JobDetails.jobDescription !== null) {
                        $scope.array = JSON.parse($scope.JobDetails.jobDescription);
                    }
                    if ($scope.JobDetails.vehicleParts !== null) {
                        var csvString = $scope.JobDetails.vehicleParts; // Example with multiple values

                        if (csvString.includes(',')) {
                            $scope.partsArray = csvString.split(',');
                        } else {
                            $scope.partsArray = [csvString];
                        }
                    }
                    var lastItem = $scope.StageList[$scope.StageList.length - 1];
                    $scope.lastItemId = lastItem.id;
                    
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.UpdateJobDesc = function () {
            if ($scope.array.length > 0) {
                $scope.JobDescription = JSON.stringify($scope.array);
                JobService.UpdateJobDesc($scope.JobDetails.jobId, $scope.JobDescription).then(function (result) {
                    if (result.data.isSuccess) {
                        alert(result.data.message);
                        location.reload();

                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }
                });
            }
            else {
                alert("please add description details first");
            }
        }

        $scope.AddPartsCharges = function (obj,valid) {
            if (valid) {
                obj.JobId = $scope.JobDetails.jobId;
                JobService.AddPartsCharges(obj).then(function (result) {
                        if (result.data.isSuccess) {
                            alert(result.data.message);
                            var url = 'RepairReport/' + obj.JobId ; // Replace 'page' with your actual page name
                            window.location = url;
                        }
                        else {
                            $scope.serverErrorMsgs = result.data.message;
                            alert($scope.serverErrorMsgs);
                        }
                    });
                
            }
        }

        $scope.AddVehicleParts = function () {
            if ($scope.partsArray.length > 0) {
                var VehicleParts = $scope.partsArray;
                JobService.AddVehicleParts($scope.JobDetails.jobId, VehicleParts).then(function (result) {
                    if (result.data.isSuccess) {
                        alert(result.data.message);
                        location.reload();

                    }
                    else {
                        $scope.serverErrorMsgs = result.data.message;
                        alert($scope.serverErrorMsgs);
                    }
                });
            }
            else {
                alert("please add Vehicle Parts first");
            }
        }

        $scope.addValue = function (index, valid, obj) {
            if (valid) {
                $scope.array.push({ Description: obj.description, EstTime: obj.estTime, EstPrice: obj.estPrice }); // Add value to the array
                // obj = ''; // Clear the textbox
            }
        };

        $scope.addToList = function (index) {
            if ($scope.VehicleParts) {
                // Split the input text by commas and trim whitespace
                var items = $scope.VehicleParts.split(',').map(function (item) {
                    return item.trim();
                });

                // Add items to the itemList
                $scope.partsArray = $scope.partsArray.concat(items);

                // Clear the input field
                $scope.VehicleParts = '';
            }
        };

        $scope.removeValue = function (index) {
            $scope.array.splice(index, 1); // Remove value from the array
        };
        $scope.removePartValue = function (itemToRemove) {
            var index = $scope.partsArray.indexOf(itemToRemove);
            if (index !== -1) {
                $scope.partsArray.splice(index, 1);
            }
        };

        $scope.UpdateJobStatus = function (obj) {

            JobService.UpdateJobStatus(obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.Users = result.data.Data;
                    location.reload();
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                    alert($scope.serverErrorMsgs);
                }

            });
        }

        $scope.StartJob = function (JobId, StageId) {
            JobService.StartJob(JobId, StageId, $rootScope.UserSignIn.userId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.Users = result.data.Data;
                    location.reload();
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                    alert($scope.serverErrorMsgs);
                }
            }
            );
        }
    }]);