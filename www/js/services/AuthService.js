angular.module('BeerClient.services', [])

    .service('AuthService', function($q, $http, $ionicPopup, $ionicHistory, $state, $rootScope) {
    console.log("AuthService");
    var userConnected;
    return {
        // Fonction chargée d'effectuer la connexion et de récupérer le token de sessions
        loginUser: function(userName, pass) {
            // Récupération du token de session
            return $http.post('http://beer.sinjo.xyz/api/login_check', { _username : userName,
                                                                        _password : pass
                                                                       })
                .then(function successCallback(response) {
                $rootScope.isAuth = true ;
                $rootScope.tokenSession = response.data.token;
                return "logged";

            }, function errorCallback(response) {
            });
        },


        // Fonction chargée de récupérer les informations de l'utilisateur connecté
        getUserLogged : function(userName) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters?username='+userName,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                $rootScope.userConnected = response.data['hydra:member'][0];
                return "OK";
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });

            });
        },


        // Fonction chargée de retourner le statut de l'authentification de l'utilisateur utilisatn l'application
        isConnected: function() {
            return $rootScope.isAuth;
        },


        // Fonction chargée de déconnecter l'utilisateur courant
        logoutUser: function(){
            $rootScope.userConnected ="";
        }
    }
})