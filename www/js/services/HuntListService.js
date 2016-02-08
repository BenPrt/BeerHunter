angular.module('BeerClient.services')

    .service('HuntListService', function($q, $http, $state, $rootScope, $ionicPopup) {

    return {
        getHunts:function(){
            return $http.post('http://beer.sinjo.xyz/post_hunt_filter')
                .then(function successCallBack(response){
                var returnValue =[];
                response.data.forEach(function(element,index,array){
                    // On construit un objet avec les ressources nécessaires
                    var returnItem = {};
                    returnItem.id=element.id;
                    returnItem.bar=element.bar.name;
                    returnItem.beer=element.beer.name;
                    returnValue.push(returnItem);
                });
                returnValue.sort(function(a, b) {
                    if(a.id>b.id) return -1;
                    if(a.id<b.id) return 1;
                    return 0;
                });
                return returnValue;
            },function errorCallback(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        }
    }
});