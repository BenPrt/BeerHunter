angular.module('BeerClient.controllers')

    .controller('HuntListCtrl', function($scope, $state, $rootScope, HuntListService) {

    if($rootScope.isAuth ==false || $rootScope.isAuth==null){
        $state.go('login');
    } else{
        $scope.hunts=[];
        HuntListService.getHunts().then(function (response){
            $scope.hunts=response;
        })



        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }
    }
});