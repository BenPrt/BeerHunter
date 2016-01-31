angular.module('BeerClient.services')

    .service('SearchService', function($q, $http, $state, $rootScope, $ionicPopup) {

    return {
        getBeers: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/beers',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                var beers = [];
                response.data['hydra:member'].forEach(function(element, index, array) {
                    beers.push(element.name);
                });
                beers.sort();
                return beers;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },



        getBars: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/bars',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                var bars = [];
                response.data['hydra:member'].forEach(function(element, index, array) {
                    bars.push(element.name);
                });
                bars.sort();
                return bars;
            }, function errorCallback(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getHunters: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                var hunters = [];
                response.data['hydra:member'].forEach(function(element, index, array) {
                    hunters.push(element.username);
                });
                hunters.sort();
                return hunters;
            }, function errorCallback(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBeerFromName: function(name) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/beers?name='+name,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data['hydra:member'][0];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBarFromName: function(name) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/bars?name='+name,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data['hydra:member'][0];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },
        
        getHunterFromUsername: function(name) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters?username='+name,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                console.log(response);
                return response.data['hydra:member'][0];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        }

    }



})