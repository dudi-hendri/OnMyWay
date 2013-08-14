'use strict';

/* Controllers */
function MyCtrl1($scope){
    $scope.data = {message:"Hello "}
}

function MyCtrl2($scope){
    $scope.data = {message:"Hello "}
}

//var taskDataAdapter = new models.memory.task();
function TaskListCtrl($scope){
    $scope.tasks = [
        {"id": 1, "title": "Buy milk", "latitude": -2.44, "longitude": 53.1, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
        {"id": 2, "title": "Buy milk1", "latitude": 30.066158, "longitude": 34.777819, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
        {"id": 3, "title": "Buy milk2", "latitude": 12.066158, "longitude": 34.777819, "description": "bla bla buy milik 2", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 4, "title": "Buy milk3", "latitude": 32.066158, "longitude": 34.777819, "description": "bla bla buy milik 3", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 5, "title": "Buy mil4", "latitude": -8.066158, "longitude": 34.777819, "description": "bla bla buy milik 4", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 6, "title": "Buy milk5", "latitude": 32.066158, "longitude": 34.777819, "description": "bla bla buy milik 5", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
        {"id": 7, "title": "Buy milk6", "latitude": 32.066158, "longitude": 36.777819, "description": "bla bla buy milik 6", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 8, "title": "Buy a car", "latitude": -9.066158, "longitude": 34.777439, "description": "bla bla buy milik 7", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 9, "title": "Rent an house", "latitude": 32.066158, "longitude":32.777819 , "description": "bla bla buy milik 8", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 10, "title": "Buy a radio", "latitude": 3.066158, "longitude":33.777819, "description": "bla bla buy milik 9", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 11, "title": "fix the car", "latitude": 16.066158, "longitude": 43.777819, "description": "bla bla buy milik 10", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
        {"id": 12, "title": "Buy a new laptop", "latitude": 32.066158, "longitude": 18.777819, "description": "bla bla buy milik 11", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0}
    ];

    $scope.addTask = function() {
        $scope.tasks.push({title:$scope.taskTitle, isDone:false});
        $scope.taskTitle = '';
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.tasks, function(task) {
            count += task.isDone ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(task) {
            if (!task.isDone) $scope.tasks.push(task);
        });
    };
}


/*angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function($scope) {
        $scope.data = {message:"Hello "};
  }])
  .controller('MyCtrl2', [function() {

  }])
    .controller('TaskListCtrl', [function($scope){
        $scope.tasks = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}];

        $scope.addTask = function() {
            $scope.tasks.push({text:$scope.taskText, done:false});
            $scope.taskText = '';
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.tasks, function(task) {
                count += task.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var oldTasks = $scope.tasks;
            $scope.tasks = [];
            angular.forEach(oldTasks, function(task) {
                if (!task.done) $scope.tasks.push(task);
            });
        };
    }]);*/
