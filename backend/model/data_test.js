const mysql = require('../mysql/mysql_connect')
const connect = mysql.start()
let sql = "SELECT value,create_date FROM `Electricity` WHERE 1"
let KHWModel = function () {

    let getList = () => {
        return new Promise((resolve, reject) => {
            connect.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    };

    let getListByMonth = (month) => {
        const monthMap = {
            '3': '2020-03',
            '4': '2020-04',
            '5': '2020-05',
            '6': '2020-06',
        };
        let sql = `SELECT value,create_date FROM Electricity WHERE create_date LIKE '${monthMap[month]}%'`;
        return new Promise((resolve, reject) => {
            connect.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    let createList = async (input) => {
        let sql = `INSERT INTO Electricity(value, create_date) VALUES (${input[0]},'${input[1]}')`
        if (input[0] === '') {
            return { result: 'error', msg: 'No data' };
        }
        return new Promise((resolve, reject) => {
            connect.query(sql, async function (err, result) {
                if (err) {
                    reject({ result: 'error', err });
                } else {
                    resolve({ result: 'success' });
                }
            })
        });
    }

    return {
        getList: getList,
        createList: createList,
        getListByMonth: getListByMonth
    }

}();
module.exports = KHWModel;