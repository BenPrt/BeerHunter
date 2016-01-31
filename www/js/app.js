'use strict';
angular.module('BeerClient', ['ionic', 'BeerClient.controllers', 'BeerClient.filters', 'BeerClient.directives'])

/**
 * Routing table including associated controllers.
 */
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('menu', {url: "/map", abstract: true, templateUrl: "menu.html"})
    
        .state('menu.home', {url: '/home', views: {'menuContent': {templateUrl: 'gpsView.html', controller: 'GpsCtrl'} }  })
    
        .state('menu.help', {url: '/help', views: {'menuContent': {templateUrl: 'helpView.html', controller: 'HelpCtrl'} }  });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/map/home');
}]);