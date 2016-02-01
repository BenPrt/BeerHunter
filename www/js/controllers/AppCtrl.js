angular.module('BeerClient.controllers')

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $rootScope, AuthService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }

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

    $scope.logout = function() {
        AuthService.logoutUser;
        $state.go('login');
    }
})