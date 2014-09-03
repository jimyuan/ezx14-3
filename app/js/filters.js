(function(){
  var app=angular.module('FacebookFilters', []);
  app.filter('formatName', function(){
    return function(inputArray){
      var array = [], fullName;
      for(var i = 0; i<inputArray.length; i++){
        fullName=inputArray[i].fullName.split('');
        if(fullName.length===2){
          fullName.splice(1,0,"　");
          inputArray[i].fullName=fullName.join('');
        }
        array.push(inputArray[i]);
      }
      return array;
    }
  });
})();