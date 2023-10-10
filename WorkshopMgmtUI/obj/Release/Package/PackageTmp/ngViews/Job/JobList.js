WorkshopMgmtApp.factory('JobListService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetJobList = function (WorkshopId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/GetJobList?WorkshopId=' + WorkshopId,
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

        return AdminObj;

    }]);

WorkshopMgmtApp.controller('JobListController', [
    '$scope', '$rootScope', 'JobListService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, JobListService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {

        $scope.array = [];
        $scope.partsArray = [];
        $scope.dotnetfilepath = dotnetfilepath;
        $scope.GetJobList = function () {
            JobListService.GetJobList($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetJobList();
        $scope.GetJob = function (Id) {
            
            $scope.GetJobDetails(Id);
        }
        $scope.GetJobDetails = function (JobId) {
            JobListService.GetJobDetails(JobId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobDetails = result.data.data;
                    //$scope.jsonObject = JSON.parse($scope.JobDetails.jobDescription);
                    //if ($scope.JobDetails.jobDescription !== null) {
                    //    $scope.array = JSON.parse($scope.JobDetails.jobDescription);
                    //}
                    if ($scope.JobDetails.vehicleParts !== null) {
                        var csvString = $scope.JobDetails.vehicleParts; // Example with multiple values

                        if (csvString.includes(',')) {
                            $scope.partsArray = csvString.split(',');
                        } else {
                            $scope.partsArray = [csvString];
                        }
                    }
                    //var lastItem = $scope.StageList[$scope.StageList.length - 1];
                    //$scope.lastItemId = lastItem.id;

                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        //$scope.estTime = "00:00";
        $scope.UpdateJobDesc = function () {
            if ($scope.array.length > 0) {
                $scope.JobDescription = JSON.stringify($scope.array);
                JobListService.UpdateJobDesc($scope.JobDetails.jobId, $scope.JobDescription).then(function (result) {
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
            else {
                alert("please add description details first");
            }



        }

        $scope.addValue = function (index, valid, obj) {
            if (valid) {
                $scope.array.push({ Description: obj.description, EstTime: obj.estTime, EstPrice: obj.estPrice }); // Add value to the array
               // obj = ''; // Clear the textbox
            }
                
            
        };

        $scope.removeValue = function (index) {
            $scope.array.splice(index, 1); // Remove value from the array
        };
        $scope.print = function () {
            //var printContents = document.getElementById('contentToPrint').innerHTML;
            //var originalContents = document.body.innerHTML;

            //// Temporarily replace the current page content with the content to print
            //document.body.innerHTML = printContents;

            //// Trigger the print dialog
            //window.print();

            //// Restore the original page content
            //document.body.innerHTML = originalContents;
            var innerContents = document.getElementById('contentToPrint').innerHTML;
            var popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            popupWinindow.document.write('<html><head><title>'+$scope.JobDetails.workshopName+'</title><link rel="stylesheet" type="text/css" href="../css/printpage.css" /></head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };
        $scope.PrintParts = function () {
            var printContents = document.getElementById('partscontent').innerHTML;
            var originalContents = document.body.innerHTML;

            // Temporarily replace the current page content with the content to print
            document.body.innerHTML = printContents;

            // Trigger the print dialog
            window.print();

            // Restore the original page content
            document.body.innerHTML = originalContents;
        };
    }]);