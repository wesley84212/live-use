const mysql_config = require('../../config/mysql_config.json');
const mysql = require('mysql');

let Mysql = function () {
    let start = () => {
        let connection = mysql.createConnection({
            host: mysql_config.host,
            user: mysql_config.user,
            password: mysql_config.password,
            database: mysql_config.database
        });
        return connection;
    }
    return {
        start: start
    }
}();
module.exports = Mysql;