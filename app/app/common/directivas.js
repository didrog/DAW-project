(function () {

	//cambios en las rutas relativas de las plantillas

	angular.module('directivas', [])
        .value("seleccionadoLink",seleccionadoLink )
		.directive('abSeleccionado', seleccionado)
		.directive('input', seleccionado);

    function seleccionadoLink(scope, element, attrs) {
        element.bind('mouseenter', function () {
            element.css('background-color', 'yellow');
        });
        element.bind('mouseleave', function () {
            element.css('background-color', 'white');
        });
    }
	function seleccionado(seleccionadoLink) {
		return {
			link: seleccionadoLink 
		};
	}


}());