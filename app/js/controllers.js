(function(){
  var app=angular.module('FackbookControllers',[]);

  //globel controller
  app.controller('globController', ['$scope', '$window', 'snapRemote', function($scope, $window, snapRemote){
    $scope.title='闸北区二中心一(3)班';
    $scope.snapOpts={
      maxPosition: 160,
      minPosition: -160,
      touchToDrag: false,
      disable:'left'
    };

    // snap menu setting
    var drawer=angular.element(document.querySelector('#drawerContent'));
    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        drawer.css('display', 'block');
      });

      snapper.on('close', function() {
        // drawer.css('display', 'none');
      });
    });

    $scope.goSection=function(hash){
      $window.location.hash=hash;
      snapRemote.toggle('right');
    }
  }]);

  app.controller('indexController', ['$scope', 'Students', '$filter', function($scope, Students, $filter){
    $scope.viewToggle = true;
    $scope.curFilter  = 'userId';

    Students.query().$promise.then(function(data){
      $scope.students = $filter('formatName')(data.students);
    });
  }]);
})();