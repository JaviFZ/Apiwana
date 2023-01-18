const connection = require("../dataBase")


function postRegistro(request, response) {
    let fechaActual = new Date();
    let fechaFormateada = fechaActual.toISOString().substring(0, 10);
    let sql = `SELECT email FROM usuarios`
    connection.query(sql, function (err, result) {
        console.log(result);
        if (err)
            console.log(err);
        else {
            console.log(result);
            if (!result.find(request.body.email)){
            let sql2 = "INSERT INTO usuarios (nombre, apellidos , fechaDeNacimiento, email, password, fechaDeAlta)" +
            " VALUES ('" + request.body.nombre + "', '" +
            request.body.apellidos + "' , '" +
            request.body.fechaDeNacimiento + "' , '" +
            request.body.email + "' , '" +
            request.body.password + "' , '" +
            fechaFormateada + "')";
            connection.query(sql2, function (err, result) {
                console.log(result);
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
            }else {
                response.send({message:"Este email ya está registrado"});
            }
        }
    })
    // console.log(request.body);
    
    // let sql2 = "INSERT INTO usuarios (nombre, apellidos , fechaDeNacimiento, email, password, fechaDeAlta)" +
    //     " VALUES ('" + request.body.nombre + "', '" +
    //     request.body.apellidos + "' , '" +
    //     request.body.fechaDeNacimiento + "' , '" +
    //     request.body.email + "' , '" +
    //     request.body.password + "' , '" +
    //     fechaFormateada + "')";

    // console.log(sql2);
    // connection.query(sql2, function (err, result) {
    //     if (err)
    //         console.log(err);
    //     else {
    //         console.log(result);
    //         if (result.insertId)
    //             response.send(String(result.insertId));
    //         else {
    //             response.send("-1");
    //         }
    //     }
    // })
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

    let params = [request.body.email, request.body.nombre, request.body.apellidos, request.body.direccion, request.body.telefono, request.body.genero, request.body.fechaDeNacimiento, request.body.foto,request.body.tiempoDeEspera, request.body.sobreMi, request.body.id_usuario]

    let sql = "UPDATE usuarios SET email = COALESCE(?, email) , " +
        "nombre = COALESCE(?, nombre) , " +
        "apellidos = COALESCE(?, apellidos) , " +
        "direccion = COALESCE(?, direccion) , " +
        "telefono = COALESCE(?, telefono) , " +
        "genero = COALESCE(?, genero) , " +
        "fechaDeNacimiento = COALESCE(?, fechaDeNacimiento) , " +
        "foto = COALESCE(?, foto) , " +
        "tiempoDeEspera = COALESCE(?, tiempoDeEspera) , " +
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
    return new Promise(function (resolve, reject) {
        let sql = `SELECT * FROM railway.usuarios WHERE id_usuario=${id_usuario}`;
        connection.query(sql, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    })
}

function postOpinion(request, response) {

    let sql = `INSERT INTO opiniones (opinion, puntuacion, id_pasajero, id_viaje, id_conductor) VALUES ('${request.body.opinion}','${request.body.puntuacion}', '${request.body.id_pasajero}',  '${request.body.id_viaje}' ,  '${request.body.id_conductor}') `;

    connection.query(sql, function (err, r) {
        if (err)
            console.log(err);
        else {
            console.log(r);
            sql = `SELECT AVG(puntuacion), id_usuarios  FROM railway.opiniones JOIN railway.viaje ON (railway.opiniones.id_viaje = railway.viaje.id_viaje) JOIN railway.usuarios ON (railway.viaje.id_usuarios = railway.usuarios.id_usuario) WHERE railway.viaje.id_viaje = ${request.body.id_viaje}`;

            connection.query(sql, function (err, result) {
                if (err)
                    console.log(err);
                else {
                    console.log('---');
                    console.log(result);
                    console.log('---');
                    sql = `UPDATE usuarios SET puntuacionMedia = ${parseFloat(result[0]['AVG(puntuacion)'])} WHERE id_usuario = ${result[0].id_usuarios} `
                    connection.query(sql, function (err, result2) {
                        if (err)
                            console.log(err);
                        else {
                            console.log(result2);
                            response.send(result2);
                        }
                    })
                }
            })
        }
    })
}


const getOpinion = (request, response) => {
    let sql = "SELECT * FROM railway.opiniones JOIN railway.usuarios ON (railway.opiniones.id_pasajero=railway.usuarios.id_usuario) WHERE id_conductor=" + request.query.id_usuario;
      console.log(sql);  
      connection.query(sql, function (err, result) {
          if (err) 
              console.log(err);
          else {
              console.log(result)
              response.send(result);
          }
      })
  }




  const getInfoOtherUser = (request , response) => {
    let sql = "SELECT * FROM railway.usuarios JOIN railway.coche ON (railway.usuario.id_usuario=railway.coche.id_conductor) JOIN railway.opiniones ON (railway.opiniones.id_opinion=railway.usuarios.id_usuario) WHERE id_usuario = " + request.query.id_del_usuario_deseado ; 
    console.log(sql);  
    connection.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else {
            console.log(result)
            response.send(result);
        }
    })
  }
  




module.exports = { postRegistro, postLogin, putPerfil, getPerfil, getUsuario, postOpinion , getOpinion , getInfoOtherUser }; 
