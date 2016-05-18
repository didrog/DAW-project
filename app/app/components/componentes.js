(function (angular) {
	//cambios en las rutas relativas de las vistas

	angular.module('componentes', [])
		.directive('piePagina', piePagina)
		.directive('contenido', contenido);

	function piePagina() {
		return {
			template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por Elías Nieto</p></footer>'
		};
	};

	function contenido() {
		return {
			template: '<section><div class="container text-center" style="padding-top:30px;" ui-view></div></section>'
		};
	};

}(angular));