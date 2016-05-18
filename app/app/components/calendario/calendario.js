(function (angular) {
angular.module('calendario', [])
		.directive('calendario', calendario);
		
	function calendario() {
		return {
			templateUrl: './app/components/calendario/tpl-calendario.html',
			controller: "CalendarioCtrl as cal"
		};
	}
		
}(angular));	