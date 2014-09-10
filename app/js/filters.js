(function(){
  var app=angular.module('FacebookFilters', []);

  /* 查找双字姓名，在其中间插入全角空格，使其能够与其他姓名对齐 */
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
    };
  });

  /* 返回男生队列 */
  app.filter('maleArray', function(){
    return function(inputArray){
      var array = [];
      for(var i = 0; i<inputArray.length; i++){
        if(inputArray[i].gender === 'Male'){
          array.push(inputArray[i]);
        }
      }
      return array;
    };
  });
})();