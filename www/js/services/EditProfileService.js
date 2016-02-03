angular.module('BeerClient.services')

    .service('EditProfileService', function($q, $http, $state, $rootScope, $ionicPopup) {
    return {

        editProfile: function(description, dateOfBirth, oldPass, newPass, id) {
            var valuesToPost ={};
            console.log("description : "+ description);
            if(description!=""){
                valuesToPost.biography=description;
            }
            console.log("dateOfBirth : "+ dateOfBirth);
            if(dateOfBirth!=""){
                valuesToPost.dateOfBirth=dateOfBirth;
            }

            var idToPost = parseInt(id.split('/')[3]);
            return $http.post('http://beer.sinjo.xyz/salt', {
                _old_password : oldPass,
                _password : newPass ,
                _id : idToPost
            })
                .then(function successCallBack(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Félicitations !',
                    template: 'Votre mot de passe a bien été changé !'
                });
                $state.go('app.map');
            },function errorCallback(response){
                if(response.status){
                    
                }
            });

        }
    }
})



//            
//            
//            return $http.post('http://beer.sinjo.xyz/api/hunts', JSON.stringify({
//                isPressure : isPressure ,
//                beer : beerToPost ,
//                bar : barToPost ,
//                hunter : hunterToPost ,
//                price : priceToPost
//            }), config)
//                .then(function successCallBack(response){
//                var alertPopup = $ionicPopup.alert({
//                    title: 'Félicitations !',
//                    template: 'Votre chasse a bien été prise en compte !'
//                });
//                $state.go('app.map');
//            },function errorCallback(response){
//                var alertPopup = $ionicPopup.alert({
//                    title: 'Erreur',
//                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
//                });
//            });

