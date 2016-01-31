angular.module('BeerClient.controllers')
    .controller('EditProfileCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, EditProfileService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.infoMessage="Ici éditez votre profil";

        
        
        $scope.editProfile = function(data){
               
        }
    }

});