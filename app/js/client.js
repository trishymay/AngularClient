'use strict';

require('angular/angular');

var tasksApp = angular.module('tasksApp', []);

//services
require('./services/resource_service')(tasksApp);

//controllers
require('./tasks/controllers/tasks_controller')(tasksApp);

//directives
require('./directives/dummy_directive')(tasksApp);
require('./tasks/directives/create_task_directive_one')(tasksApp);