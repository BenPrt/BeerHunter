angular.module('BeerClient.controllers')

    .controller('SearchCtrl', function($scope, $state, $rootScope, $ionicPopup, SearchService) {


    if($rootScope.isAuth ==false || $rootScope.isAuth==null){
        $state.go('login');
        console.log("Access denied");
    } else{
        $scope.searchTyped="";
        
        // Récupération des données pour la recherche
        //   Récupération des bières
        $scope.beers = [];
        SearchService.getBeers().then( function(response){
            $scope.beers = response;
            $scope.displayedResults = $scope.beers;
            $scope.displayedList = $scope.displayedResults;
        });
        //   Récupération des bars
        $scope.bars = [];
        SearchService.getBars().then( function(response){
            $scope.bars = response;
            $scope.displayedList = $scope.displayedResults;
        });
        //   Récupération des chasseurs
        $scope.hunters = [];
        SearchService.getHunters().then( function(response){
            $scope.hunters = response;
            $scope.displayedList = $scope.displayedResults;
        });



        // Initialisation et méthode de récupération des valeurs des tabs
        $scope.selectedTab = "";
        $scope.displayedResults=$scope.beers;
        $scope.selectTab = function(value){
            $scope.selectedTab=value;
            if($scope.selectedTab=="beer"){
                $scope.displayedResults=$scope.beers;
                $scope.displayedList = $scope.displayedResults;
                $scope.updateResultList($scope.searchTyped);
            }else if($scope.selectedTab=="bar"){
                $scope.displayedResults=$scope.bars;
                $scope.displayedList = $scope.displayedResults;
                $scope.updateResultList($scope.searchTyped);
            }else if($scope.selectedTab=="hunter"){
                $scope.displayedResults=$scope.hunters;
                $scope.displayedList = $scope.displayedResults;
                $scope.updateResultList($scope.searchTyped);
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: "Erreur d'interprétation des données, si elle perdure, veuillez contacter un administrateur."
                });
            }
        }


        $scope.updateResultList = function(searchTyped){
            $scope.displayedResults = $scope.displayedList.filter( function(result) {
                if(result.toLowerCase().indexOf(searchTyped.toLowerCase()) !== -1 ) return true;
            });
        }


        $scope.selectResult = function(result){
            if($scope.selectedTab=="beer"){
                SearchService.getBeerFromName(result).then(function (response){
                    $scope.searchTyped="";
                    $scope.beerToLoad= response;
                    var id =response['@id'];
                    tmp= id.split('/');
                    id=tmp[3]
                    $state.go('app.beer/:beerId', { beerId: id});
                });
            }else if($scope.selectedTab=="bar"){
                $scope.searchTyped="";
                SearchService.getBarFromName(result).then(function (response){
                    $scope.barToLoad= response;
                    var id =response['@id'];
                    tmp= id.split('/');
                    id=tmp[3]
                    $state.go('app.bar/:barId', { barId: id});
                });
            }else if($scope.selectedTab=="hunter"){
                $scope.searchTyped="";
                SearchService.getHunterFromUsername(result).then(function (response){
                    $scope.hunterToLoad= response;
                    var id =response['@id'];
                    tmp= id.split('/');
                    id=tmp[3];
                    $state.go('app.hunter/:hunterId', { hunterId: id});
                });
            }
        }





    }
})