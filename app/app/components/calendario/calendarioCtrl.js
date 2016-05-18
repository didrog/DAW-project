(function (angular) {
	angular.module('calendario').controller('CalendarioCtrl', calendarioCtrl);
    
	function calendarioCtrl($rootScope, $stateParams, ligasFactory) {
        
		var vm = this;

        var params = JSON.parse(JSON.stringify($stateParams));
        
        vm.nombreLiga = $rootScope.nombreLiga;
        
		ligasFactory.getCalLiga(params.index).then(function(datos){
            //se pasan los partidos a la funcion
            vm.calendario = agruparPorJornada(datos.fixtures);
            console.log(vm.calendario);
        },
        function(status){
            console.log("Error de acceso a datos:" + status);
        });
        

        //funcion para ordenar todos los partidos por jornadas
        var agruparPorJornada = function agruparPorJornada(datos){
            var calendario = [];
            var partidosEnJornada = datos.length / datos[datos.length-1].matchday;
            var j = 0;
            while (datos.length >0){
                var jornadas = [];
                for (i = 0; i < partidosEnJornada; i++){
                    jornadas[i] = datos.shift();
                    if (i == (partidosEnJornada-1)){
                        calendario[j] = jornadas;
                        j ++;
                    }
                }
            }
            return calendario;
        }
	}
    


}(angular));
