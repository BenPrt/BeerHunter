angular.module('BeerClient.services')

    .service('SigninService', function($q, $http, $state, $ionicPopup) {

    return {
        signin: function(userName, mail, pass) {
            return $http.post('http://beer.sinjo.xyz/post_user', { _username : userName,
                                                           _password : pass,
                                                           _email : mail   
                                                          })
                .then(function successCallBack(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Bienvenue !',
                    template: 'Vous faîtes désormais partie de notre communauté de chasseurs !'
                });
                return response;
            },function errorCallback(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                });
            });

        }
    }
});


