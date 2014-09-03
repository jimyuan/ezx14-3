(function(){
  var app=angular.module('facebook', [
    'snap',
    'ngResource',
    'ngRoute',
    'LocalStorageModule',
    'FackbookControllers',
    'FacebookServices',
    'FacebookFilters'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/index', {
      templateUrl: "views/index.html",
      controller : "indexController"
    })
    .when('/gallery', {
      templateUrl: "views/gallery.html"
    })
    .when('/schedule', {
      templateUrl: "views/schedule.html"
    })
    .when('/notice', {
      templateUrl: "views/notice.html"
    })
    .otherwise({redirectTo: '/index'});
  }]);

})();