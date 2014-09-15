(function(){
  var app = angular.module('FacebookServices', []);

  app.factory('Students', ['$resource', '$window', function($resource, $window){
    var url='/json/:service.json';
    if ($window.location.host.indexOf('github.io') !== -1){
      url = '/ezx14-3/app' + url;
    }
    return $resource(url, {}, {
      query:{
        params:{service: 'students'}
      }
    });
  }]);

  app.factory('Common', ['$window', function($window){
    return {
      is_landscape: function(){ //横屏检测
        return ( $window.orientation == 90 || $window.orientation == -90 );
      },

      is_portrait: function(){
        return ( $window.orientation == 0 || $window.orientation == 180 );
      }

    }
  }]);
})();