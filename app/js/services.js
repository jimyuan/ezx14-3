(function(){
  var app = angular.module('FacebookServices', []);

  app.factory('Students', ['$resource', function($resource){
    var url='/json/:service.json';
    return $resource(url, {}, {
      query:{
        params:{service: 'students'}
      }
    });
  }]);
})();