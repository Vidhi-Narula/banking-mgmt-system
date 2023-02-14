const mysql = require('mysql');
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "bank_users"
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connection created.....");
});

module.exports.con=con;