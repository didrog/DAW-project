(function (angular) {
angular.module('menuNavegacion', [])
		.directive('menuNavegacion', menuNavegacion);
		
	function menuNavegacion() {
		return {
			templateUrl: './app/components/menuNavegacion/tpl-menu-navegacion.html',
			controller: "MenuCtrl as menu"
		};
	}
		
}(angular));	