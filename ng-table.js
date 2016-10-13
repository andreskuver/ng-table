(function(angular) {
  'use strict';

  angular.module("ngTable", [])

  .directive('ngTable', function() {
    return {
      restrict: 'E',
      scope: {
        options: '=options',
      },
      template:
        '<table class="table table-striped table-bordered table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th data-ng-repeat="(key,value) in options.columns">{{value.title}}</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody>'
        + '<tr data-ng-repeat="obj in data">'
        + '<td ng-repeat="col in options.columns">{{obj[col.data]}}</td>'
        + '</tr>'
        + '</tbody></table>',
      controller: function($scope, $element, $http){

        init();

        function init() {
          getData();
        }

        function getData() {
          if ($scope.options.cbUrl) {
            $scope.options.cbUrl()
              .then((data) => {
                $scope.data = data.rows;
              });
          } else {
            $http.get($scope.options.url)
              .then((data) => {
                $scope.data = data.data.rows;

              });
          }
        }
      },
    }
  });
})(window.angular);;