angular.module('BeerClient', ['ionic', 'BeerClient.controllers', 'BeerClient.services','BeerClient.filters', 'BeerClient.directives', 'ionMdInput'])

    .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Stuff in here
    });
})

/**
 * Routing table including associated controllers.
 */
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        resolve : {
            "checkSession": function($state, $rootScope, AuthService){
                if($rootScope.isAuth==true || $rootScope.isAuth!=null){
                    $state.go('app.map');
                }
            }
        }
    })

        .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'SigninCtrl',
        resolve : {
            "checkSession": function($state, $rootScope, AuthService){
                if($rootScope.isAuth==true || $rootScope.isAuth!=null){
                    $state.go('app.map');
                }
            }
        }
    })        

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        resolve : {
            "checkSession": function($state, $rootScope, AuthService){
                if($rootScope.isAuth==false || $rootScope.isAuth==null){
                    $state.go('login');
                }
            }
        }
    })

        .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }
            }
        }
    })

        .state('app.hunt', {
        url: '/hunt',
        views: {
            'menuContent': {
                templateUrl: 'templates/hunt.html',
                controller: 'HuntCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }
            }
        }
    })

        .state('app.search',{
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })

        .state('app.beer/:beerId',{
        url: '/beer/:beerId',
        views: {
            'menuContent': {
                templateUrl: 'templates/beer.html',
                controller: 'BeerCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })

        .state('app.bar/:barId',{
        url: '/bar/:barId',
        views: {
            'menuContent': {
                templateUrl: 'templates/bar.html',
                controller: 'BarCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })

        .state('app.hunter/:hunterId',{
        url: '/hunter/:hunterId',
        views: {
            'menuContent': {
                templateUrl: 'templates/hunter.html',
                controller: 'HunterCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })

        .state('app.consultHunt/:huntId',{
        url: '/consultHunt/:huntId',
        views: {
            'menuContent': {
                templateUrl: 'templates/consultHunt.html',
                controller: 'ConsultHuntCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })

        .state('app.editProfile',{
        url: '/editProfile',
        views: {
            'menuContent': {
                templateUrl: 'templates/editProfile.html',
                controller: 'EditProfileCtrl'
            },
            resolve : {
                "checkSession": function($state, $rootScope, AuthService){
                    if($rootScope.isAuth==false || $rootScope.isAuth==null){
                        $state.go('login');
                    }
                }


            }
        }
    })



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');


    // headers for fix the CORS problems
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});
