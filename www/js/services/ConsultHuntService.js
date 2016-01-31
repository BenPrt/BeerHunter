angular.module('BeerClient.services')

    .service('ConsultHuntService', function($q, $http, $state, $rootScope, $ionicPopup) {
    return {
        getHuntFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunts/'+id,
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

        getBarFromId:function(id) {
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

        getBeerFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/beers/'+id,
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

        getColorFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/colors/'+id,
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

        getCountryFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/countries/'+id,
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
        },

        vote: function(vote, hunt) {
            var currentHunt = hunt;
            var voteToPost=vote;
            var huntToPost=hunt['@id'];

            var config = {headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+$rootScope.tokenSession
            }}

            return $http.post('http://beer.sinjo.xyz/api/votes', JSON.stringify({
                vote : vote,
                hunt : huntToPost,
                hunter : $rootScope.userConnected['@id']
            }), config)
                .then(function successCallBack(response){

                var balanceToPost = 0;
                var statusToPost=0;
                console.log("status : "+currentHunt.status+"balance"+currentHunt.balance);
                if(currentHunt.status==0 && currentHunt.balance>-1 && currentHunt.balance<2){
                    if(voteToPost==true){
                        balanceToPost = ++currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };
                        console.log(currentHunt.balance);
                        console.log(balanceToPost);
                        console.log("vote positif, sur une balance quelconque d'une chasse active");
                    }else if(voteToPost==false){
                        balanceToPost = --currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };
                        console.log("vote négatif, sur une balance quelconque d'une chasse active");
                    }
                }else if(currentHunt.balance==-1){
                    if(voteToPost==true){
                        balanceToPost = ++currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };
                        console.log("vote positif, sur une balance négative d'une chasse");
                    } else if(voteToPost==false){
                        balanceToPost = 0;
                        statusToPost =2;
                        var valuesToPUT = {
                            balance : balanceToPost,
                            status : statusToPost
                        };
                        console.log("vote négatif, sur une balance négative d'une chasse -> on supprime");
                    }
                } else if(currentHunt.balance==2){
                    if(voteToPost==true){
                        balanceToPost = 0;
                        statusToPost =1;
                        var valuesToPUT = {
                            balance : balanceToPost,
                            status : statusToPost
                        };
                        console.log("vote positif, sur une balance max d'une chasse, on passe au statut validé");
                    }else if(voteToPost==false){
                        balanceToPost = --currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };
                        console.log("vote négatif, sur une balance max d'une chasse, on décrémente la balance");
                    }
                }

                console.log(valuesToPUT);
                $http.put('http://beer.sinjo.xyz'+huntToPost, JSON.stringify(valuesToPUT), config)
                    .then(function successCallBack(response){

                    var alertPopup = $ionicPopup.alert({
                        title: 'Félicitations !',
                        template: 'Votre vote a bien été pris en compte !'
                    });

                },function errorCallback(response){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Erreur',
                        template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                    });
                });


            },function errorCallback(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                });
            });

        }

    }
})
