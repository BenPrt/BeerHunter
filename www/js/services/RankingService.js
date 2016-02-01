angular.module('BeerClient.services')

    .service('RankingService', function($q, $http, $state, $rootScope, $ionicPopup) {

    return {
        getRanking: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                var returnValue =[];
                console.log(response.data['hydra:member']);
                response.data['hydra:member'].forEach(function(element,index,array){
                    var returnItem = {};
                    returnItem.id=element['@id'].split('/')[3];
                    returnItem.name=element.username;
                    returnItem.validScore=element.validScore;
                    returnItem.potentiel=parseInt(element.potentialScore) - parseInt(element.validScore);
                    returnValue.push(returnItem);
                });
                console.log(returnValue);
                //                returnValue.sort(function(a, b) {
                //                    if(a.id>b.id) return -1;
                //                    if(a.id<b.id) return 1;
                //                    return 0;
                //                });
                return returnValue;
            }, function errorCallback(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        }
    }
});