angular.module('BeerClient.controllers')

    .controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $rootScope, AuthService) {
    $scope.data = {};

    
    // Si l'utilisateur essaye d'accéder à la page de login en étant déjà authentifié il est redirigé vers la carte
    if($rootScope.isAuth==true){
        $state.go('app.map');
    }

    // Fonction d'authentification, exécutée lors du clic sur le bouton
    $scope.login = function() {
        AuthService.loginUser($scope.data.username, $scope.data.password).then(function (response){
            $scope.data.username=null;
            $scope.data.password=null;
        });
    }

    // Fonction de redirection vers l'écran d'inscription
    $scope.goToSignin = function() {
        $state.go('signin');        
    }

})