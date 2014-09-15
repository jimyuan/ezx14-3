(function(){
  var app = angular.module('FacebookDirectives', []);

  app.directive('seat', function(){
    return {
      restrict : 'EA',
      replace : true,
      transclude : true,
      scope : {
        seat: '=',
        gender: '='
      },
      template : '<div class="btn btn-outlined animated bounceIn" ng-class="{\'btn-primary\':ifMale, \'btn-negative\':!ifMale}">'
                +'  <span ng-transclude></span>'
                +'</div>',
      link : function(scope, ele, attr){
        (scope.gender === 'Male') ? scope.ifMale = true : scope.ifMale = false;
        ele.on('click', function(){
          ele.toggleClass('btn-outlined');
        })
      }
    }
  });
})();