'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('tasks controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('tasksApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var tasksController = $ControllerConstructor('tasksController', {$scope: $scope});
    expect(typeof tasksController).toBe('object');
    expect(Array.isArray($scope.tasks)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('/api/v1/tasks').respond(200, [{taskBody: 'test task'}]);

      var tasksController = $ControllerConstructor('tasksController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.tasks[0].taskBody).toBe('test task');
    });

    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/tasks').respond(200, {_id: 1, taskBody: 'test task'});

      $scope.tasks = [];
      var tasksController = $ControllerConstructor('tasksController', {$scope: $scope});
      $scope.create({taskBody: 'test task'});
      $httpBackend.flush();

      expect($scope.tasks[0]._id).toBe(1);
    });

    it('should be able to save task changes', function() {
      $httpBackend.expectPUT('/api/v1/tasks/1').respond(200);

      var tasksController = $ControllerConstructor('tasksController', {$scope: $scope});
      var task = {taskBody: 'test task', _id: 1, editing: true};
      $scope.save(task);
      $httpBackend.flush();

      expect(task.editing).toBe(false);
    });

    it('should be able to delete a task', function() {
      $httpBackend.expectDELETE('/api/v1/tasks/1').respond(200);

      $ControllerConstructor('tasksController', {$scope: $scope});
      var task = {taskBody: 'test task', _id: 1, editing: true};
      $scope.tasks.push(task);
      $scope.remove(task);
      $httpBackend.flush();

      expect($scope.tasks.length).toBe(0);
    });
  });
});
