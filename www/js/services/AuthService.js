angular.module('BeerClient.services', [])

    .service('AuthService', function($q, $http, $ionicPopup, $ionicHistory, $state, $rootScope) {
console.log("AuthService");
    var userConnected;
    return {
        loginUser: function(userName, pass) {
            // Récupération du token de session
            return $http.post('http://beer.sinjo.xyz/api/login_check', { _username : userName,
                                                                 _password : pass
                                                                })
                .then(function successCallback(response) {
                $rootScope.isAuth = true ;
                $rootScope.tokenSession = response.data.token;
                
                $http({
                    method: 'GET',
                    url: 'http://beer.sinjo.xyz/api/hunters?username='+userName,
                    headers:{
                        'Authorization':'Bearer '+$rootScope.tokenSession
                    }
                }).then(function successCallback(response) {
                    $rootScope.userConnected = response.data['hydra:member'][0];
                    $state.go('app.map');
                    $ionicHistory.clearHistory();
                }, function errorCallback(response) {    
                    var alertPopup = $ionicPopup.alert({
                        title: 'Erreur',
                        template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                    });
                });
                return response;
                
            }, function errorCallback(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        isConnected: function() {
            // faire requête get pour statut de la session
            return $rootScope.isAuth;
        },

        logoutUser: function(){
            $rootScope.isAuth = false ;
            $rootScope.userConnected = "";
            $rootScope.tokenSession = "";
        }
    }
})