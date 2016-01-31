angular.module('BeerClient.controllers')

    .controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $rootScope, AuthService) {
    $scope.data = {};
//    $ionicHistory.clearHistory();

    if($rootScope.isAuth==true){
        $state.go('app.map');
    }

    $scope.login = function() {
        AuthService.loginUser($scope.data.username, $scope.data.password).then(function (response){
            $scope.data.username=null;
            $scope.data.password=null;
        });
    }


    $scope.goToSignin = function() {
        $state.go('signin');        
    }

})