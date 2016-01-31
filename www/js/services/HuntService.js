angular.module('BeerClient.services')

    .service('HuntService', function($q, $http, $state, $rootScope, $ionicPopup) {

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
                return bars;
            }, function errorCallback(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },



        
        post_Hunt: function(isPressure, beer, beers, bar, bars, price) {
            var beerToPost = beers.indexOf(beer);
            beerToPost++;
            beerToPost = '/api/beers/'+beerToPost;

            var barToPost = bars.indexOf(bar);
            barToPost++;
            barToPost = '/api/bars/'+barToPost;

            hunterToPost = $rootScope.userConnected['@id'];
            
            var priceToPost = parseFloat(price);

            var config = {headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+$rootScope.tokenSession
            }}

            
            return $http.post('http://beer.sinjo.xyz/api/hunts', JSON.stringify({
                isPressure : isPressure ,
                beer : beerToPost ,
                bar : barToPost ,
                hunter : hunterToPost ,
                price : priceToPost
            }), config)
                .then(function successCallBack(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Félicitations !',
                    template: 'Votre chasse a bien été prise en compte !'
                });
                $state.go('app.map');
            },function errorCallback(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        }
    }
});


