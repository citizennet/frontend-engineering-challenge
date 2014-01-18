/* Start Defining the App */
var app = angular.module('CNEC', ['ui.bootstrap','ngUpload','ngRoute','ngResource']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/start', {templateUrl: 'views/start.html',   controller: 'start'}).
	otherwise({redirectTo: '/start'});
}]);

/* Define the Factory which is going to move data from the server to the client and back again */ 
app.factory('info',['$http', function($http) {
	var data = {header:"Lets Get This Started!"};
	var action = {}; 
	action = {
		returnHeader:function(){
			return data.header; 
		},
		getFile:function(){
			var route = '/API/file/'; 
		  	var config = {
				method: 'GET',
				url: route
			    };
			    var promise = $http(config).then(function (response) {
				if (response.status === 200) {
				    return response.data;
				} else {
				    console.log(response.status);
				}
			    });
			    return promise;
		}
	};
    return action;
}]);

/* Define the line graph which will display the filtered post infomation */
app.directive('lineChart', ['$parse','$compile', function ($parse,$compile) {
	return {
		restrict: 'E',
    		replace: false,
    		templateUrl: 'views/template/linechart/linechart.html',
    		scope: {
        		data: '=data'
    		},
    		link: function(scope, element, attrs) {
			

			var lineId =  (new Date()).getTime().toString(16).substr(-8);
			var chart = '<div id="'+lineId+'" style="width:100%;height:500px;"></div>';
			var html = $compile(chart)(scope);
			element.find('#chartcontainer').append(html);

			scope.$parent.$watch($parse(attrs.data), function(data) {
			

				var main=function(data){

					
					var plot =[{label:'Likes',data:[]},{label:'Comments',data:[]}];
					var posts = data;

						for(var i=0;i<posts.length;i++){
							var time = new Date(posts[i].created_time);
							
							var likes = posts[i].likes==undefined ? 0 : posts[i].likes.count;
							var comments = posts[i].comments==undefined ? 0 : posts[i].comments.count;
				
							plot[0].data.push([time,likes]);
							plot[1].data.push([time,comments]);


						}

					console.log(plot)
					return plot; 
				};
				$.plot(element.find("#"+lineId+""), main(data), {
					yaxis : {},
					xaxis : {mode : "time",timeformat : "%a %b/%y",timezone : "browser"},
					zoom : {interactive : true},
					pan : {interactive : true},
					series : {lines : {show : true},points : {show : true}},
					grid : {hoverable : true,clickable : true}
				});

				$("<div id='tooltip'></div>").css( {position : "absolute",display : "none",border : "1px solid #fdd",padding : "2px","background-color" : "#fee",opacity : 0.80}).appendTo("body");

				$("#"+lineId+"").bind("plothover",function(event, pos, item) {
							if (true) {
								if (item) {
									var x = item.datapoint[0].toFixed(2);
									var y = item.datapoint[1].toFixed(0);
									var time = new Date(Number(x)).toLocaleDateString();
									var name = item.series.label=='Comments' && Number(y)==1 ? 'Comment' : item.series.label;
									console.log("Label:"+item.series.label+" Number:"+Number(y));
									$("#tooltip").html("There were "+y+" "+name+" on "+time)
											.css( {
												top : item.pageY + 5,
												left : item.pageX + 5
											}).fadeIn(200);
								} else {
									$("#tooltip").hide();
								}
							}
						});

			
			
			
			});
	}
	};
}]);
