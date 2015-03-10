'use strict';

module.exports = function(app) {
  app.controller('tasksController', ['$scope', 'resource', function($scope, resource) {
    $scope.tasks = [];

    var Task = resource('tasks');

    $scope.getAll = function() {
      Task.getAll(function(data) {
        $scope.tasks = data;
      });
    };

    $scope.create = function(task) {
      Task.create(task, function(data) {
        $scope.tasks.push(data);
      });
    };

    $scope.save = function(task) {
      Task.save(task, function() {
        task.editing = false;
      });
    };

    $scope.remove = function(task) {
      Task.remove(task, function() {
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      });
    };

    $scope.editToggle = function(task) {
      if (task.editing) {
        task.taskBody = task.oldTaskBody;
        task.editing = false;
      } else {
        task.oldTaskBody = task.taskBody;
        task.editing = true;
      }
    };
  }]);
};