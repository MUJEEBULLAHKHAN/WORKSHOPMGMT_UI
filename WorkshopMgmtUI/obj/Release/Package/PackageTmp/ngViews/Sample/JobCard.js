WorkshopMgmtApp.factory('JobCardService', [
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
WorkshopMgmtApp.controller('JobCardController', [
    '$scope', '$rootScope', 'JobCardService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, JobCardService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {
        $scope.GetStages = function () {
            JobCardService.GetStages($rootScope.UserSignIn.workshopId).then(function (result) {
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
            JobCardService.GetJobList($rootScope.UserSignIn.workshopId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.JobList = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }
        $scope.GetJobList();
        const cards = document.querySelectorAll('.card');
        const columns = document.querySelectorAll('.column');

        cards.forEach(card => {
            card.addEventListener('dragstart', dragStart);
            card.addEventListener('dragend', dragEnd);
        });

        columns.forEach(column => {
            column.addEventListener('dragover', dragOver);
            column.addEventListener('dragenter', dragEnter);
            column.addEventListener('dragleave', dragLeave);
            column.addEventListener('drop', drop);
        });

        let draggedCard = null;

        function dragStart() {
            draggedCard = this;
            setTimeout(() => {
                this.style.display = 'none';
            }, 0);
            console.log(draggedCard);
            console.log("Drag Start");
        }

        function dragEnd() {
            this.style.display = 'block';
            draggedCard = null;
            console.log(draggedCard);
            console.log("Drag end");
        }

        function dragOver(event) {
            event.preventDefault();
        }

        function dragEnter(event) {
            event.preventDefault();
            this.classList.add('hovered');
        }

        function dragLeave() {
            this.classList.remove('hovered');
        }

        function drop() {
            this.appendChild(draggedCard);
            this.classList.remove('hovered');
        }
	 }]);