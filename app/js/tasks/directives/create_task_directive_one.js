'use strict';

module.exports = function(app) {
  app.directive('createTaskDirective', function() {
    return {
      restrict: 'A'
      templateUrl: '/templates/tasks/directives/create_task_directive.html',
      replace: true
    }
  });
};