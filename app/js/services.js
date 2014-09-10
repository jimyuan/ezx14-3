(function(){
  var app = angular.module('FacebookServices', []);

  app.factory('Students', ['$resource', '$window', function($resource, $window){
    var url='/json/:service.json';
    if ($window.location.host.indexOf('github.io') !== -1){
      url = '/app' + url;
    }
    return $resource(url, {}, {
      query:{
        params:{service: 'students'}
      }
    });
  }]);
})();