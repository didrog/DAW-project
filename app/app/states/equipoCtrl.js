(function (angular) {
	angular.module('app').controller('EquipoCtrl', equipoCtrl);

	function equipoCtrl($rootScope,$state ,$stateParams, ligasFactory) {
		var vm = this;

        var params = JSON.parse(JSON.stringify($stateParams));

        if (params.url == '' || params.url == undefined ){
            $state.go('principal');
        }else{
            ligasFactory.getJugadores(params.url).then(function(datos){
                    vm.jugadores = datos;
                    //console.log(JSON.stringify(datos));
            },function(status){
                    console.log("Error de acceso a datos:" + status);
            });
        }
	}

}(angular));
