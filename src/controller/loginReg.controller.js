const connection = require("../dataBase")


function postRegistro(request, response) {
    console.log(request.body);
    let sql = "INSERT INTO usuario (nombre, apellidos , correo, foto, password)" +
        " VALUES ('" + request.body.nombre + "', '" +
        request.body.apellidos + "' , '" +
        request.body.correo + "' , '" +
        request.body.foto + "' , '" +
        request.body.password + "')";

    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result);
            if (result.insertId)
                response.send(String(result.insertId));
            else {
                response.send("-1");
            }
        }
    })
}

function postLogin(request, response) {
    let sql = `SELECT id_usuario, nombre, apellidos, correo, foto FROM usuario WHERE correo='${request.body.correo}' AND password='${request.body.password}'`;


    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            // response.send(result);
            if (result.length > 0) {
                response.send(result[0])
                console.log(result);
            } else {
                response.send({ error: "Los datos no coinciden" });
            }
        }
    })
};

function putPerfil(request, response) {
    console.log(request.body);

    let params = [request.body.nombre, request.body.email, request.body.apellidos, request.body.direccion, request.body.telefono, request.body.genero, request.body.fechaDeNacimiento, request.body.foto, request.body.sobreMi, request.body.id_usuario]

    let sql = "UPDATE libro SET usuarios = COALESCE(?, email) , " +
        "nombre = COALESCE(?, nombre) , " +
        "apellidos = COALESCE(?, apellidos) , " +
        "direccion = COALESCE(?, direccion) , " +
        "telefono = COALESCE(?, telefono) , " +
        "genero = COALESCE(?, genero) , " +
        "fechaDeNacimiento = COALESCE(?, fechaDeNacimiento) , " +
        "sobreMi = COALESCE(?, sobreMi) , " +
        "foto = COALESCE(?, foto)  WHERE id_usuario = ?";

    console.log(sql);

    connection.query(sql, params), function (err, result) {
        if (err)
            console.log(err);
        else {
            response.send(result);
        }
    }
}

module.exports = { postRegistro, postLogin , putPerfil };