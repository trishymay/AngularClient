'use strict';

require('angular/angular');

var tasksApp = angular.module('tasksApp', []);

require('./tasks/controllers/tasks_controller')(tasksApp);