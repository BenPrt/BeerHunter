angular.module('BeerClient.controllers')
    .controller('BarCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, BarService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        console.log($stateParams.barId);
        $scope.barId= $stateParams.barId;
        $scope.finishedHunts=[];
        $scope.pendingHunts=[];



        BarService.getBarFromId($scope.barId).then(function (response){
            $scope.bar=response;
            console.log($scope.bar);

            $scope.bar.hunts.forEach(function (element, index, array){
                var huntToAdd=[];

                //Récupération de l'objet chasse
                tmp=element.split("/");
                huntId=tmp[3];
                BarService.getHuntFromId(huntId).then(function (response){
                    var hunterId = response.hunter;
                    var huntGot = response;


                    //Récupération de la bière de la chasse
                    tmp=response.beer.split("/");
                    beerId=tmp[3];
                    BarService.getBeerFromId(beerId).then(function (response){
                        var beerGot= response;



                        //Récupération du chasseur de la chasse
                        tmp=hunterId.split("/");
                        hunterIdent=tmp[3];
                        BarService.getHunterFromId(hunterIdent).then(function (response){
                            
                            huntToAdd.splice(0, 0, huntGot['@id'].split('/')[3]);
                            huntToAdd.splice(1, 0, beerGot.name);
                            huntToAdd.splice(2,0,response.username);


                            console.log(huntToAdd);
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
        
        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }







    }
})