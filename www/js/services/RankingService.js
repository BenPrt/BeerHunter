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
                
                response.data['hydra:member'].forEach(function(element,index,array){
                    var returnItem = {};
                    returnItem.id=element['@id'].split('/')[3];
                    returnItem.name=element.username;
                    returnItem.validScore=element.validScore;
                    returnItem.potentiel=parseInt(element.potentialScore - element.validScore);
                    returnValue.push(returnItem);
                });
                
                // Tri du classement selon un ordre de points décroissant 
                returnValue.sort(function(a, b) {
                    if(a.validScore>b.validScore){
                        return -1;
                    }else if(a.validScore<b.validScore){
                        return 1;  
                    }else{
                        if(a.potentiel>b.potentiel){
                            return -1;
                        }else{
                            return 1;
                        }
                    }
                    return 0;
                });
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