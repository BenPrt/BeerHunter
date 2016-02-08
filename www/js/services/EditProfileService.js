angular.module('BeerClient.services')

    .service('EditProfileService', function($q, $http, $state, $rootScope, $ionicPopup) {
    return {

        editProfile: function(description, dateOfBirth, id) {
            var config = {headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+$rootScope.tokenSession
            }}

            var valuesToPut ={};

            if(description!=""){
                valuesToPut.biography=description;
                console.log("description : "+ description);
            }

            if(dateOfBirth!=""){
                valuesToPut.dateOfBirth=dateOfBirth;
                console.log("dateOfBirth : "+ dateOfBirth);
            }

            return $http.put('http://beer.sinjo.xyz'+id, JSON.stringify(valuesToPut), config)
                .then(function successCallBack(response){
                console.log('édition terminée');
            },function errorCallback(response){ 
                console.log("édition failed")});

        },


        updatePass: function(oldPass, newPass, id) {
            var idToPost = parseInt(id.split('/')[3]);
            return $http.post('http://beer.sinjo.xyz/salt', {
                _old_password : oldPass,
                _password : newPass ,
                _id : idToPost
            })
                .then(function successCallBack(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Félicitations !',
                    template: 'Vos informations et votre mot de passe ont été mises à jour!'
                });
                return "OK";
            },function errorCallback(response){
                if(response.status==482){
                    return "incorrect";
                }
            });

        }
    }
})
