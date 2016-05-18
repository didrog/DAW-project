(function (angular) {
angular.module('cabecera', [])
		.directive('cabecera', calendario);
		
	function calendario() {
		return {
			templateUrl: './app/components/cabecera/tpl-cabecera.html',
			controller: "CabeceraCtrl as cab"
		};
	}
		
}(angular));	