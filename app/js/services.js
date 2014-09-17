(function(){
  'use strict';
  
  var app = angular.module('FacebookServices', []);

  app.factory('Students', ['$resource', '$window', 'Common', function($resource, $window, Common){
    var url = '/json/:service.json';
    var evn = Common.runtimeEvn();
    if(evn === 1) {
      url = '/dist' + url;
    }
    if(evn === 2) {
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
      },
      runtimeEvn: function(){
        //0开发 1测试 2生产 3其他
        var host = $window.location.host,
            path = $window.location.pathname,
            local= /^(localhost|10\.10|127\.0|192\.168)/i;

        if(local.test(host) && /^\/d.html/.test(path)) {
          return 0;
        }
        else if(local.test(host) && (/^\//.test(path) || /^\/index.html/.test(path))){
          return 1;
        }
        else if(/github.io$/.test(host)){
          return 2;
        }
        else {
          return 3;
        }
      }

    };
  }]);
})();