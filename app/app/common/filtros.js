(function () {

	angular.module('filtros', [])
        .filter('calcularEdad', calcularEdad)
		.filter('formatearFecha', formatearFecha)
        .filter('obtenerId', obtenerId);
    
    //Devuelve la edad a partir de su fecha de nacimiento
    function calcularEdad(){
        var funcionFiltro = function (nacimiento){
            if(nacimiento){
                var nac = nacimiento.split("-");
                var formateado = new Date(nac[0], nac[1] - 1, nac[2]);
                var dif = new Date(Date.now() - formateado);
                return Math.abs(dif.getUTCFullYear() - 1970);
            }
        };
        return funcionFiltro;
    };
    //Damos formato dd-mm-aaaa
    function formatearFecha(){
        var funcionFiltro = function (fecha){
            if(fecha){
                var aux = fecha.split("-");
                return aux[2]+'-'+aux[1]+'-'+aux[0];
            }
        };
        return funcionFiltro;
    };
    //A partir del link al equipo, obtenemos solo el id para guardar en bbdd
    function obtenerId(){
        var funcionFiltro = function (url){
            if(url){
                var aux = url.href.split("/");
                return aux[aux.length-1];
            }
        };
        return funcionFiltro;
    };
}());