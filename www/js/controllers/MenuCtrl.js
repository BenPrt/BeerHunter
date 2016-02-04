angular.module('BeerClient.controllers')
    .controller('MenuCtrl', function($scope, $state, $http, $rootScope, LevelService) {


    $scope.user=$rootScope.userConnected;
    $scope.level=LevelService.getLevel($scope.user.validScore);
})