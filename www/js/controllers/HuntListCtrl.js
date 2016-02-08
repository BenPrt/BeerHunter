angular.module('BeerClient.controllers')

    .controller('HuntListCtrl', function($scope, $state, $rootScope, HuntListService) {
    // Vérification du statut de l'authentification du visiteur 
    if($rootScope.isAuth ==false || $rootScope.isAuth==null){
        $state.go('login');
    } else{
        $scope.hunts=[];
        
        // Récupération des chasses en cours
        HuntListService.getHunts().then(function (response){
            $scope.hunts=response;
        })

        // Fonction de redirection vers la chasse sélectionnée
        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }
    }
});