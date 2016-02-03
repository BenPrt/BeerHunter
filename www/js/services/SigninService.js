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
                return "OK";
            },function errorCallback(response){
                if(response.status==481){
                    returnValue="username";
                }else if(response.status==480){
                    returnValue="email"
                }
                return returnValue;
            });

        }
    }
});


