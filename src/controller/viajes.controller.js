const connection = require("../dataBase");

function postViaje(request,response){
    console.log(request.body);
    let sql = "INSERT INTO viaje (origen,destino,fecha,precio,id_coche,habitual,pasajeros,hora,activo,codigoPostalOrigen,codigoPostalDestino,id_usuarios)" + `VALUES('${request.body.origen}','${request.body.destino}','${request.body.fecha}','${request.body.precio}','${request.body.id_coche}','${request.body.habitual}','${request.body.pasajeros}','${request.body.hora}',true,'${request.body.codigoPostalOrigen}','${request.body.codigoPostalDestino}', ${request.query.id_usuarios})`;
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
            response.send(err);
        }else{
            console.log(result);
            if(result.insertId){
                response.send(String(result.insertId));
            }else{
                response.send("-1");
            }
        }
    })
}

function getViaje(request,response){
    console.log(request.query);
    let sql = `SELECT id_viaje,foto,nombre,puntuacionMedia,origen,destino,fecha,precio,pasajeros,hora FROM usuarios 
    JOIN viaje ON (usuarios.id_usuario = viaje.id_usuarios) 
    WHERE (viaje.codigoPostalOrigen='${request.query.codigoPostalOrigen}' AND viaje.CodigoPostalDestino='${request.query.codigoPostalDestino}' 
    AND viaje.fecha='${request.query.fecha}')`;

    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result){
                response.send(result);
            }else{
                response.send("-1");
            }
        }
    })
}

function getTarjetaViaje(request, response) {
    let sql = `SELECT * FROM viaje JOIN usuarios ON (viaje.id_usuarios=usuarios.id_usuario) JOIN coche ON (viaje.id_coche = coche.nombreCoche)  WHERE viaje.id_viaje=${request.query.id_viaje}`;

    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result){
                response.send(result);
            }else{
                response.send("-1");
            }
        }
    })
}

function getMisViajes(request,response){
    console.log(request.query);
    let sql = `SELECT viaje.*, usuarios.foto, usuarios.nombre FROM railway.viaje
    JOIN usuarios ON (viaje.id_usuarios=usuarios.id_usuario) JOIN chats ON 
    (viaje.id_viaje=chats.id_viaje) WHERE chats.id_usuario1=${parseInt(request.query.id_pasajero)};`;
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result){
                response.send(result);
            }else{
                response.send("-1");
            }
        }
    })
}

function getMisViajesPublicados(request,response){
    console.log(request.query);
    let sql = `SELECT viaje.*, usuarios.foto, usuarios.nombre FROM railway.viaje
    JOIN usuarios ON (viaje.id_usuarios=usuarios.id_usuario) JOIN chats ON 
    (viaje.id_viaje=chats.id_viaje) WHERE chats.id_usuario2=${parseInt(request.query.id_usuario)};`;
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result){
                response.send(result);
            }else{
                response.send("-1");
            }
        }
    })
}
function postPasajeros(request, response) {
    let sql = "SELECT id_usuario1, foto FROM railway.chats join railway.usuarios ON (railway.chats.id_usuario1 = railway.usuarios.id_usuario) JOIN railway.viaje ON (railway.chats.id_usuario2 = railway.viaje.id_usuarios) WHERE viaje.id_viaje= " + request.body.id_viaje;
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


module.exports = {postViaje, getViaje, getTarjetaViaje, getMisViajes, getMisViajesPublicados, postPasajeros}