angular.module('BeerClient.controllers')

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $rootScope, $ionicHistory, AuthService, LevelService) {

    console.log($rootScope.userConnected);

    // Gestion des redirections selon le clic sur l'item du menu
    if($rootScope.isAuth==false || $rootScope.isAuth==null || $rootScope.userConnected==undefined){
        $state.go('login');
    }else{

        // Fonction récupérant les informations de l'utilsiateur connecté pour les loger dans le sidemenu
        $scope.getUserName=function(){
            return $rootScope.userConnected.username;
        }

        $scope.getLevel=function(){
            return LevelService.getLevel($rootScope.userConnected.validScore);
        }

        
        // Fonction de redirection vers les fonctionnalités
        $scope.goToHunt=function(){
            $state.go('app.hunt');
        }

        $scope.goToMap=function(){
            $state.go('app.map');
        }

        $scope.goToSearch=function(){
            $state.go('app.search');
        }

        $scope.goToHuntList=function(){
            $state.go('app.huntList');
        }

        $scope.goToRanking=function(){
            $state.go('app.ranking');
        }

        $scope.goToProfile=function(){
            $scope.profileID=$rootScope.userConnected['@id'].split('/')[3];
            $state.go('app.hunter/:hunterId', { hunterId: $scope.profileID});
        }

        $scope.goToEditProfile=function(){
            $state.go('app.editProfile');
        }

        $scope.logout = function() {
            AuthService.logoutUser();
            $state.reload();
            $state.go('login');
        }
    }
})