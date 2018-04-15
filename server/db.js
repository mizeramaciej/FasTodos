var mysql = require('mysql');

const dbConnectionInfo = require('./dbConf.json');
const pool = mysql.createPool(dbConnectionInfo);
createTables();

function executeSql(query, callback){
    pool.getConnection((err, con) => {
        if (err) throw err;
        con.query(query, callback);
    });
}

function createTables(){
    executeSql("CREATE TABLE IF NOT EXISTS `todos` (todoId INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255), finished BOOL)", 
        (err, result) => {
            if (err) throw err;
        });
}

function getTodos(){
    return new Promise((resolve,reject) => {
        executeSql('SELECT * FROM todos',
            (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
    });
}

function addTodo(text){
    return new Promise((resolve, reject) => {
        executeSql(`INSERT INTO todos (text, finished) VALUES ('${text}', 0)`, 
            (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
    });
}

function finishTodo(todoId){
    executeSql(`UPDATE todos SET finished = 1 WHERE todoId=${todoId}`, 
        (err, result) => {
            if (err) throw err;
        });
}

export default {
    getTodos: getTodos,
    addTodo: addTodo,
    finishTodo: finishTodo
}