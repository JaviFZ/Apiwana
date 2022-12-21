const connection = require("../dataBase")


function postRegistro(request, response) {
    console.log(request.body);
    let sql = "INSERT INTO usuarios (nombre, apellidos , fechaDeNacimiento, email, password)" +
        " VALUES ('" + request.body.nombre + "', '" +
        request.body.apellidos + "' , '" +
        request.body.fechaDeNacimiento + "' , '" +
        request.body.email + "' , '" +
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
    let sql = `SELECT id_usuario FROM usuarios WHERE email='${request.body.email}' AND password='${request.body.password}'`;


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

    let params = [request.body.email, request.body.nombre, request.body.apellidos, request.body.direccion, request.body.telefono, request.body.genero, request.body.fechaDeNacimiento, request.body.foto, request.body.sobreMi, request.body.id_usuario]

    let sql = "UPDATE usuarios SET email = COALESCE(?, email) , " +
        "nombre = COALESCE(?, nombre) , " +
        "apellidos = COALESCE(?, apellidos) , " +
        "direccion = COALESCE(?, direccion) , " +
        "telefono = COALESCE(?, telefono) , " +
        "genero = COALESCE(?, genero) , " +
        "fechaDeNacimiento = COALESCE(?, fechaDeNacimiento) , " +
        "foto = COALESCE(?, foto) , " +
        "sobreMi = COALESCE(?, sobreMi)  WHERE id_usuario = ?";

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