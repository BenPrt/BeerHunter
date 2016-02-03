angular.module('BeerClient.services')

    .service('ConsultHuntService', function($q, $http, $state, $rootScope, $timeout, $ionicPopup) {



    return {
        getHuntFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunts/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBarFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/bars/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getBeerFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/beers/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getColorFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/colors/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getCountryFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/countries/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        getHunterFromId:function(id) {
            return $http({
                method: 'GET',
                url: 'http://beer.sinjo.xyz/api/hunters/'+id,
                headers:{
                    'Authorization':'Bearer '+$rootScope.tokenSession
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {    
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Erreur de récupération des données, si elle perdure, veuillez contacter un administrateur.'
                });
            });
        },

        vote: function(vote, hunt) {
            var currentHunt = hunt;
            var voteToPost=vote;
            var huntToPost=hunt['@id'];
            var hunterToPost= $rootScope.userConnected;

            var config = {headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+$rootScope.tokenSession
            }}

            return $http.post('http://beer.sinjo.xyz/api/votes', JSON.stringify({
                vote : vote,
                hunt : huntToPost,
                hunter : hunterToPost['@id']
            }), config)
                .then(function successCallBack(response){

                var balanceToPost = 0;
                var statusToPost=0;

                if(currentHunt.status==0 && currentHunt.balance>-1 && currentHunt.balance<2){



                    //*********************************** CAS N° 1 ***************************************
                    // Une chasse en cours ayant une balance de 0 ou 1 reçoit un vote positif
                    // Le chasseur votant voit son potentiel incrémenter de 5 points
                    if(voteToPost==true){
                        balanceToPost = ++currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore+5;

                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut
                            }

                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Félicitations !',
                                    template: 'Votre vote a bien été pris en compte'
                                });
                            },function errorCallback(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur',
                                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                });
                            })
                        },function errorCallback(response){});


                        //*********************************** CAS N° 2 ***************************************
                        // Une chasse en cours ayant une balance de 0 ou 1 reçoit un vote négatif
                        // Le chasseur votant voit son potentiel incrémenter de 5 points
                    }else if(voteToPost==false){
                        balanceToPost = --currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore+5;

                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut
                            }

                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Félicitations !',
                                    template: 'Votre vote a bien été pris en compte'
                                });
                            },function errorCallback(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur',
                                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                });
                            })
                        },function errorCallback(response){});
                    }


                }else if(currentHunt.status==0 && currentHunt.balance==-1){

                    //*********************************** CAS N° 3 ***************************************
                    // Une chasse en cours ayant une balance de -1 reçoit un vote positif
                    // Le chasseur votant voit son potentiel incrémenter de 5 points
                    if(voteToPost==true){
                        balanceToPost = ++currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore+5;

                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut
                            }

                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Félicitations !',
                                    template: 'Votre vote a bien été pris en compte'
                                });
                            },function errorCallback(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur',
                                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                });
                            })
                        },function errorCallback(response){});



                        //*********************************** CAS N° 4 ***************************************
                        // Une chasse en cours ayant une balance de -1 reçoit un vote négatif et est donc invalidée
                        // Le chasseur ayant effectué la chasse voit son potentiel décrémenter de 15 points
                        // Les chasseurs ayant voté la même chose voit leur score incrémenté de 5 points et leur potentiel décrémenté de 5
                        // Les chasseurs ayant voté à l'inverse voit leur potentiel décrémenté de 5
                    } else if(voteToPost==false){
                        balanceToPost = 0;
                        statusToPost =2;
                        var valuesToPUT = {
                            balance : balanceToPost,
                            status : statusToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore-5;
                            var validScoreToPut = $rootScope.userConnected.validScore+5;
                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut,
                                validScore : validScoreToPut
                            }

                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                $http({
                                    method: 'GET',
                                    url: 'http://beer.sinjo.xyz/api/hunters/'+currentHunt.hunter.split('/')[3],
                                    headers:{
                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                    }
                                }).then(function successCallback(response) {
                                    var potentialScoreToPut = response.data.potentialScore-15;
                                    var hunterValuesToPUT ={
                                        potentialScore : potentialScoreToPut,
                                    }
                                    $http.put('http://beer.sinjo.xyz'+currentHunt.hunter, JSON.stringify(hunterValuesToPUT), config)
                                        .then(function successCallBack(response){
                                    },function errorCallback(response){});

                                    currentHunt.votes.forEach(function (element, index, array){
                                        $http({
                                            method: 'GET',
                                            url: 'http://beer.sinjo.xyz/api/votes/'+element.split('/')[3],
                                            headers:{
                                                'Authorization':'Bearer '+$rootScope.tokenSession
                                            }
                                        }).then(function successCallback(response) {
                                            var voteGot=response.data;

                                            if(voteGot.vote==false){
                                                $http({
                                                    method: 'GET',
                                                    url: 'http://beer.sinjo.xyz/api/hunters/'+voteGot.hunter.split('/')[3],
                                                    headers:{
                                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                                    }
                                                }).then(function successCallback(response) {
                                                    var potentialScoreToPut = response.data.potentialScore-5;
                                                    var validScoreToPut = response.data.validScore+5;
                                                    var hunterValuesToPUT ={
                                                        potentialScore : potentialScoreToPut,
                                                        validScore : validScoreToPut
                                                    }
                                                    $http.put('http://beer.sinjo.xyz'+voteGot.hunter, JSON.stringify(hunterValuesToPUT), config)
                                                        .then(function successCallBack(response){
                                                    },function errorCallback(response){
                                                    });
                                                })
                                            }else{
                                                $http({
                                                    method: 'GET',
                                                    url: 'http://beer.sinjo.xyz/api/hunters/'+voteGot.hunter.split('/')[3],
                                                    headers:{
                                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                                    }
                                                }).then(function successCallback(response) {
                                                    var potentialScoreToPut = response.data.potentialScore-5;
                                                    var hunterValuesToPUT ={
                                                        potentialScore : potentialScoreToPut,
                                                    }
                                                    $http.put('http://beer.sinjo.xyz'+voteGot.hunter, JSON.stringify(hunterValuesToPUT), config)
                                                        .then(function successCallBack(response){
                                                    },function errorCallback(response){});
                                                })
                                            }

                                        }, function errorCallback(response) {});
                                    });

                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Félicitations !',
                                        template: 'Votre vote a été pris en compte et cette chasse est désormais valide'
                                    });
                                }, function errorCallback(response) {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Erreur',
                                        template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                    });
                                });
                            },function errorCallback(response){});
                        },function errorCallback(response){});

                    }

                    //*********************************** CAS N° 5 ***************************************
                    // Une chasse validée ayant une balance de -1 reçoit un vote négatif et est donc invalidée
                    // Les chasseurs ayant voté voit leur score incrémenté de 5 points et leur potentiel décrémenté de 5
                }else if(currentHunt.status==1 && currentHunt.balance==-1 && voteToPost==false){
                    balanceToPost = 0;
                    statusToPost =2;
                    var valuesToPUT = {
                        balance : balanceToPost,
                        status : statusToPost
                    };


                    $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                        .then(function successCallBack(response){

                        var potentialScoreToPut = $rootScope.userConnected.potentialScore-5;
                        var validScoreToPut = $rootScope.userConnected.validScore+5;
                        var hunterValuesToPUT ={
                            potentialScore : potentialScoreToPut,
                            validScore : validScoreToPut
                        }

                        $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                            .then(function successCallBack(response){
                            $http({
                                method: 'GET',
                                url: 'http://beer.sinjo.xyz/api/hunters/'+currentHunt.hunter.split('/')[3],
                                headers:{
                                    'Authorization':'Bearer '+$rootScope.tokenSession
                                }
                            }).then(function successCallback(response) {
                                currentHunt.votes.forEach(function (element, index, array){
                                    $http({
                                        method: 'GET',
                                        url: 'http://beer.sinjo.xyz/api/votes/'+element.split('/')[3],
                                        headers:{
                                            'Authorization':'Bearer '+$rootScope.tokenSession
                                        }
                                    }).then(function successCallback(response) {
                                        var voteGot=response.data;
                                        $http({
                                            method: 'GET',
                                            url: 'http://beer.sinjo.xyz/api/hunters/'+voteGot.hunter.split('/')[3],
                                            headers:{
                                                'Authorization':'Bearer '+$rootScope.tokenSession
                                            }
                                        }).then(function successCallback(response) {
                                            var potentialScoreToPut = response.data.potentialScore-5;
                                            var validScoreToPut = response.data.validScore+5;
                                            var hunterValuesToPUT ={
                                                potentialScore : potentialScoreToPut,
                                                validScore : validScoreToPut
                                            }
                                            $http.put('http://beer.sinjo.xyz'+voteGot.hunter, JSON.stringify(hunterValuesToPUT), config)
                                                .then(function successCallBack(response){
                                            },function errorCallback(response){
                                            });
                                        })


                                    }, function errorCallback(response) {});
                                });

                                var alertPopup = $ionicPopup.alert({
                                    title: 'Félicitations !',
                                    template: 'Votre vote a été pris en compte et cette chasse est désormais valide'
                                });
                            }, function errorCallback(response) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur',
                                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                });
                            });
                        },function errorCallback(response){});
                    },function errorCallback(response){});


                } else if(currentHunt.status==0 && currentHunt.balance==2){

                    //*********************************** CAS N° 6 ***************************************
                    // Une chasse en cours avec une balance de 2 reçoit un vote positif et est donc validée
                    // Le chasseur ayant réalisé la chasse reçoit 15 points
                    // Les votants ayant voté la même choses voient leur score incrémenter de 5 points.
                    // Les chasseurs ayant voté l'inverse voient leur potentiel décrémenter de 5 points.
                    if(voteToPost==true){
                        balanceToPost = 0;
                        statusToPost =1;
                        var valuesToPUT = {
                            balance : balanceToPost,
                            status : statusToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore-5;
                            var validScoreToPut = $rootScope.userConnected.validScore+5;
                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut,
                                validScore : validScoreToPut
                            }
                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                $http({
                                    method: 'GET',
                                    url: 'http://beer.sinjo.xyz/api/hunters/'+currentHunt.hunter.split('/')[3],
                                    headers:{
                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                    }
                                }).then(function successCallback(response) {
                                    var potentialScoreToPut = response.data.potentialScore-15;
                                    var validScoreToPut = response.data.validScore+15;
                                    var hunterValuesToPUT ={
                                        potentialScore : potentialScoreToPut,
                                        validScore : validScoreToPut
                                    }
                                    $http.put('http://beer.sinjo.xyz'+currentHunt.hunter, JSON.stringify(hunterValuesToPUT), config)
                                        .then(function successCallBack(response){
                                    },function errorCallback(response){});

                                    currentHunt.votes.forEach(function (element, index, array){
                                        $http({
                                            method: 'GET',
                                            url: 'http://beer.sinjo.xyz/api/votes/'+element.split('/')[3],
                                            headers:{
                                                'Authorization':'Bearer '+$rootScope.tokenSession
                                            }
                                        }).then(function successCallback(response) {
                                            var voteGot=response.data;

                                            if(voteGot.vote==true){
                                                $http({
                                                    method: 'GET',
                                                    url: 'http://beer.sinjo.xyz/api/hunters/'+voteGot.hunter.split('/')[3],
                                                    headers:{
                                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                                    }
                                                }).then(function successCallback(response) {
                                                    var potentialScoreToPut = response.data.potentialScore-5;
                                                    var validScoreToPut = response.data.validScore+5;
                                                    var hunterValuesToPUT ={
                                                        potentialScore : potentialScoreToPut,
                                                        validScore : validScoreToPut
                                                    }
                                                    $http.put('http://beer.sinjo.xyz'+voteGot.hunter, JSON.stringify(hunterValuesToPUT), config)
                                                        .then(function successCallBack(response){
                                                    },function errorCallback(response){
                                                    });
                                                })
                                            }else{
                                                $http({
                                                    method: 'GET',
                                                    url: 'http://beer.sinjo.xyz/api/hunters/'+voteGot.hunter.split('/')[3],
                                                    headers:{
                                                        'Authorization':'Bearer '+$rootScope.tokenSession
                                                    }
                                                }).then(function successCallback(response) {
                                                    var potentialScoreToPut = response.data.potentialScore-5;
                                                    var hunterValuesToPUT ={
                                                        potentialScore : potentialScoreToPut,
                                                    }
                                                    $http.put('http://beer.sinjo.xyz'+voteGot.hunter, JSON.stringify(hunterValuesToPUT), config)
                                                        .then(function successCallBack(response){
                                                    },function errorCallback(response){});
                                                })
                                            }

                                            $timeout(
                                                $http.delete('http://beer.sinjo.xyz'+voteGot['@id'], config)
                                                .then(function successCallBack(response){
                                                },function errorCallback(response){})
                                                , 1000
                                            );



                                        }, function errorCallback(response) {});
                                    });

                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Félicitations !',
                                        template: 'Votre vote a été pris en compte et cette chasse est désormais valide'
                                    });
                                }, function errorCallback(response) {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Erreur',
                                        template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                    });
                                });
                            },function errorCallback(response){});
                        },function errorCallback(response){});






                        // ********************************** CAS N° 7 ***************************************
                        // Une chasse en cours avec une balance de 2 reçoit un vote négatif, sa balance passe à 1
                        // Le chasseur ayant voté ceci voit son potentiel augmenté de 5 points
                    }else if(voteToPost==false){
                        balanceToPost = --currentHunt.balance;
                        var valuesToPUT = {
                            balance : balanceToPost
                        };

                        $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                            .then(function successCallBack(response){

                            var potentialScoreToPut = $rootScope.userConnected.potentialScore+5;

                            var hunterValuesToPUT ={
                                potentialScore : potentialScoreToPut
                            }

                            $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                                .then(function successCallBack(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Félicitations !',
                                    template: 'Votre vote a bien été pris en compte'
                                });
                            },function errorCallback(response){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur',
                                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                                });
                            })
                        },function errorCallback(response){});
                    }


                    // ********************************** CAS N° 8 ***************************************
                    // Une chasse validée avec une balance de 0 reçoit un vote négatif, sa balance passe à -1
                    // Le chasseur ayant voté ceci voit son potentiel augmenté de 5 points 
                } else if(currentHunt.status==1 && currentHunt.balance==0 && voteToPost==false){
                    balanceToPost = --currentHunt.balance;
                    var valuesToPUT = {
                        balance : balanceToPost
                    };

                    $http.put('http://beer.sinjo.xyz'+currentHunt['@id'], JSON.stringify(valuesToPUT), config)
                        .then(function successCallBack(response){

                        var potentialScoreToPut = $rootScope.userConnected.potentialScore+5;

                        var hunterValuesToPUT ={
                            potentialScore : potentialScoreToPut
                        }

                        $http.put('http://beer.sinjo.xyz'+$rootScope.userConnected['@id'], JSON.stringify(hunterValuesToPUT), config)
                            .then(function successCallBack(response){
                            var alertPopup = $ionicPopup.alert({
                                title: 'Félicitations !',
                                template: 'Votre vote a bien été pris en compte'
                            });
                        },function errorCallback(response){
                            var alertPopup = $ionicPopup.alert({
                                title: 'Erreur',
                                template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                            });
                        })
                    },function errorCallback(response){});

                }


            },function errorCallback(response){
                var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Le serveur a renvoyé une erreur, si elle perdure, veuillez contacter un administrateur.'
                });
            });

        },




    }



})
