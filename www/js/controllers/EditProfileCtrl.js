angular.module('BeerClient.controllers')
    .controller('EditProfileCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, EditProfileService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.infoMessage="Ici éditez votre profil";



        $scope.edit = function(data){
            //test date de naissance
            
            //si oldMdp présent, on fait un psotlogin pour savoir si ok

            //si okay et champs new mdp et confirm présent et conforme, on fait l'edit vec le new mdp
            EditProfileService.editProfile(data.description, data.dateOfBirth, data.newPass).then(function(response){



            });
            
            //si non, si y a que description et/ou date de naissance on fait l'edit de ces champs
        }
    }

});