angular.module('BeerClient.controllers')
    .controller('HunterCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, HunterService, LevelService) {
    
    // Vérification du statut d'authentification de l'utilisateur
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.hunterId= $stateParams.hunterId;
        $scope.hunter=[];
        $scope.level="";
        $scope.consultingHimself=false;
        
        // Récupération de l'objet hunter depuis l'id passé en paramètres
        HunterService.getHunterFromId($scope.hunterId).then(function (response){
            $scope.hunter=response;
            if($scope.hunter.username==$rootScope.userConnected.username){
                $scope.consultingHimself=true;
            }

            $scope.level=LevelService.getLevel($scope.hunter.validScore);

            // Calcul de l'age de l'hunter à partir de sa date de naissance
            var diff = Math.abs(Date.now()-Date.parse($scope.hunter.dateOfBirth));
            var ageDate = new Date(diff);
            $scope.age = Math.abs(ageDate.getUTCFullYear() - 1970);

        });

        // Redirection vers l'édition du profil si l'utilisateur consulté est l'utilsiateur consultant
        $scope.goToEdit = function (){
            $state.go('app.editProfile');
        }



    }
})