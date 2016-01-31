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
                $scope.errorMessage="";
                $scope.infoMessage="Inscription en cours ...";
                SigninService.signin(data.userName, data.mail, data.pass).then(function(response){
                    $state.go('login');
                });
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