angular.module('BeerClient.controllers')
    .controller('HuntCtrl', function($scope, $state, $http, $ionicPopup, $rootScope, HuntService) {
    if($rootScope.isAuth==false || $rootScope.isAuth==null){
        $state.go('login');
    }else{

        // Initialisation des données nécessaires
        //   Initialisation des messages
        $scope.infoMessage="Veuillez renseigner les champs suivants : ";
        $scope.errorMessage="";
        //   Récupération des bières
        $scope.beers = [];
        HuntService.getBeers().then( function(response){
            $scope.beers = response;
            $scope.displayedBeers = $scope.beers;
        });
        //   Récupération des bars
        $scope.bars = [];
        HuntService.getBars().then( function(response){
            $scope.bars = response;
            $scope.displayedBars = $scope.bars;
        });
        //   Initialisation du booléen de pression
        $scope.pressureBeer = false;
        //   Initialisation du prix de la chasse
        $scope.price = "";



        // Fonctions d'affichage ou non de l'autocomplete pour les bières
        $scope.displayBeerAutocomplete = function(){
            if($scope.barAutocomplete == true){
                $scope.barAutocomplete = false;
            }
            if($scope.beerAutocomplete == true){
                $scope.beerAutocomplete = false;
            }else{
                $scope.beerAutocomplete = true;
            }
        }
        $scope.updateListBeer = function(beerTyped){
            $scope.displayedBeers = $scope.beers.filter( function(beer) {
                if(beer.toLowerCase().indexOf(beerTyped.toLowerCase()) !== -1 ) return true;
            })
        }
        $scope.selectBeer = function(beer){
            $scope.beerSelected = beer;
            $scope.beerAutocomplete = false;
        }
        $scope.resetBeerField = function(){
            $scope.beerSelected=null;
        }



        // Fonctions d'affichage ou non de l'autocomplete pour les bars
        $scope.displayBarAutocomplete = function(){
            if($scope.beerAutocomplete == true){
                $scope.beerAutocomplete =false;
            }
            if($scope.barAutocomplete == true){
                $scope.barAutocomplete = false;
            }else{
                $scope.barAutocomplete = true;
            }
        }
        $scope.updateListBar = function(barTyped){
            $scope.displayedBars = $scope.bars.filter( function(bar) {
                if(bar.toLowerCase().indexOf(barTyped.toLowerCase()) !== -1 ) return true;
            })
        }
        $scope.selectBar = function(bar){
            $scope.barSelected = bar;
            $scope.barAutocomplete = false;
        }
        $scope.resetBarField = function(){
            $scope.barSelected=null;
        }



        //validation
        $scope.hunt = function(isPressure, beer, beers, bar, price){
            if(beer==null){
                $scope.infoMessage="";
                $scope.errorMessage="Vous devez sélectionner une bière !"
            }else if(bar==null){
                $scope.infoMessage="";
                $scope.errorMessage="Vous devez sélectionner un bar !"
            }else if(price.length>5 || price==0 || price.match(/[a-z]/i) || price.split(".").length-1>1 || price.split(",").length-1>1 || (price.indexOf('.')!=-1 && price.indexOf(',')!=-1)){
                $scope.infoMessage="";
                $scope.errorMessage="Le prix de votre bière est incorrect !"
            }else{
                var priceToPost;
                if(price.indexOf('.')==-1){
                    if(price.indexOf(',')==-1){
                        priceToPost = price+'.001';
                    }else if(price.indexOf(',')==price.length-1){
                        number=price.substring(0, price.indexOf(',')); 
                        priceToPost=price+".001";
                    } else{
                        number=price.substring(0, price.indexOf(','));
                        decimal=price.substring(price.indexOf(',')+1,price.length-1);
                        priceToPost=number+'.'+decimal;
                    }
                }else if(price.indexOf('.')==price.length-1){
                    priceToPost=price+"001";
                }else{
                    priceToPost=price+" ";
                }
                HuntService.post_Hunt(isPressure, beer, $scope.beers, bar, $scope.bars, priceToPost).then(function(response){
                    $scope.beerSelected="";
                    $scope.barSelected="";
                    $scope.pressureBeer=false;
                    $scope.price="";
                    $state.go('app.map');  
                })
            }
        }
    }
})
