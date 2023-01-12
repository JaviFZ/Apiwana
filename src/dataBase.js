const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "iwanacar4.",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 3306
})


connection.connect(function (error) {
    if(error){
        console.log(error);
    } else {
        console.log('Conexion correcta');
    }
});


module.exports = connection;