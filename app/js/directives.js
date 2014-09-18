(function(){
  'use strict';

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
      template : '<div class="btn btn-outlined animated bounceIn" ng-class="{\'btn-primary\':ifMale, \'btn-negative\':ifFemale, \'seat-hide\':ifNone}">'
                +'  <span ng-transclude></span>'
                +'</div>',
      link : function(scope, ele, attr){
        if(scope.gender === 'Male'){
          scope.ifMale = true;
          scope.ifFemale = false;
          scope.ifNone = false;
        }
        else if(scope.gender === 'Female'){
          scope.ifMale = false;
          scope.ifFemale = true;
          scope.ifNone = false;
        }
        else if(scope.gender === 'unknown'){
          scope.ifMale = false;
          scope.ifFemale = false;
          scope.ifNone = true;
        }
        ele.on('click', function(){
          ele.toggleClass('btn-outlined');
        });
      }
    };
  });

})();