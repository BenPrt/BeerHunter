angular.module('BeerClient.services')

    .service('HunterService', function($q, $http, $state, $rootScope, $ionicPopup) {
    return {
        getHunterFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        }
    }
})
