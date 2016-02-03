angular.module('BeerClient.services')

    .service('LevelService', function($q, $http, $state, $rootScope, $ionicPopup) {

    return {
        getLevel: function(score) {
            var level=0;
            if(score>0){
                if(score<20)level=1; 
                if(score>19 && score<40)level=2
                if(score>39 && score<80)level=3
                if(score>79 && score<160)level=4
                if(score>159 && score<320)level=5
                if(score>319 && score<640)level=6
                if(score>639 && score<950)level=7
                if(score>949 && score<1280)level=8
                if(score>1279 && score<1600)level=8
                if(score>1599)level=10
            }
            return level;
        }
    }
})