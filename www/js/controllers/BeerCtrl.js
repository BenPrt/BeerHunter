angular.module('BeerClient.controllers')
    .controller('BeerCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, BeerService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{

        console.log($stateParams.beerId);
        $scope.beerId= $stateParams.beerId;
        $scope.beer=[];
        $scope.hunts=[];
        BeerService.getBeerFromId($scope.beerId).then(function (response){
            $scope.beer=response;
            console.log($scope.beer);

            colorId=$scope.beer.color.split('/')[3];
            BeerService.getColorFromId(colorId).then(function (response){
                $scope.color=response;
                console.log($scope.color);


                countryId=$scope.beer.origin.split('/')[3];
                BeerService.getCountryFromId(countryId).then(function (response){
                    $scope.country=response;
                    console.log($scope.country);

                    $scope.beer.hunts.forEach(function (element, index, array){
                        var huntToAdd=[];

                        //Récupération de l'objet chasse
                        tmp=element.split("/");
                        huntId=tmp[3];
                        BeerService.getHuntFromId(huntId).then(function (response){
                            var huntGot = response;
                            console.log(huntGot);

                            //Récupération de la bière de la chasse
                            tmp=response.bar.split("/");
                            barId=tmp[3];
                            BeerService.getBarFromId(barId).then(function (response){
                                console.log(response);
                                huntToAdd.splice(0, 0, huntGot['@id'].split('/')[3]);
                                huntToAdd.splice(1, 0, response.name);

                                console.log(huntToAdd);
                                if(huntGot.status==1){
                                    var alreadyExists=false; 
                                    $scope.hunts.forEach(function(element,index, array){
                                        if(element[1]==response.name){
                                            alreadyExists=true;
                                        }
                                    });
                                    if(!alreadyExists){
                                        $scope.hunts.splice(index, 0, huntToAdd);
                                    }

                                }
                                console.log($scope.hunts);
                                $scope.hunts.reverse();
                                console.log($scope.hunts);
                            })
                        })
                    })
                })
            })
        })
        
        
        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }

    }
})