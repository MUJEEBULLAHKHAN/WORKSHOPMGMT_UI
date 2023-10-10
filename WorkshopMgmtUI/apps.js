var WorkshopMgmtApp = angular.module('WorkshopMgmtApp', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination', 'moment-picker', 'thatisuday.dropzone', "ui.bootstrap"]);

WorkshopMgmtApp.run(function ($rootScope, $cookies, $http, $location) {


    if ($cookies.get("Auth") === null || $cookies.get("Auth") === undefined) {
        $cookies.put("Auth", false);
        $location.path('/Login');

    }
    $rootScope.Auth = $cookies.get("Auth");
    // $scope.lang = localStorage.getItem("lang");

    if ($rootScope.Auth === 'false') {
         
        $rootScope.url = '';

        $rootScope.url = $location.absUrl();
        var splitUrl = $rootScope.url.split('/');
        
        if (splitUrl[3] == "") {
            $location.path('/Login');

        } else {
            $location.path('/Login');
        }
        
    }
    else {

        $rootScope.UserSignIn = JSON.parse($cookies.get("UserSignIn"));
        if ($rootScope.UserSignIn.userType == 'Workshop') {
            $location.path('/Users');
        }
        else if ($rootScope.UserSignIn.userType == 'Owner') {
            $location.path('/Workshop');
        }
        else if ($rootScope.UserSignIn.userType == 'User') {
            $location.path('/Job');
        }
        //$http.defaults.headers.common['APICODE'] = "123456789";
        $http.defaults.headers.common['culture'] = "en";
    }

    $rootScope.sideBarExpand = true;
    $rootScope.Language = localStorage.getItem("lang");
});

WorkshopMgmtApp.factory('myHttpInterceptor', function ($q, $window) {
    return {
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if (response.status === 500) {
                $window.alert(response.statusText);
            }
            return $q.reject(response);
        }
    };
});

WorkshopMgmtApp.filter('words', function () {
    function isInteger(x) {
        return x % 1 === 0;
    }
    return function (value) {
        if (value && isInteger(value))
            return toWords(value);
        return value;
    };
});

WorkshopMgmtApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
    $locationProvider.hashPrefix('');
    //$routeProvider.when('/Home', { templateUrl: 'ngViews/Dashboard/' + GetHtmlPage('Dashboard.html'), controller: 'DashboardController' });
    $routeProvider.when('/CreateWorkshop', { templateUrl: 'ngViews/Workshop/' + GetHtmlPage('CreateWorkshop.html'), controller: 'CreateWorkshopController' });
    $routeProvider.when('/Workshop', { templateUrl: 'ngViews/Workshop/' + GetHtmlPage('Workshop.html'), controller: 'WorkshopController' });
    $routeProvider.when('/Login', { templateUrl: 'ngViews/Workshop/' + GetHtmlPage('Login.html'), controller: 'LoginController' });
    $routeProvider.when('/RepairReport/:JobId?', { templateUrl: 'ngViews/Workshop/' + GetHtmlPage('RepairReport.html'), controller:'InvoiceController' });
    $routeProvider.when('/JobSample', { templateUrl: 'ngViews/Workshop/JobSample.html' });
    $routeProvider.when('/Users', { templateUrl: 'ngViews/User/' + GetHtmlPage('Users.html'), controller: 'UsersController' });
    $routeProvider.when('/AddUser', { templateUrl: 'ngViews/User/' + GetHtmlPage('AddUser.html'), controller: 'AddUserController' });
    $routeProvider.when('/CreateJob', { templateUrl: 'ngViews/Job/' + GetHtmlPage('CreateJob.html'), controller: 'CreateJobController' });
    $routeProvider.when('/Job', { templateUrl: 'ngViews/Job/' + GetHtmlPage('Jobs.html'), controller: 'KanbanCtrl' });
    $routeProvider.when('/JobList', { templateUrl: 'ngViews/Job/' + GetHtmlPage('JobList.html'), controller: 'JobListController' });
    $routeProvider.when('/Roles', { templateUrl: 'ngViews/Lookup/' + GetHtmlPage('Role.html'), controller: 'RolesController' });
    $routeProvider.when('/Stages', { templateUrl: 'ngViews/Lookup/' + GetHtmlPage('Stages.html'), controller: 'StagesController' });
    $routeProvider.when('/VehicleMakes', { templateUrl: 'ngViews/Lookup/' + GetHtmlPage('VehicleMake.html'), controller: 'VehicleMakesController' });
    $routeProvider.when('/Colors', { templateUrl: 'ngViews/Lookup/' + GetHtmlPage('Colors.html'), controller: 'ColorsController' });
    $routeProvider.when('/VehicleModel', { templateUrl: 'ngViews/Lookup/' + GetHtmlPage('VehicleModel.html'), controller: 'VehicleModelsController' });
    $routeProvider.when('/JobCard', { templateUrl: 'ngViews/Sample/JobCard.html', controller: 'JobCardController' });
    $routeProvider.when('/NewSample', { templateUrl: 'ngViews/Sample/NewSample.html', controller: 'NewSampleController' });
    

    $routeProvider.otherwise({ redirectTo: '/Login' });




    $locationProvider.html5Mode(true);
    $routeProvider.when("/Logout", {
        resolve: {
            auth: function ($rootScope, $location, $cookies) {
                $cookies.put("Auth", "false");
                $rootScope.UserSignIn = $cookies.get("Auth");
                $cookies.put("SidebarHide", "true");
                $cookies.put("UserSignIn", null);
                $rootScope.UserSignIn = $cookies.get("UserSignIn");
                $location.path('/Login');
                location.reload();

            }
        }
    }
    );


});

function GetHtmlPage(htmlPage) {

    if (localStorage.getItem("lang") == 'ar') {
        return 'Ar-' + htmlPage;
    }
    return htmlPage;
};

WorkshopMgmtApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);

WorkshopMgmtApp.directive('passwordValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$validators.passwordValidation = function (modelValue, viewValue) {
                var password = modelValue || viewValue;
                if (password) {
                    // Check if password is at least 8 characters long
                    if (password.length < 8) {
                        return false;
                    }

                    // Check if password contains at least one uppercase letter
                    if (!/[A-Z]/.test(password)) {
                        return false;
                    }

                    // Check if password contains at least one special character
                    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
                        return false;
                    }

                    // Check if password contains at least one digit character
                    if (!/\d/.test(password)) {
                        return false;
                    }
                }

                return true;
            };

            ngModelCtrl.$validators.passwordLength = function (modelValue, viewValue) {
                var password = modelValue || viewValue;
                if (password) {
                    // Check if password is at least 8 characters long
                    if (password.length < 8) {
                        return false;
                    }
                }

                return true;
            };

            ngModelCtrl.$validators.passwordUppercase = function (modelValue, viewValue) {
                var password = modelValue || viewValue;
                if (password) {
                    // Check if password contains at least one uppercase letter
                    if (!/[A-Z]/.test(password)) {
                        return false;
                    }
                }

                return true;
            };

            ngModelCtrl.$validators.passwordSpecialChar = function (modelValue, viewValue) {
                var password = modelValue || viewValue;
                if (password) {
                    // Check if password contains at least one special character
                    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
                        return false;
                    }
                }

                return true;
            };

            ngModelCtrl.$validators.passwordDigit = function (modelValue, viewValue) {
                var password = modelValue || viewValue;
                if (password) {
                    // Check if password contains at least one digit character
                    if (!/\d/.test(password)) {
                        return false;
                    }
                }

                return true;
            };
        }
    };
});

WorkshopMgmtApp.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    }

    return {
        link: fn_link
    };
}]);

WorkshopMgmtApp.directive("fileread", [
    function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }
]);

WorkshopMgmtApp.directive('draggable', function () {
    return function (scope, element, attrs) {
        // Get the native element
        var el = element[0];
        el.draggable = true; // Make dragable

        // Add event listeners
        el.addEventListener(
            'dragstart',
            function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('item_id', this.id);
                e.dataTransfer.setData('origin_id', el.parentElement.id);
                this.classList.add('dragging');
                return false;
            }, false
        );

        el.addEventListener(
            'dragend',
            function (e) {
                this.classList.remove('dragging');
                return false;
            },
            false
        );
    }
});

WorkshopMgmtApp.directive('droppable', function () {
    return function (scope, element, attrs) {
        // Get the native element
        var el = element[0];

        // Add event listeners
        el.addEventListener(
            'dragover',
            function (e) {
                e.preventDefault(); // Allow the drop

                // Set effects
                e.dataTransfer.dropEffect = 'move';
                this.classList.add('dragover');
                return false;
            }, false
        );

        el.addEventListener(
            'dragenter',
            function (e) {
                this.classList.add('dragover');
                return false;
            }, false
        );

        el.addEventListener(
            'dragleave',
            function (e) {
                this.classList.remove('dragover');
                return false;
            }, false
        );

        el.addEventListener(
            'drop',
            function (e) {
                this.classList.remove('dragover');

                // Get the data
                var destination = this.id;
                var item_to_move = e.dataTransfer.getData('item_id');
                var origin = e.dataTransfer.getData('origin_id');

                // Call the scope move function
                scope.MoveItem(origin, destination, item_to_move);

                return false;
            }, false
        );
    }
});

WorkshopMgmtApp.constant("dotnetapi", "https://localhost:7281/api/")
WorkshopMgmtApp.constant("dotnetfilepath", "https://localhost:7281/")
//WorkshopMgmtApp.constant("dotnetapi", "http://localhost:992/api/")
//WorkshopMgmtApp.constant("dotnetfilepath", "http://localhost:992/")