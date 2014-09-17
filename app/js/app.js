(function(){
  'use strict';
  /*
    fix minimal-ui landscape gray block bug.
  */
  angular.element(window).on('resize', function(){
    this.scrollTo(0, 0);
  });

  var app=angular.module('facebook', [
    'snap',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'LocalStorageModule',
    'FackbookControllers',
    'FacebookServices',
    'FacebookFilters',
    'FacebookDirectives',
    'FacebookTemplate'
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
    .when('/test', {
      templateUrl: "views/test.html",
      controller : "TestCtrl"
    })
    .otherwise({redirectTo: '/list'});
  }]);

})();