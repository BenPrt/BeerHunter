angular.module('BeerClient.controllers')

    .controller('SigninCtrl', function($scope, $state, $ionicHistory, SigninService) {

    $scope.data = {};

    $scope.infoMessage = "Veuillez remplir les champs suivants : ";
    $scope.errorMessage = "";

    $scope.goBack = function(){
        $state.go('login');
    }

    $scope.signin = function(data) {
        var reg = /\S+@\S+\.\S+/;

        if(reg.test(data.mail)){
            if(data.pass==data.confirm){
                if(data.userName!=null && data.userName.length>2 && data.userName.length<15 && data.userName.indexOf(' ')==-1){
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
                    $scope.errorMessage="Votre nom d'utilisateur est incorrect";
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