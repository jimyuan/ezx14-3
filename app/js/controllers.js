app.controller('DemoController', ['$scope', 'localStorageService', function($scope, localStorageService){
  $scope.demo="Hello World!";
  localStorageService.set('demo', $scope.demo);
}]);