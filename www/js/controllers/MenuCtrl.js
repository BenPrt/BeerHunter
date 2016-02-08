angular.module('BeerClient.controllers')
    .controller('MenuCtrl', function($scope, $state, $http, $rootScope, LevelService) {
    
    // Récupération des données nécessaires à l'affichage des infos de l'user loggé en haut du side menu
    $scope.user=$rootScope.userConnected;
    $scope.level=LevelService.getLevel($scope.user.validScore);

})