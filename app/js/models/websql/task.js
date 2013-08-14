//Add update, delete methods

var WebSqlAdapter = function () {

	//DONE.
    this.initialize = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("GeoTaskDB", "1.0", "Geo task DB", 200000);
        this.db.transaction(
            function (tx) {
                createTable(tx);
                addSampleData(tx);
            },
            function (error) {
                console.log('Transaction error: ' + error);
                deferred.reject('Transaction error: ' + error);
            },
            function () {
                console.log('Transaction success');
                deferred.resolve();
            }
        );
        return deferred.promise();
    }

	this.getAllTasks = function () {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {

                var sql = "SELECT * " +
                    "FROM tasks t ";

                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        tasks = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        tasks[i] = results.rows.item(i);
                    }
                    deferred.resolve(tasks);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    }
	
	//DONE.
    this.getUndoneTasks = function () {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {

                var sql = "SELECT * " +
                    "FROM tasks t " +
                    "WHERE t.isDone = 0";

                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        tasks = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        tasks[i] = results.rows.item(i);
                    }
                    deferred.resolve(tasks);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    }

	//DONE.
    this.getById = function (id) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {

                var sql = "SELECT * " +
                    "FROM tasks t " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function (tx, results) {
                    deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    };
	
	//DONE
    var createTable = function (tx) {
        //tx.executeSql('DROP TABLE IF EXISTS employee');
        var sql = "CREATE TABLE IF NOT EXISTS tasks ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "title VARCHAR(100), " +
            "latitude FLOAT, " +
            "longitude FLOAT, " +
            "description , " +
            "frequency VARCHAR(20), " +
            "startTime TEXT(50), " +
            "endTime TEXT(50), " +
            "isDone INTEGER)";
        tx.executeSql(sql, null,
            function () {
                console.log('Create table success');
            },
            function (tx, error) {
                alert('Create table error: ' + error.message);
            });
    }

	//DONE
    var addSampleData = function (tx, tasks) {
        var tasks = [
            {"id": 1, "title": "Buy milk", "latitude": 123453, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
            {"id": 2, "title": "Buy milk1", "latitude": 43212, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
            {"id": 3, "title": "Buy milk2", "latitude": 252, "longitude": 656534, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 4, "title": "Buy milk3", "latitude": 432643, "longitude": 5234, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 5, "title": "Buy mil4", "latitude": 123453, "longitude": -89234, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 6, "title": "Buy milk5", "latitude": 123453, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 1},
            {"id": 7, "title": "Buy milk6", "latitude": 42343, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 8, "title": "Buy a car", "latitude": 4324, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 9, "title": "Rent an house", "latitude":4234, "longitude": -354, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 10, "title": "Buy a radio", "latitude":43432, "longitude":-789, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 11, "title": "fix the car", "latitude": 123453, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0},
            {"id": 12, "title": "Buy a new laptop", "latitude": 123453, "longitude": 5283, "description": "bla bla buy milik 1", "frequency": "One a week", "startTime": "", "endTime": "", "isDone": 0}                        
        ];
        var length = tasks.length;
        var sql = "INSERT OR REPLACE INTO tasks " +
            "(id, title, latitude, longitude, description, frequency, startTime, endTime, isDone) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var currTask;
        for (var i = 0; i < length; i++) {
            currTask = tasks[i];
            tx.executeSql(sql, [currTask.id, currTask.title, currTask.latitude, currTask.longitude, currTask.description, currTask.frequency, currTask.startTime, currTask.endTime, currTask.isDone],
                function () {
                    console.log('INSERT success');
                },
                function (tx, error) {
                    alert('INSERT error: ' + error.message);
                });
        }
    }

}