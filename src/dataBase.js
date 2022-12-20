const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: process.env.DB_HOST || "containers-us-west-123.railway.app",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "6CE8IhpUXIYVC3E7DKUY",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 7872
})


connection.connect(function (error) {
    if(error){
        console.log(error);
    } else {
        console.log('Conexion correcta');
    }
});


module.exports = connection;