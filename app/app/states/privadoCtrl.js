(function (angular) {
	angular.module('app').controller('PrivadoCtrl', privadoCtrl);

	function privadoCtrl($q, $cookies, ligasFactory) {
		var vm = this;
        
        vm.usuario = $cookies.get("nombre");
        vm.idFavorito = $cookies.get("idFavorito");
        
        if (vm.idFavorito != undefined){
            var url = 'http://api.football-data.org/v1/teams/'+vm.idFavorito;
            ligasFactory.getJugadores(url+'/players').then(function(response){
                    vm.jugadores = response;
            },function(status){
                    console.log("Error de acceso a datos:" + status);
            });
            
            //piratada para no hacer otra consulta, se reutiliza la de jugadores
            //niños, no lo hacer en casa
            ligasFactory.getJugadores(url).then(function(response){
                vm.equipo = response;
                console.log(response);
            },function(status){
                    console.log("Error de acceso a datos:" + status);
            });
        }
	}

}(angular));
