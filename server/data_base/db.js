const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'vacationary'
})

connection.connect(error => {
    if (error) {
        console.log(error);
    } else {
        console.log('connected to mySql')
    }
})

const myQuery = (q) => {
    return new Promise ((resolve,reject) => {
        connection.query (q, (error, results) => {
            if (error) {
                console.log(error)
                reject (error)
            } else {
                resolve (results)
            }
        })
    })
}
module.exports = {myQuery}