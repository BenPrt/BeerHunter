angular.module('BeerClient.controllers')

    .controller('RankingCtrl', function($scope, $state, $rootScope, RankingService) {

    if($rootScope.isAuth ==false || $rootScope.isAuth==null){
        $state.go('login');
    } else{
       

        $scope.goToHunter=function(hunterId){
            $state.go('app.hunter/:hunterId', { hunterId: hunterId});
        }
    }
});