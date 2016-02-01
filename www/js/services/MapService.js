angular.module('BeerClient.services')

    .service('MapService', function($q, $http, $state, $rootScope, $ionicPopup) {

    return {
        getColors: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/colors',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data['hydra:member'];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getCountries: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/countries',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data['hydra:member'];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBeers: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/beers',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data['hydra:member'];
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getHuntedBars: function() {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunts',
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                var huntedBars = [];
                response.data['hydra:member'].forEach(function(element, index, array){
                    tmp= element.bar.split('/');
                    id=tmp[3];
                    if(element.status==1 && huntedBars.indexOf(id)==-1){
                        huntedBars.push(id);
                    }
                });
                return huntedBars;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBarPositionFromId:function(id){
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/bars/'+id,
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
        },

        getBarsFromFilters:function(beerName, color, origin, isPressure, priceMin, priceMax, degreeMin, degreeMax, status){
            var valuesToPost ={};
            if(beerName!=""){
                valuesToPost.beer=parseInt(beerName.split('/')[3]);
            }
            if(color!=""){
                valuesToPost.color=parseInt(color.split('/')[3]);
            }
            if(origin!=""){
                valuesToPost.origin=parseInt(origin.split('/')[3]);
            }
            if(isPressure==true || isPressure==false){
                valuesToPost.isPressure=isPressure;
            }
            if(priceMin!=""){
                valuesToPost.price_min=priceMin;
            }
            if(priceMax!=""){
                valuesToPost.price_max=priceMax;
            }
            if(degreeMin!=""){
                valuesToPost.degree_min=degreeMin;
            }
            if(degreeMax!=""){
                valuesToPost.degree_max=degreeMax;
            }
            if(status!=""){
                valuesToPost.status=status;
            }
console.log(valuesToPost);
            return $http.post('http://beer.sinjo.xyz/post_hunt_filter', valuesToPost)
                .then(function successCallBack(response){
                var returnValue =[];
                response.data.forEach(function(element,index,array){
                    var returnItem = {};
                    returnItem.name=element.bar.name;
                    returnItem.latitude=element.bar.latitude;
                    returnItem.longitude=element.bar.longitude;
                    returnItem.hunts=element.bar.hunts.length;
                    returnValue.push(returnItem);
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