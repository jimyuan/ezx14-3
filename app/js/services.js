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
        if($window.orientation) {
          return ( $window.orientation === 90 || $window.orientation === -90 );
        }
        else{
          return (screen.width > screen.height);
        }
      },
      orient_event: function(fn){
        var evt = $window.orientation ? 'orientationchange' : 'resize';
        $window.addEventListener(evt, fn, false);
      },
      is_weixin: function(){
        var ua = navigator.userAgent.toLowerCase();
        return (/micromessenger/.test(ua)) ? true : false ;
      },
      show_wxmask: function(){
        if(!this.is_weixin()){
          var root = angular.element(document.querySelector('body'));
          root.append('<div id="wx-mask"></div>');
        }
      }
    };
  }]);
})();