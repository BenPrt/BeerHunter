angular.module('BeerClient.controllers')
    .controller('ConsultHuntCtrl', function($scope, $state, $stateParams, $http, $ionicPopup, $rootScope,$timeout, $filter, ConsultHuntService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{
        $scope.huntId= $stateParams.huntId;
        $scope.hunt=[];

        $scope.state="";
        $scope.visitorIsTheHunter=false;
        $scope.alreadyVoted=false;
        $scope.errorMessage="";

        ConsultHuntService.getHuntFromId($scope.huntId).then(function (response){
            $scope.hunt=response;
            if($scope.hunt.status==0){
                $scope.state="pending";
            }else if($scope.hunt.status==1){
                $scope.state="valid";
            }else if($scope.hunt.status==2){
                console.log('ERROR');
            }

            if($scope.userConnected['@id']==$scope.hunt.hunter){
                $scope.visitorIsTheHunter=true;
            } else{
                $rootScope.userConnected.votes.forEach(function(element, index,array){
                    if($scope.hunt.votes.indexOf(element)!=-1){
                        $scope.alreadyVoted=true;
                        console.log("il a déja votééé");
                    }
                })
            }

            var barId= $scope.hunt.bar.split('/')[3];
            ConsultHuntService.getBarFromId(barId).then(function (response){
                $scope.bar=response;


                var beerId= $scope.hunt.beer.split('/')[3];
                ConsultHuntService.getBeerFromId(beerId).then(function (response){
                    $scope.beer=response;

                    var beerId= $scope.beer.color.split('/')[3];
                    ConsultHuntService.getColorFromId(beerId).then(function (response){
                        $scope.color=response;

                        var countryId= $scope.beer.origin.split('/')[3];
                        ConsultHuntService.getCountryFromId(countryId).then(function (response){
                            $scope.origin=response;


                            var hunterId=$scope.hunt.hunter.split('/')[3];
                            ConsultHuntService.getHunterFromId(hunterId).then(function (response){
                                $scope.hunter=response;





                                $scope.setErrorMessage=function(){
                                    if($scope.visitorIsTheHunter && $scope.state=="pending"){
                                        $scope.errorMessage="Vous ne pouvez pas voter pour vos propres chasses !";
                                        $timeout(function(){$scope.errorMessage=''}, 3000);
                                    } else if($scope.visitorIsTheHunter && $scope.state=="valid" && $scope.alreadyVoted==true){
                                        $scope.errorMessage="Vous avez déjà indiqué ceci !";
                                        $timeout(function(){$scope.errorMessage=''}, 3000);
                                    }
                                    if($scope.alreadyVoted==true){
                                        $scope.errorMessage="Vous avez déjà voté pour cette chasse !"
                                        $timeout(function(){$scope.errorMessage=''}, 3000);
                                    }
                                };


                                $scope.vote=function(vote){
                                    ConsultHuntService.vote(vote, $scope.hunt).then(function(){
                                        $scope.alreadyVoted=true;
                                        
                                    });
                                };
                            })
                        })
                    })
                })
            })
        });




    }
})