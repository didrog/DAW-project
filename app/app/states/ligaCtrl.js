(function (angular) {
	angular.module('app').controller('LigaCtrl', ligaCtrl);

	function ligaCtrl($rootScope, $stateParams, ligasFactory) {
		var vm = this;

        var params = JSON.parse(JSON.stringify($stateParams));

        //el id de la liga, lo guardamos para pasar entre pestañas
        vm.id = params.index;

        //guardamos el nombre de la liga para mostrarlo en las 3 pestañas
        //se guarda en el objeto para mostrar y en el...
        //scope para que este disponible en todas las pestañas
        if (params.name != '' && params.name != undefined){
            $rootScope.nombreLiga = params.name;
            vm.nombreLiga = $rootScope.nombreLiga;
        }else{
            vm.nombreLiga = $rootScope.nombreLiga;
        }
        
        
        if (params.opc === 0 ){
            //si opc es 0 es que estamos en la informacion general
            ligasFactory.getInfoLiga(params.index).then(function(datos){
                vm.info = datos;
                //console.log(JSON.stringify(datos));
            },
            function(status){
                console.log("Error de acceso a datos:" + status);
            });
        }else if (params.opc === 1 ){
            //si opc es 1 es que queremos ver la clasificacion
            ligasFactory.getClasif(params.index).then(function(datos){
                vm.liga = datos;
            },
            function(status){
                console.log("Error de acceso a datos:" + status);
            });
        }        
	}

}(angular));
