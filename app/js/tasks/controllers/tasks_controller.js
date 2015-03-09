'use strict';

module.exports = function(app) {
  app.controller('tasksController', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/tasks'
      })
      .success(function(data) {
        $scope.tasks = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(task) {
      $http({
        method: 'POST',
        url: '/api/v1/tasks',
        data: task
      })
      .success(function(data) {
        $scope.tasks.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(task) {
      $http({
        method: 'PUT',
        url: '/api/v1/tasks/' + task._id,
        data: task
      })
      .success(function() {
        task.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(task) {
      $http({
        method: 'DELETE',
        url: '/api/v1/tasks/' + task._id
      })
      .success(function() {
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      })
      .error(function(data) {
        console.log(data);
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