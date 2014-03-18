'use strict';
var angular, $win=$(window),$doc=$(document);

angular.module('nazaem',[
		'hmTouchEvents'
	]);


//controllers
angular.module('nazaem')
.controller('MainCtrl', ['$scope', function ($scope) {
	
}])
.controller('Apply', ['$scope', '$http', function ($scope,$http) {
	if(localStorage.amount){
		$scope.amount = localStorage.amount;
		$scope.interest = localStorage.interest;
		$scope.days = localStorage.days;
		$scope.total = Number(localStorage.amount)+Number(localStorage.interest)+4;

		$scope.returnDate = new Date();
		$scope.returnDate.setTime($scope.returnDate.getTime()+$scope.days*86400000);
	}

	$scope.clear = function(){
		delete localStorage.amount;
		delete localStorage.interest;
		delete localStorage.days;
		$scope.amount=null;
	}
}])


//directives
angular.module('nazaem')
.directive('calculator', [function () {
	return {
		restrict: 'A',
		link: function ($scope, el, attrs) {
			$scope.amount = 300;
			$scope.days = 25;
			var max = {amount:399, days:30},
				min = {amount:50, days:5},
				interestRate = 0.012; //per day

			var width = 210,
				startp = 0;

			$scope.dragstart = function(e,which){
				width = $(e.target.parentNode.parentNode).width();
				startp = $scope[which];
			}
			$scope.drag = function(e,which){
				// console.log(Math.floor((startp + e.gesture.distance/width)*(max.amount/10)));
				var distance = e.gesture.distance,
					treshold = 10;
				if(which=='days')treshold=1;
				if(e.gesture.direction=="left")distance=-distance;
				$scope.add[which](Math.floor((distance/width)*(max[which]/treshold))*treshold,startp)
			}
			$scope.dragend = function(){
				console.log('end');
			}

			$scope.add = {
				amount:function(add,start){
					if(!start)var start=$scope.amount;
					var am = start+Number(add);
					if(am>max.amount)am=max.amount;
					else if(am<min.amount)am=min.amount;
					$scope.amount = am;
					calcInterest();
				},
				days:function(add,start){
					if(!start)var start=$scope.days;
					var am = start+Number(add);
					if(am>max.days)am=max.days;
					else if(am<min.days)am=min.days;
					$scope.days = am;
					calcInterest();
				}
			}
			function calcInterest () {
				$scope.interest = $scope.days*$scope.amount*interestRate;
			}
			calcInterest();

			$scope.fillDays = function(){
				return {width:($scope.days/max.days)*100+'%'};
			}
			$scope.fillAmount = function(){
				return {width:($scope.amount/max.amount)*100+'%'}
			}

			$scope.apply = function(){
				$scope.applying=true;
				//save data to localStorage
				localStorage.amount = $scope.amount;
				localStorage.days = $scope.days;
				localStorage.interest = $scope.interest;
				window.location.href="/form.html";
			}

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
				else 
					$(el).css({height:'auto'});
			}
			res();
			$win.resize(res);
		}
	};
}])
.
directive('navheader', [function () {
	return {
		restrict: 'E',
		replace:true,
		templateUrl:'partials/header.html',
		link: function ($scope, el, attrs) {
			
		}
	};
}])

.
filter('date',[function(){
	return function(d){
		d= new Date(d);
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var month = ['януари','февруари','март','април','май', 'юни', 'юли','август','септември','октомври','ноември','декември'];
		return d.getDate()+" "+month[d.getMonth()]+' '+d.getFullYear();
	}
}])

//jQuery UI tab menu functionality
$(function() {
    $( "#nz-tabs" ).tabs();
});
