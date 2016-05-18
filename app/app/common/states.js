(function(angular){
    angular.module('app').config(function ($stateProvider) {
        $stateProvider
            .state('principal', {
                url: '/',
                controller: 'LigaCtrl as liga',
                templateUrl: './app/states/principal.html'
            }).state('infoLiga', {
                url: '/infoLiga/{index:int}',
                controller: 'LigaCtrl as liga',
                params: { opc: 0, name:name },
                templateUrl: './app/states/infoLiga.html'
            }).state('clasificacion', {
                url: '/clasificacion/{index:int}',
                controller: 'LigaCtrl as liga',
                params: { opc: 1 },
                templateUrl: './app/states/clasificacionLiga.html'
            }).state('resultados', {
                url: '/resultados/{index:int}',
                controller: 'LigaCtrl as liga',
                params: { opc: 2 },
                templateUrl: './app/states/resultados.html'
            }).state('equipo', {
                url: '/equipo/',
                params: {url: '{url}'},
                controller: 'EquipoCtrl as equipo',
                templateUrl: './app/states/equipo.html'
            }).state('priv', {
                url: '/priv',
                controller: 'PrivadoCtrl as priv',
                templateUrl: './app/states/pagpersonal.html'
            }).state('not-found', {
                url: '*path',
                templateUrl: './app/states/not-found.html'
            });
    });
}(angular));