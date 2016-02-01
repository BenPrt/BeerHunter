angular.module('BeerClient.controllers')

    .controller('MapCtrl', function($scope, $state, $rootScope, MapService) {

    if($rootScope.isAuth ==false || $rootScope.isAuth==null){
        $state.go('login');
    } else{

        $scope.mapCreated = function(map) {
            $scope.map = map;
        };

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log('Got pos', pos);
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };




        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Initialisation des données pour le filtrage   
        $scope.beerSelected="";
        $scope.beerId="";
        $scope.colorSelected="";
        $scope.colorId="";
        $scope.originSelected="";
        $scope.originId="";
        $scope.pressureSelected=false;
        $scope.priceMinSelected="";
        $scope.priceMaxSelected="";
        $scope.degreeMinSelected="";
        $scope.degreeMaxSelected="";
        $scope.statusSelected=1;
        //     Récupération des bières pour initialiser l'autocomplete du filtre de bières
        $scope.beers = [];
        //         Récupération de toutes les bières pour loger dans l'autocomplete
        MapService.getBeers().then( function(response){
            $scope.beers = response;
            $scope.displayedBeers = $scope.beers;
        });
        //         Fonction chargée de gérer l'affichage de l'autocomplete
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
        //         Fonction chargée de gérer le contenu de l'autocomplete en fonction de ce que l'utilsiateur tape
        $scope.updateListBeer = function(beerTyped){
            $scope.displayedBeers = $scope.beers.filter( function(beer) {
                if(beer.toLowerCase().indexOf(beerTyped.toLowerCase()) !== -1 ) return true;
            })
        }
        //         Fonction chargée de récupérer la bière sélectionnée par l'user dans l'autocomplete
        $scope.selectBeer = function(beer){
            $scope.beerSelected = beer;
            $scope.beers.forEach(function (element, index, array){
                if(element.name==$scope.beerSelected){
                    $scope.beerId=element['@id'];
                }
            })
            $scope.colorSelected="";
            $scope.colorId="";
            $scope.originSelected="";
            $scope.originId="";
            $scope.degreeMinSelected="";
            $scope.degreeMaxSelected="";
            $scope.beerAutocomplete = false;
            $scope.updateMap();
        }
        //         Fonction chargée de remettre à zéro le champ bière et de recharger les valeurs des champs cachés
        $scope.resetBeerField = function(){
            $scope.beerSelected="";
            $scope.beerId="";
            if($scope.colorPressed!=""){
                $scope.setColor($scope.colorPressed);
            }
            if($scope.originPressed!=""){
                $scope.setOrigin($scope.originPressed);
            }
            if($scope.degreePresse!=""){
                $scope.setDegree($scope.degreePressed);
            }
            $scope.updateMap();
        }

        //   Récupération des différentes couleurs et des pays des bières disponibles
        $scope.colors = [];
        $scope.origins =[];
        MapService.getColors().then(function(response){
            $scope.colors = response;
            MapService.getCountries().then(function(response){
                $scope.origins=response;
            });
        });

        // Fonction chargée de récupérer la valeur du filtre robe de la bière
        $scope.setColor= function(colorClicked){
            $scope.colorPressed=colorClicked;
            if($scope.colorPressed==""){
                $scope.colorSelected="";
                $scope.colorId="";
            }else{
                $scope.colorSelected=$scope.colorPressed;
                $scope.colors.forEach(function (element, index, array){
                    if(element.name==$scope.colorPressed){
                        $scope.colorId=element['@id'];
                    }
                })
            }
            $scope.updateMap();
        }
        // Fonction chargée de récupérer la valeur du filtre origine de la bière
        $scope.setOrigin= function(originClicked){
            $scope.originPressed=originClicked;
            if($scope.originPressed==""){
                $scope.originSelected="";
                $scope.originId="";
            }else{
                $scope.originSelected=originClicked;
                $scope.origins.forEach(function (element, index, array){
                    if(element.name==$scope.originPressed){
                        $scope.originId=element['@id'];
                    }
                })
            }
            $scope.updateMap();
        }
        // Fonction chargée de récupérer la valeur du filtre force de la bière
        $scope.setDegree= function(degreeClicked){
            $scope.degreePressed=degreeClicked;
            if($scope.degreePressed==""){
                $scope.degreeMinSelected="";
                $scope.degreeMaxSelected="";
            }else if($scope.degreePressed=="Légère (<5°)"){
                $scope.degreeMinSelected=0;
                $scope.degreeMaxSelected=5;
            }else if($scope.degreePressed=="Moyenne (5-8°)"){
                $scope.degreeMinSelected=5;
                $scope.degreeMaxSelected=8;
            }else if($scope.degreePressed=="Forte (>8°)"){
                $scope.degreeMinSelected=8;
                $scope.degreeMaxSelected=100;
            }
            $scope.updateMap();
        }
        // Fonction chargée de récupérer la valeur du filtre prix de la bière
        $scope.setPrice= function(priceClicked){
            if(priceClicked==""){
                $scope.priceMinSelected="";
                $scope.priceMaxSelected="";
            }else if(priceClicked=="Moins de 3€"){
                $scope.priceMinSelected=0;
                $scope.priceMaxSelected=parseFloat("3.01");
            }else if(priceClicked=="De 3€ à 5€"){
                $scope.priceMinSelected=3;
                $scope.priceMaxSelected=parseFloat("5.01");
            }else if(priceClicked=="Plus de 5€"){
                $scope.priceMinSelected=parseFloat("4.999");
                $scope.priceMaxSelected=100;
            }
            $scope.updateMap();
        }
        // Fonction chargée de récupérer le statut de la chasse marquée
        $scope.setStatus= function(statusClicked){
            if(statusClicked==""){
                $scope.statusSelected=1;
            }else if(statusClicked=="En cours"){
                $scope.statusSelected=0;
            }
            $scope.updateMap();
        }
        // Fonction chargée de récupérer le statut du toggle de pression
        $scope.setPressure= function(bool){
            if(bool==true){
                $scope.pressureSelected=true;
            }else{
                $scope.pressureSelected=false;
            }
            $scope.updateMap();
        }

        // Fonction chargée de mettre à jour la carte en fonction des données des filtres
        $scope.updateMap=function(){
            MapService.getBarsFromFilters($scope.beerId, $scope.colorId, $scope.originId, $scope.pressureSelected, $scope.priceMinSelected, $scope.priceMaxSelected, $scope.degreeMinSelected, $scope.degreeMaxSelected, $scope.statusSelected).then(function(response){
                $scope.filteredHunts=response;
                $scope.clearMarkers();
                $scope.filteredHunts.forEach(function(element, index, array){
                    var marker=new google.maps.Marker({
                        position:new google.maps.LatLng(element.latitude,element.longitude),
                        color:"#96570F",
                        strokeOpacity:0.8,
                        strokeWeight:2
                    });
                    markers.push(marker);
                    marker.setMap(map);

                    if(element.hunts.length>1){
                        var infowindow = new google.maps.InfoWindow({
                            content:"<h4>"+element.name + "</h4>" +element.hunts.length+" chasses enregistrées"
                        });
                    }else{
                        var infowindow = new google.maps.InfoWindow({
                            content:"<h4>"+element.name + "</h4>Une chasse enregistrée"
                        }); 
                    }
                    google.maps.event.addListener(marker,'click',function() {
                        infowindow.open(map,marker);
                        map.setCenter(marker.getPosition());
                    });
                });
            });
        }

        // Initialisation de la carte sans filtrage (toutes les chasses valides sont affichées)
        var myLatlng = new google.maps.LatLng(50.634922, 3.063646);
        var mapOptions = {
            center: myLatlng,
            zoom: 14,
            streetViewControl: false,
            mapTypeControl : false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-mapContainer"),mapOptions);
        console.log("map affichée");
        var markers =[];
        $scope.hunterBars=[];

        $scope.clearMarkers=function(){
            while(markers.length) {
                markers.pop().setMap(null);
            }
            markers.length=0;
        }

        MapService.getHuntedBars().then( function(response){
            $scope.huntedBars= response;

            $scope.huntedBars.forEach(function(element,index,array){
                MapService.getBarPositionFromId(element).then(function (response){
                    position = response;

                    var marker=new google.maps.Marker({
                        position:new google.maps.LatLng(position.latitude,position.longitude),
                    });
                    markers.push(marker);
                    marker.setMap(map);
                    tmp=position['@id'].split();
                    id=tmp[3];
                    if(position.hunts.length>1){
                        var infowindow = new google.maps.InfoWindow({
                            content:"<h4>"+position.name + "</h4>" +position.hunts.length+" chasses enregistrées"
                        });
                    }else{
                        var infowindow = new google.maps.InfoWindow({
                            content:"<h4>"+position.name + "</h4>Une chasse enregistrée"
                        }); 
                    }
                    google.maps.event.addListener(marker,'click',function() {
                        infowindow.open(map,marker);
                        map.setCenter(marker.getPosition());
                    });
                    google.maps.event.addListener(infowindow,'click',function() {

                        $state.go('app.bar/:barId', { barId: id});
                    });


                })
            })
        });





    }
})