(function(){
  var app=angular.module('FackbookControllers',[]);

  //globel controller
  app.controller('GlobCtrl', ['$scope', '$window', 'snapRemote', 'Common', function($scope, $window, snapRemote, Common){
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

    // Common.show_wxmask();
  }]);

  /* 花名册 */
  app.controller('ListCtrl', ['$scope', '$filter', 'Common', 'Students', function($scope, $filter, Common, Students){
    angular.extend($scope, {
      showCount: false
    });

    Students.query(function(data){
      var students = $filter('formatName')(data.students);
      angular.extend($scope, {
        students: $filter('orderBy')(students, 'seatNo'),
        male: $filter('filter')(students, function(student){
          return student.gender === 'Male';
        }),
        female: $filter('filter')(students, function(student){
          return student.gender === 'Female';
        }),
        showCount: true
      });
    });
  }]);

  /* 课程表 */
  app.controller('SchedCtrl', ['$scope', '$filter', '$interval', function($scope, $filter, $interval){
    var curColumn = document.querySelectorAll('.table-schedule td:nth-child('+ (new Date().getDay()+1) +')');
    angular.element(curColumn).addClass('cur-day');
    $scope.clock = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    $interval(function(){
      $scope.clock = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    }, 1000);
  }]);

  /* directive test */
  app.controller('TestCtrl', ['$scope', 'Students', '$filter', function($scope, Students, $filter){

    Students.query(function(data){
      $scope.students = $filter('formatName')(data.students);      
    });
  }]);
})();