angular.module('BeerClient.controllers')

    .controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $timeout, $rootScope, AuthService) {
    $scope.data = {};

    // Si l'utilisateur essaye d'accéder à la page de login en étant déjà authentifié il est redirigé vers la carte
    if($rootScope.isAuth==true){
        $state.go('app.map');
    }

    $ionicPlatform.onHardwareBackButton(function (){
        if($state.is('login')==true){
            var alertPopup = $ionicPopup.alert({
                title: ' ',
                template: ' '
            });
        }
    });


    // Fonction d'authentification, exécutée lors du clic sur le bouton
    $scope.login = function(data) {
        AuthService.loginUser(data.username, data.password).then(function (response){
            AuthService.getUserLogged(data.username).then(function (response){
                $scope.data.username="";
                $scope.data.password="";
                $state.go('app.map');
            });

        });
    }

    // Fonction de redirection vers l'écran d'inscription
    $scope.goToSignin = function() {
        $state.go('signin');        
    }

})