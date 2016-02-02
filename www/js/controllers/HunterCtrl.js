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

            var diff = Math.abs(Date.now()-Date.parse($scope.hunter.dateOfBirth));
            var ageDate = new Date(diff);
            $scope.age = Math.abs(ageDate.getUTCFullYear() - 1970);

        });




        $scope.goToEdit = function (){
            $state.go('app.editProfile');
        }



    }
})