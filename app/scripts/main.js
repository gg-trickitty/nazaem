'use strict';
var angular, $win=$(window),$doc=$(document);

angular.module('nazaem',[
		'hmTouchEvents'
	]);


//controllers
angular.module('nazaem')
.controller('MainCtrl', ['$scope', function ($scope) {
	
}])


//directives
angular.module('nazaem')
.directive('calculator', [function () {
	return {
		restrict: 'A',
		link: function ($scope, el, attrs) {
			
		}
	};
}])
.
directive('height100', [function () {
	return {
		restrict: 'A',
		link: function ($scope, el, attrs) {
			function res(){
				if($win.width()<=768)
				$(el).css({height:$doc.height()});
			}
			res();
			$win.resize(res);
		}
	};
}])