require("dotenv").config();
var mysql = require('mysql2');

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// test statement. Not to be deployed in PROD!
let sql = 'Select * from loco'

pool.execute(sql, (err, res) => {
  if(err) throw err;
  console.log("DB has been connected successfully...");
})

module.exports = pool.promise();

