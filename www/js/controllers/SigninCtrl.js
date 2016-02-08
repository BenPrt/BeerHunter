angular.module('BeerClient.controllers')

    .controller('SigninCtrl', function($scope, $state, $ionicHistory, SigninService) {

    $scope.data = {};
    // Initialisation du message de feedback
    $scope.infoMessage = "Veuillez remplir les champs suivants : ";
    $scope.errorMessage = "";

    // Fonction de redirection vers la page d'authentification
    $scope.goBack = function(){
        $state.go('login');
    }


    // Vérification des données puis exécution de l'inscription si tout va bien
    $scope.signin = function(data) {
        var reg = /\S+@\S+\.\S+/;

        if(reg.test(data.mail)){
            if(data.pass==data.confirm){
                if(data.userName!=null){
                    if(data.userName.length>1){
                        if(data.userName.length<15){
                            if(data.userName.indexOf(' ')==-1){
                                $scope.errorMessage="";
                                $scope.infoMessage="Inscription en cours ...";
                                SigninService.signin(data.userName, data.mail, data.pass).then(function(response){
                                    if(response=="OK"){
                                        $state.go('login');
                                    } else{
                                        if(response=="username"){
                                            $scope.infoMessage="";
                                            $scope.errorMessage="Désolé, ce nom d'utilisateur existe déjà !";
                                        }else if(response=="email"){
                                            $scope.infoMessage="";
                                            $scope.errorMessage="Un compte existe déjà à cette adresse !";
                                        }
                                    }
                                });
                            }else{
                                $scope.infoMessage="";
                                $scope.errorMessage="Nom d'utilisateur incorrect !";
                            }
                        }else{
                            $scope.infoMessage="";
                            $scope.errorMessage="Nom d'utilisateur trop long !";
                        } 
                    }else{
                        $scope.infoMessage="";
                        $scope.errorMessage="Nom d'utilisateur trop court !";
                    }
                }else{
                    $scope.infoMessage="";
                    $scope.errorMessage="Indiquez un nom d'utilisateur !";
                }
            }else{
                $scope.infoMessage="";
                $scope.errorMessage="Votre mot de passe doit être confirmé !";
            }
        }else{
            $scope.infoMessage="";
            $scope.errorMessage="Veuillez entrer une adresse e-mail valide";
        }
    }

});