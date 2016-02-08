angular.module('BeerClient.controllers')
    .controller('EditProfileCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, EditProfileService) {

    // Vérification de l'authentification de l'utilisateur
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.infoMessage="Ici éditez votre profil";
        $scope.errorMessage="";

        // Récupération des données déjà renseignées
        $scope.data=[];
        $scope.data.description=$rootScope.userConnected.biography;
        if($rootScope.userConnected.dateOfBirth!=""){
            $scope.data.dateOfBirth= new Date($rootScope.userConnected.dateOfBirth);
        }


        $scope.edit = function(data){
            var mdpAlreadyUpdated = false;

            // Envoi de la requête pour éditer les champs biography et dateOfBirth de l'user
            EditProfileService.editProfile(data.description, data.dateOfBirth, $rootScope.userConnected['@id']).then(function(response){

                // Et si les champs d'ancien, de nouveau et de confirmation de mot de passe sont renseignés, il appelle la requête associée
                if(data.newPass!="" && data.confirm!="" && data.oldPass!=""){
                    if(data.newPass==data.confirm){        
                        EditProfileService.updatePass(data.oldPass, data.newPass, $rootScope.userConnected['@id']).then(function(response){
                            data.oldPass="";
                            data.newPass="";
                            data.confirm="";
                            if(response=="incorrect"){
                                $scope.infoMessage="";
                                $scope.errorMessage="Votre ancien mot de passe est incorrect";
                            }else if(response=="OK"){
                                $state.go('app.hunter/:hunterId', { hunterId: $rootScope.userConnected['@id'].split('/')[3]});
                            }
                        });

                        // Feedback d'erreur
                    }else{
                        $scope.infoMessage="";
                        $scope.errorMessage="Mot de passe à confirmer";
                    }
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Félicitations !',
                        template: 'Vos informations ont été mises à jour, mais pas votre mot de passe !'
                    });
                    $state.go('app.hunter/:hunterId', { hunterId: $rootScope.userConnected['@id'].split('/')[3]});
                }
            })

        }
    }

});