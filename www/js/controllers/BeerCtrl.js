angular.module('BeerClient.controllers')
    .controller('BeerCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope, BeerService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.beerId= $stateParams.beerId;
        $scope.beer=[];
        $scope.hunts=[];

        // Récupération de l'objet beer à partir de l'id passé en paramètre
        BeerService.getBeerFromId($scope.beerId).then(function (response){
            $scope.beer=response;


            // Récupération de la couleur de cette bière
            colorId=$scope.beer.color.split('/')[3];
            BeerService.getColorFromId(colorId).then(function (response){
                $scope.color=response;


                // Récupération de l'origine de la bière
                countryId=$scope.beer.origin.split('/')[3];
                BeerService.getCountryFromId(countryId).then(function (response){
                    $scope.country=response;

                    // Pour chaque chasse de cette bière....
                    $scope.beer.hunts.forEach(function (element, index, array){
                        var huntToAdd=[];

                        //Récupération de l'objet chasse
                        huntId=element.split("/")[3];
                        BeerService.getHuntFromId(huntId).then(function (response){
                            var huntGot = response;

                            
                            //Récupération de la bière de la chasse
                            barId=response.bar.split("/")[3];
                            BeerService.getBarFromId(barId).then(function (response){
                                huntToAdd.splice(0, 0, huntGot['@id'].split('/')[3]);
                                huntToAdd.splice(1, 0, response.name);

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
                                $scope.hunts.reverse();
                            })
                        })
                    })
                })
            })
        })
        

        // Redirection vers la chasse si l'utilisateur clique sur un des items correspondants
        $scope.goToHunt=function(huntId){
            $state.go('app.consultHunt/:huntId', { huntId: huntId});
        }

    }
})