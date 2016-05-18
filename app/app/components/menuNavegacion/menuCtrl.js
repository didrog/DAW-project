(function () {
	angular.module('menuNavegacion').controller('MenuCtrl', menuCtrl);
    
	function menuCtrl($state, ligasFactory) {
        
        var vm = this;
              
		ligasFactory.getLigas().then(function(datos){
            vm.lista = datos;
            console.log(vm.lista);
        },
        function(status){
            console.log("Error de acceso a datos:" + status);
        });
        
		vm.isActive = function (estado) {
			return $state.is(estado);
		}
	}

}());
