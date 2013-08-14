define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        tasks = [
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
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                task = null,
                l = tasks.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (tasks[i].id === id) {
                    task = tasks[i];
                    break;
                }
            }
            deferred.resolve(task);
            return deferred.promise();
        },

        findByTitle = function (searchKey) {
            var deferred = $.Deferred(),
                results = tasks.filter(function (element) {
                    var titleToSearch = element.title;
                    return titleToSearch.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        /*findByManager = function (managerId) {
            var deferred = $.Deferred(),
                results = employees.filter(function (element) {
                    return managerId === element.managerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },*/


        Task = Backbone.Model.extend({

            initialize: function () {
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        TaskCollection = Backbone.Collection.extend({

            model: Task,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByTitle(options.data.titleToSearch).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });


    return {
        Task: Task,
        TaskCollection: TaskCollection
    };

});