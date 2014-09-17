(function(module) {
try {
  module = angular.module('FacebookTemplate');
} catch (e) {
  module = angular.module('FacebookTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/gallery.html',
    'gallery');
}]);
})();
;(function(module) {
try {
  module = angular.module('FacebookTemplate');
} catch (e) {
  module = angular.module('FacebookTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/list.html',
    '<div class="list" id="listCtrl"><div class="segmented-control"><a class="control-item active">全体名单</a></div></div><div class="content-padded" id="studentsList"><div data-seat="s.seatPos" data-gender="s.gender" data-ng-repeat="s in students" data-ng-bind="s.fullName" data-demo="demo"></div></div><button class="btn btn-outlined" id="desk">讲 台 处</button><p class="count-info" data-ng-show="showCount">本班共有学生 <span data-ng-bind="male.length + female.length"></span> 名，男生 <span data-ng-bind="male.length"></span> 人，女生 <span data-ng-bind="female.length"></span> 人。</p>');
}]);
})();
;(function(module) {
try {
  module = angular.module('FacebookTemplate');
} catch (e) {
  module = angular.module('FacebookTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/notice.html',
    '<dl id="noticeList"><dt><span class="icon icon-edit"></span><time>2014.9.17</time></dt><dd>重构学生列表的显示方式</dd><dd>添加新功能：横屏后切换到座位表</dd><dd>添加新功能：课程表页面，当天如有美术课，会有消息块提醒，记得带美术包</dd><dt><span class="icon icon-edit"></span><time>2014.9.10</time></dt><dd>完成2个功能：学生列表（按不同颜色表示性别）&amp; 第一学期课程表</dd><dt><span class="icon icon-edit"></span><time>2014.9.4</time></dt><dd>开始构建本webapp</dd></dl>');
}]);
})();
;(function(module) {
try {
  module = angular.module('FacebookTemplate');
} catch (e) {
  module = angular.module('FacebookTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/schedule.html',
    '<div class="schedule"><button class="btn btn-negative btn-block" id="tipBar" data-ng-show="showTips"></button><h3>课程表 <span>一(3)班第一学期</span></h3><table class="table table-bordered table-schedule"><caption ng-bind="clock"></caption><thead><tr><td></td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td></tr></thead><tbody><tr><td>1</td><td>班会</td><td>语文</td><td>语文</td><td>数学</td><td>音乐</td></tr><tr><td>2</td><td>美术</td><td>语文</td><td>语文</td><td>英语</td><td>英语</td></tr><tr><td>3</td><td>语文</td><td>体育</td><td>美术</td><td>语文</td><td>语文</td></tr><tr><td>4</td><td>语文</td><td>探究</td><td>音乐</td><td>体活</td><td>品德</td></tr><tr><td>5</td><td>体育</td><td>社团</td><td>数学</td><td>体育</td><td></td></tr><tr><td>6</td><td>数学</td><td>社团</td><td>英语</td><td>语文</td><td></td></tr><tr><td>7</td><td>自然</td><td>体活</td><td>自然</td><td>品德</td><td></td></tr></tbody></table><p class="over-time">放学时间：周一至周四为 <span>15:15</span> , 周五为 <span>13:00</span>.</p></div>');
}]);
})();
;(function(module) {
try {
  module = angular.module('FacebookTemplate');
} catch (e) {
  module = angular.module('FacebookTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/test.html',
    '<div class="content-padded" id="studentsList"><div data-seat="s.seatPos" data-gender="s.gender" data-ng-repeat="s in students" data-ng-bind="s.fullName"></div></div>');
}]);
})();
