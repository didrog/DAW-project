(function () {
	
    angular.module('app').service('usuariosService', usuariosService);
        
	function usuariosService($q, $http)  {

        var vm = this;

		vm.registrarUsuario = function registrarUsuario(datos){
            console.log(datos);
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                method: 'POST',
                url: 'http://localhost:3000/addUsuario',
                data: datos
            }).then(function successCallback(response) {
                defered.resolve(response);
                console.log(response);
            }, function errorCallback(response) {
                console.log("Error al registrar el usuario: " + response.status);
                defered.reject(response);
            });
            return promise;
        };
        vm.loginUsuario = function loginUsuario(datos){
            console.log(datos);
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                method: 'POST',
                url: 'http://localhost:3000/loginUsuario',
                data: datos
            }).then(function successCallback(response) {
                defered.resolve(response);
            }, function errorCallback(response) {
                console.log("Error al logear el usuario: " + response.status);
                defered.reject(response);
            });
            return promise;
        };
        vm.modificaUsuario = function modificaUsuario(datos){
            console.log(datos);
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                method: 'POST',
                url: 'http://localhost:3000/updateUsuario',
                data: datos
            }).then(function successCallback(response) {
                defered.resolve(response);
            }, function errorCallback(response) {
                console.log("Error al logear el usuario: " + response.status);
                defered.reject(response);
            });
            return promise;
        };
	};
}());
