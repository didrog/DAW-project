(function (angular) {
	angular.module('cabecera').controller('CabeceraCtrl', cabeceraCtrl);
    
	function cabeceraCtrl($rootScope, $uibModal, $rootScope, $state, $scope, $window, ligasFactory, $cookies, usuariosService, APP) {
        
		var vm = this;
        
        vm.itemSelect;
        vm.loginError = "hidden";
        vm.usuarioLogout = "";
        vm.usuarioLogin = "hidden";
        vm.equipos = [];
        vm.formulario = {
            "nombre": "",
            "mail": "",
            "pwd": "",
            "idFavorito": 0
        };

        if ($cookies.get('token')){
            vm.usuarioLogout = "hidden";
            vm.usuarioLogin = "";
        }else{
            vm.usuarioLogout = "";
            vm.usuarioLogin = "hidden";
        }
        //functions para abrir las modales
        //modal registro
        vm.openModReg = function openModReg(){
            //recuperamos las ligas del factory para mostrarlas en el select
            ligasFactory.getLigas().then(function(datos){
                vm.ligas = datos;
            },
            function(status){
                console.log("Error de acceso a datos:" + status);
            });
            vm.visible="";
            vm.opcion="Registro"; 
            vm.alta="";
            vm.login="hidden";
            abreModal();
        };
        //modal login
        vm.openModLog = function openModLog(){
            vm.visible="hidden";
            vm.opcion="Acceso";
            vm.alta="hidden";
            vm.login="";
            abreModal();
        };
        vm.openModModif = function openModModif(){
            //recuperamos las ligas del factory para mostrarlas en el select
            ligasFactory.getLigas().then(function(datos){
                vm.ligas = datos;
            },
            function(status){
                console.log("Error de acceso a datos:" + status);
            });
            abreModalModif();
        };
        //consultamos equipos para mostrar en el segundo combo
        vm.consultaEquipos = function consultaEquipos(){
            ligasFactory.getInfoLiga(vm.itemSelect).then(function(datos){
                console.log(datos);
                vm.equipos = datos;
            },
            function(status){
                console.log("Error de acceso a datos:" + status);
            });
        };
        //alta de usuario
        vm.altaUsuario = function altaUsuario(){
            //encriptamos la pwd antes de enviarla
            vm.formulario.pwd = Base64.encode(vm.formulario.pwd);
            usuariosService.registrarUsuario(vm.formulario).then(function(response){
                console.log(response);
                //GUARDAMOS EL TOKEN
                if (response.type == false) {
                    alert(response.data)    
                } else {
                    $cookies.put('token', response.data.token, {expires: new Date().addMinutes(30)});
                    $cookies.put('nombre', response.data.data.nombre, {expires: new Date().addMinutes(30)});
                    $cookies.put('idFavorito', response.data.data.idFavorito, {expires: new Date().addMinutes(30)});
                    $cookies.put('mail', response.data.data.mail, {expires: new Date().addMinutes(30)});
                    vm.usuarioLogout = "hidden";
                    vm.usuarioLogin = "";
                    vm.cierraModal(); //cerramos la modal
                    $state.go('priv');
                    abreModalInfo();
                }
                /////////////////////
            },
            function(status){
                vm.loginError="";
                vm.mensajeError = "Usuario ya existe";
                $rootScope.error = 'Fallo al dar de alta';
                console.log("[cabeceraCtrl]Error de acceso a datos:" + status);
                resetDatos();
            });
        };
        vm.accesoLogin = function accesoLogin(){
            vm.formulario.pwd = Base64.encode(vm.formulario.pwd);
            usuariosService.loginUsuario(vm.formulario).then(function(response){
                console.log(response);
                //GUARDAMOS EL TOKEN
                if (response.type == false) {
                    alert(response.data)    
                } else {
                    $cookies.put('token', response.data.token, {expires: new Date().addMinutes(30)});
                    $cookies.put('nombre', response.data.data.nombre, {expires: new Date().addMinutes(30)});
                    $cookies.put('idFavorito', response.data.data.idFavorito, {expires: new Date().addMinutes(30)});
                    $cookies.put('mail', response.data.data.mail, {expires: new Date().addMinutes(30)});
                    vm.usuarioLogout = "hidden";
                    vm.usuarioLogin = "";
                    vm.cierraModal(); //cerramos la modal
                    $state.go('priv');
                    abreModalInfo();
                }
            },
            function(status){
                vm.loginError="";
                vm.mensajeError = "Usuario o contraseña incorrectos";
                $rootScope.error = vm.mensajeError;
                console.log("[cabeceraCtrl]Error en el proceso de login:" + status);
                resetDatos();
            });
        };
        vm.modificarUsuario = function modificarUsuario(){
            console.log(vm.formulario);
            var formulario = vm.formulario;
            formulario.mail = $cookies.get("mail");
            formulario.token = $cookies.get("token");
            if(vm.formulario.nombre !== undefined){
                formulario.nombre = vm.formulario.nombre;
            }
            if(vm.formulario.idFavorito !== undefined){
                formulario.idFavorito = vm.formulario.idFavorito;
            }
            if(vm.formulario.pwd !== undefined){
                formulario.pwd = Base64.encode(vm.formulario.pwd);
            }
            usuariosService.modificaUsuario(formulario).then(function(response){
                console.log(response);
                if (response.type == false) {
                    alert(response.data)    
                } else {
                    $cookies.put('token', response.data.token, {expires: new Date().addMinutes(30)});
                    $cookies.put('nombre', response.data.data.nombre, {expires: new Date().addMinutes(30)});
                    $cookies.put('idFavorito', response.data.data.idFavorito, {expires: new Date().addMinutes(30)});
                    $cookies.put('mail', response.data.data.mail, {expires: new Date().addMinutes(30)});
                    vm.usuarioLogout = "hidden";
                    vm.usuarioLogin = "";
                    vm.cierraModal(); //cerramos la modal
                    resetDatos();
                    //si estamos en priv recargamos con los nuevos valores
                    if ($state.$current=='priv'){
                        $state.go($state.current, {}, {reload: true}); 
                    }else{//si no estamos en priv, vamos a priv ver los cambios
                        $state.go('priv');
                    }
                    abreModalInfo();
                }
            },
            function(status){
                console.log("[cabeceraCtrl]Error al modificar usuario:" + status);
                resetDatos();
            });
        };
        vm.logoff = function logoff(){
            //borramos cookies
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
            vm.usuarioLogout = "";
            vm.usuarioLogin = "hidden";
            $state.go('principal');  
        };
        vm.pagPrincipal = function logoff(){
            $state.go('priv');  
        }
        //funcion para abrir la modal de login y registro
        var abreModal = function abreModal(){
            vm.loginError="hidden";
            var modalInstance = $uibModal.open({
                templateUrl: './app/modals/modal-acceso.html'
            });

            //función para cerrar la modal
            vm.cierraModal = function cierraModal(){
                modalInstance.close();
            }
            
            modalInstance.result.then(function () {
                resetDatos();
            }, function () {
                resetDatos();
                console.log('Modal cerrada: ' + new Date());
            });
        };
        //funcion para abrir la modal de modificación de datos
        var abreModalModif = function abreModalModif(){
            var modalInstance = $uibModal.open({
                templateUrl: './app/modals/modal-modif.html'
            });

            //función para cerrar la modal
            vm.cierraModal = function cierraModal(){
                modalInstance.close();
            }
            
            modalInstance.result.then(function () {}, 
            function () { //error
                resetDatos();
                console.log('Modal cerrada: ' + new Date());
            });
        };
        //modal de todo OK
        var abreModalInfo = function abreModalInfo(){
            var modalInstance = $uibModal.open({
                templateUrl: './app/modals/modal-info.html'
            });

            //función para cerrar la modal
            vm.cierraModal = function cierraModal(){
                modalInstance.close();
            }
            
            modalInstance.result.then(function () {}, 
            function () { 
            });
            
        };
        var resetDatos = function resetDatos(){
            vm.formulario = {};
        };
        //modificamos Date para sumarle horas
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        //modificamos Date para sumarle minutos
        Date.prototype.addMinutes= function(m){
            this.setMinutes(this.getMinutes()+m);
            return this;
        }
        //funciones de encoding
        var Base64 = {

            // private property
            _keyStr : APP.encoding,

            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },
            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            }
        };
	}



}(angular));