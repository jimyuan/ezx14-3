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

  /* 花名册 */
  app.controller('ListCtrl', ['$scope', '$filter', '$window', 'Common', 'Students', function($scope, $filter, $window, Common, Students){
    angular.extend($scope, {
      viewToggle: true,
      curFilter: 'seatPos',
      showCount: false,
      viewAll:  function(){
        this.viewToggle=true; 
        this.curFilter='seatPos';
      },
      viewByGender: function(){
        this.viewToggle=false; 
        this.curFilter=['-gender', 'fullName'];
      }
    });

    var whenLand = function(bool){
      var studentView = angular.element(document.getElementById('studentsList'));
      bool ? studentView.addClass('land-view') : studentView.removeClass('land-view');
    }


    if($window.orientation){
      whenLand(Common.is_landscape());
      $window.addEventListener('orientationchange', function(){
          whenLand(Common.is_landscape());
      }, false);
    }
    else{
      whenLand(screen.width > screen.height);
      $window.addEventListener('resize', function(){
        whenLand(screen.width > screen.height);
      }, false);
    }

    Students.query(function(data){

      $scope.students = $filter('formatName', 'orderBy')(data.students);
      $scope.male = $filter('filter')(data.students, function(student){
        return student.gender === 'Male';
      });
      $scope.showCount= true;
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