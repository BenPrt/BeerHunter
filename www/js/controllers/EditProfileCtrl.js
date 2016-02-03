angular.module('BeerClient.controllers')
    .controller('EditProfileCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, EditProfileService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.infoMessage="Ici éditez votre profil";
        $scope.errorMessage="";



        $scope.edit = function(data){
            var reg= /!^(0?\d|[12]\d|3[01])-(0?\d|1[012])-((?:19|20)\d{2})$!/;

            if(reg.test(data.dateOfBirth) || data.dateOfBirth==null){
                if(data.newPass==data.confirm){
                    EditProfileService.editProfile(data.description, data.dateOfBirth, data.oldPass, data.newPass, $rootScope.userConnected['@id']).then(function(response){



                    });
                }else{
                    $scope.infoMessage="";
                    $scope.errorMessage="Confirmez le mdp";
                }
            }else{
                $scope.infoMessage="";
                $scope.errorMessage="Date de naissance incorrecte";
            }
        }
    }

});