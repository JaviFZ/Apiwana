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
    let sql = `SELECT * FROM usuarios WHERE email='${request.body.email}' AND password='${request.body.password}'`;


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

    connection.query(sql, params, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result);
            response.send(result);
        }
    })
}


function getPerfil(request, response) {
    console.log(request.query);

    if (request.query.id_usuario) {
        getUsuario(request.query.id_usuario)
        .then((result) => response.send(result))
        .catch(err => console.log(err));
    }
}

const getUsuario = (id_usuario) => {
    return new Promise(function(resolve, reject) {
        let sql = `SELECT * FROM railway.usuarios WHERE id_usuario=${id_usuario}`;
        connection.query(sql, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    })
} 

module.exports = { postRegistro, postLogin, putPerfil, getPerfil, getUsuario };