angular.module('BeerClient.services')

    .service('EditProfileService', function($q, $http, $state, $rootScope, $ionicPopup) {
    return {

        editProfile: function(description, dateOfBirth, newPass) {
            var valuesToPost ={};
            console.log("description : "+ description);
            if(description!=""){
                valuesToPost.biography=description;
            }
            console.log("dateOfBirth : "+ dateOfBirth);
            if(dateOfBirth!=""){
                valuesToPost.dateOfBirth=dateOfBirth;
            }
            console.log("newPass : "+ newPass);
            console.log($rootScope.userConnected.salt);
            if(newPass!=""){
                valuesToPost.password = bcrypt.hashSync(newPass,$rootScope.userConnected.salt);
            }
            console.log(valuesToPost);

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
        }

    }
});