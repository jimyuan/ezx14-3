(function(){
  var app = angular.module('FacebookServices', []);

  app.factory('Students', ['$resource', '$window', function($resource, $window){
    var url='/json/:service.json';
    if ($window.location.host.indexOf('github.io') !== -1){
      url = '/ezx14-3/app/dist' + url;
    }
    return $resource(url, {}, {
      query:{
        params:{service: 'students'}
      }
    });
  }]);

  app.factory('Common', ['$window', function($window){
    var ua = navigator.userAgent.toLowerCase();
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
        return (/micromessenger/.test(ua)) ? true : false ;
      },
      is_iphone: function(){
        return (/iphone/.test(ua)) ? true : false ;
      },
      is_android: function(){
        return (/android/.test(ua)) ? true : false ;
      },
      show_mask: function(content){
        var root = angular.element(document.querySelector('body')),
            text = content || '';
        root.append('<div class="web-mask">'+text+'</div>');
      }
    };
  }]);
})();