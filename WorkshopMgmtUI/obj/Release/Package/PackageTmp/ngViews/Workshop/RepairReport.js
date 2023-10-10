WorkshopMgmtApp.factory('InvoiceService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.GetInvoice = function (JobId) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Get', url: dotnetapi + 'Service/GetInvoiceDetails?JobId=' + JobId,
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

WorkshopMgmtApp.controller('InvoiceController', [
    '$scope', '$rootScope', 'InvoiceService', '$cookies', 'dotnetfilepath', '$location', '$routeParams', '$timeout',
    function ($scope, $rootScope, InvoiceService, $cookies, dotnetfilepath, $location, $routeParams, $timeout) {

        $scope.JobId = $routeParams.JobId;
        $scope.GetInvoice = function () {
    InvoiceService.GetInvoice($scope.JobId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.InvoiceDetails = result.data.data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.message;
                }
            });
        }

        $scope.GetInvoice($scope.JobId);
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
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="../../css/light.css" /></head><body onload="window.print()">' + innerContents + '</html>');
                popupWinindow.document.close();
            
        };

    }]);