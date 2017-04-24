(function () {
    'use strict';
    // manually bootstrap angular after the JWT token is retrieved from the server
    
    angular
        .module('BlurAdmin', [
            'ngAnimate',
            'ui.bootstrap',
            'ui.sortable',
            'ui.router',
            'ngTouch',
            'toastr',
            'smart-table',
            "xeditable",
            'ui.slimscroll',
            'ngJsTree',
            'angular-progress-button-styles',

            'BlurAdmin.theme',
            'BlurAdmin.pages'
        ])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/dashboard");
    }

    function run($http, $rootScope, $window) {
        $.get('/app/token', function (token) {
            window.jwtToken = token;
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
            //angular.bootstrap(document, ['BlurAdmin']);
            $http.get('/api/users/current').then( function (res) {
                $rootScope.loggedinuser = res.data;
                //angular.bootstrap(document, ['BlurAdmin']);
            });
            
        });
        
        // add JWT token as default auth header
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //    $rootScope.activeTab = toState.data.activeTab;
        //});
    }

    
})();