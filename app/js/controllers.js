(function(){
  var app=angular.module('FackbookControllers',[]);

  //globel controller
  app.controller('GlobCtrl', ['$scope', '$window', 'snapRemote', function($scope, $window, snapRemote){
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
    };
  }]);

  app.controller('ListCtrl', ['$scope', 'Students', '$filter', function($scope, Students, $filter){
    $scope.viewToggle = true;
    $scope.curFilter  = 'fullName';

    Students.query(function(data){
      $scope.students = $filter('formatName')(data.students);
      $scope.male = $filter('maleArray')(data.students);

      $scope.putit = function($event){
        angular.element($event.srcElement).toggleClass('btn-outlined');
      };
    });
  }]);

  app.controller('SchedCtrl', ['$scope', '$filter', '$interval', function($scope, $filter, $interval){
    var curColumn = document.querySelectorAll('.table-schedule td:nth-child('+ (new Date().getDay()+1) +')');
    angular.element(curColumn).addClass('cur-day');
    $scope.clock = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    $interval(function(){
      $scope.clock = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    }, 1000);
  }]);
})();