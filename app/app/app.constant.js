(function (angular) {
    
    var APP = {
        api: {
            url: 'http://api.football-data.org/v1/',
            key: 'b4608a3dce3c452ab02233b80525497a'
        },
        encoding: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
    
    angular.module('app').constant('APP', APP);

})(angular);
