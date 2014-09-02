(function(){
  var app=angular.module('facebook', [
    'snap',
    'ngResource',
    'ngRoute',
    'LocalStorageModule',
    'FackbookControllers'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/index', {
      templateUrl: "views/index.html"
    })
    .otherwise({redirectTo: '/index'});
  }]);

})();