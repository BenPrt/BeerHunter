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
            $scope.beers.sort(function(a,b){
                if(a.name<b.name){
                    return -1;
                }
                if(a.name>b.name){
                    return 1;
                }
                return 0;
            })
            $scope.displayedBeers = $scope.beers;
        });
        
        //   Récupération des bars
        $scope.bars = [];
        HuntService.getBars().then( function(response){
            $scope.bars = response;
            $scope.bars.sort(function(a,b){
                if(a.name<b.name){
                    return -1;
                }
                if(a.name>b.name){
                    return 1;
                }
                return 0;
            })
            $scope.displayedBars = $scope.bars;
        });
        $scope.hunts = [];
        HuntService.getHunts().then( function(response){
            $scope.hunts = response;
        });
        $scope.siblingHunt="";
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
                if(beer.name.toLowerCase().indexOf(beerTyped.toLowerCase()) !== -1 ) return true;
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
                if(bar.name.toLowerCase().indexOf(barTyped.toLowerCase()) !== -1 ) return true;
            })
        }
        $scope.selectBar = function(bar){
            $scope.barSelected = bar;
            $scope.barAutocomplete = false;
        }
        $scope.resetBarField = function(){
            $scope.barSelected=null;
        }


        $scope.hunt = function(isPressure, beer, bar, price){
            $scope.siblingHunt="";
            // Vérification que la chasse n'existe pas déjà
            $scope.hunts.forEach(function (element, index, array){
                if(element.beer.split('/')[3]==beer.id){
                    if(element.bar.split('/')[3]==bar.id){
                        if(element.isPressure==isPressure){
                            $scope.siblingHunt=element['@id'];
                        }
                    }
                }
            });
            
            
            // Gestion et feedback des erreurs
            if(beer.name==null){
                $scope.infoMessage="";
                $scope.errorMessage="Vous devez sélectionner une bière !"
            }else if(bar==null){
                $scope.infoMessage="";
                $scope.errorMessage="Vous devez sélectionner un bar !"
            }else if(price.length>5 || price==0 || price.match(/[a-z]/i) || price.split(".").length-1>1 || price.split(",").length-1>1 || (price.indexOf('.')!=-1 && price.indexOf(',')!=-1)){
                $scope.infoMessage="";
                $scope.errorMessage="Le prix de votre bière est incorrect !"
            }else if($scope.siblingHunt!=""){

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Cette chasse existe déjà !',
                    template: 'Souhaitez-vous accéder à la fiche de celle-ci?'
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        $state.go('app.consultHunt/:huntId', { huntId: $scope.siblingHunt.split('/')[3]});
                    } else {
                    }
                });

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

                // Exécution de la requête
                HuntService.post_Hunt(isPressure, beer.id, bar.id, priceToPost).then(function(response){
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
