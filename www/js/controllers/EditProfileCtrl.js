angular.module('BeerClient.controllers')
    .controller('EditProfileCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, EditProfileService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.infoMessage="Ici éditez votre profil";
        $scope.errorMessage="";
        
        $scope.data=[];
        $scope.data.description=$rootScope.userConnected.biography;
        $scope.data.dateOfBirth= new Date($rootScope.userConnected.dateOfBirth);



        $scope.edit = function(data){
            var mdpAlreadyUpdated = false;

            EditProfileService.editProfile(data.description, data.dateOfBirth, $rootScope.userConnected['@id']).then(function(response){
                if(data.newPass=="" && data.confirm=="" && data.oldPass==""){
                    if(data.newPass==data.confirm){
                        EditProfileService.updatePass(data.oldPass, data.newPass, $rootScope.userConnected['@id']).then(function(response){
                            if(response=="incorrect"){
                                $scope.infoMessage="";
                                $scope.errorMessage="Votre ancien mot de passe est incorrect";
                            }else{
                                $state.go('app.hunter/:hunterId', { hunterId: $rootScope.userConnected['@id'].split('/')[3]});
                            }
                        });
                    }else{
                        $scope.infoMessage="";
                        $scope.errorMessage="Confirmez le mdp";
                    }
                }else{
                    $state.go('app.hunter/:hunterId', { hunterId: $rootScope.userConnected['@id'].split('/')[3]});
                }
            })

        }
    }

});