angular.module('BeerClient.controllers')
    .controller('BarCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, BarService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.barId= $stateParams.barId;
        $scope.finishedHunts=[];
        $scope.pendingHunts=[];


        // On récupère l'objet du bar depuis l'id passé en paramètre
        BarService.getBarFromId($scope.barId).then(function (response){
            $scope.bar=response;

            
            //Pour chaque chasse de ce bar...
            $scope.bar.hunts.forEach(function (element, index, array){
                var huntToAdd=[];

                
                //Récupération de l'objet chasse correspondant
                tmp=element.split("/");
                huntId=tmp[3];
                BarService.getHuntFromId(huntId).then(function (response){
                    var hunterId = response.hunter;
                    var huntGot = response;


                    //Récupération de la bière de chacun de ces chasses
                    tmp=response.beer.split("/");
                    beerId=tmp[3];
                    BarService.getBeerFromId(beerId).then(function (response){
                        var beerGot= response;


                        //Récupération du chasseur de la chasse pour l'afficher ensuite dans l'item de la chasse du bar
                        tmp=hunterId.split("/");
                        hunterIdent=tmp[3];
                        BarService.getHunterFromId(hunterIdent).then(function (response){
                            
                            huntToAdd.splice(0, 0, huntGot['@id'].split('/')[3]);
                            huntToAdd.splice(1, 0, beerGot.name);
                            huntToAdd.splice(2,0,response.username);


                            if(huntGot.status==1){
                                $scope.finishedHunts.splice(index, 0, huntToAdd);
                            }else if(huntGot.status==0){
                                $scope.pendingHunts.splice(index,0,huntToAdd);
                            }
                        })
                    });

                });
            })
        })
        
        // Fonction de redirection vers une chasse si l'user clique sur un de ces items
        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }


    }
})