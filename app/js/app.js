(function(){
  var app=angular.module('facebook', [
    'snap',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'LocalStorageModule',
    'FackbookControllers',
    'FacebookServices',
    'FacebookFilters'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/list', {
      templateUrl: "views/list.html",
      controller : "ListCtrl"
    })
    .when('/gallery', {
      templateUrl: "views/gallery.html"
    })
    .when('/schedule', {
      templateUrl: "views/schedule.html",
      controller : "SchedCtrl"
    })
    .when('/notice', {
      templateUrl: "views/notice.html"
    })
    .otherwise({redirectTo: '/list'});
  }]);

})();