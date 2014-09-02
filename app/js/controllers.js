(function(){
  var app=angular.module('FackbookControllers',[]);

  //globel controller
  app.controller('globController', ['$scope', 'snapRemote', function($scope, snapRemote){
    $scope.title='闸北区二中心一(3)班';
    $scope.snapOpts={
      maxPosition: 160,
      minPosition: -160,
      touchToDrag: false,
      disable:'left'
    };

    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        console.log('Opened!');
      });

      snapper.on('close', function() {
        console.log('Closed!');
      });
    });
  }]);
  /*app.controller('DemoController', ['$scope', 'localStorageService', function($scope, localStorageService){
    $scope.demo="Hello World!";
    localStorageService.set('demo', $scope.demo);
  }]);*/
})();