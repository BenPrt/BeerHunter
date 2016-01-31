angular.module('BeerClient.controllers')
    .controller('HunterCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, HunterService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.hunterId= $stateParams.hunterId;
        $scope.hunter=[];
        $scope.consultingHimself=false;
        HunterService.getHunterFromId($scope.hunterId).then(function (response){
            $scope.hunter=response;
            if($scope.hunter.username==$rootScope.userConnected.username){
                $scope.consultingHimself=true;
            }
        });

        $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        $scope.goToEdit = function (){
            $state.go('app.editProfile');
        }



    }
})