(function (angular) {
	
    angular.module('app').factory('ligasFactory', ligasFactory);
        
	function ligasFactory($q, $http, APP)  {

        
        
		var result  = {};
        //obtenemos las ligas disponibles
        result.getLigas = function (){
            var ligas = [];
            var defered=$q.defer();
            var promise=defered.promise;
            
            $.ajax({
                headers: { 'X-Auth-Token': APP.api.key },
                //url: APP.api.url + 'soccerseasons/?season=2015',
                url: 'datos.json',
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                var j = 0;
                for ( i = 0; i < response.length; i++){
                    //damos formato a los nombres de los menus
                    if (response[i].id != '405'){
                        ligas[j] = response[i];    
                        ligas[j].caption = ligas[j].caption.substring(0, ligas[j].caption.length-8);
                        j++;
                    }
                }
                defered.resolve(ligas);
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log("Carga menu:" + textStatus);
                defered.reject(textStatus);
            }); 
            
            return promise;
        };
        
        //obtenemos la clasificación de una liga pasada por parametro
        result.getClasif = function (id){

            var defered=$q.defer();
            var promise=defered.promise;
            $.ajax({
                headers: { 'X-Auth-Token': APP.api.key },
                //url: APP.api.url +'soccerseasons/'+id+'/leagueTable',
                url: 'liga.json',
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                defered.resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown){
                console.log("Carga clasificacion:" + textStatus);
                defered.reject(textStatus);
            });
            return promise;
        };
        
        //obtenemos información básica de una liga pasada por parametro
        result.getInfoLiga = function (id){

            var defered=$q.defer();
            var promise=defered.promise;
            $.ajax({
                headers: { 'X-Auth-Token': APP.api.key },
                //url: APP.api.url +'soccerseasons/'+id+'/teams',
                url: 'info.json',
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                defered.resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown){
                console.log("Carga info general liga:" + textStatus);
                defered.reject(textStatus);
            });
            return promise;
        };
        
        //obtenemos el calendario de una liga pasada por parametro
        result.getCalLiga = function (id){

            var defered=$q.defer();
            var promise=defered.promise;
            $.ajax({
                headers: { 'X-Auth-Token': APP.api.key },
                //url: APP.api.url + 'soccerseasons/'+id+'/fixtures',
                url: 'calendarioBundes.json',
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                defered.resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown){
                console.log("Carga calendario:" + textStatus);
                defered.reject(textStatus);
            });
            return promise;
        };

        //obtenemos los jugadores de un equipo
        /*result.getJugadores = function (url){

            var defered=$q.defer();
            var promise=defered.promise;
            $.ajax({
                headers: { 'X-Auth-Token': APP.api.key },
                url: url,
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                defered.resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown){
                console.log("Carga jugadores:" + textStatus);
                defered.reject(textStatus);
            });
            return promise;
        };*/
        
        //obtenemos los jugadores de un equipo
        result.getJugadores = function (url){
            console.log(url);
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                headers: { 'X-Auth-Token': APP.api.key },
                method: 'GET',
                url: url,
                dataType: 'json',
            }).then(function successCallback(response) {
                console.log("Codigo http: " + response.status);
                console.log(response);
                defered.resolve(response.data);
            }, function errorCallback(response) {
                console.log("Codigo http: " + response.status);
                defered.reject(response);
            });
            return promise;
        };
            
        return result;
	};

}(angular));