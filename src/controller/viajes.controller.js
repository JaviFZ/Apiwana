const connection = require("../dataBase");

function postViaje(request,response){
    console.log(request.body);
    let sql = "INSERT INTO viaje (origen,destino,precio,id_coche,habitual,pasajeros,hora,activo)" + `VALUES('${request.body.origen}','${request.body.destino}','${request.body.precio}','${request.body.id_coche}','${request.body.habitual}','${request.body.pasajeros}','${request.body.hora}',true)`;
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
    console.log(request.body);
    let sql = `SELECT foto,nombre,origen,destino,fecha,precio,pasajeros,puntuacion FROM usuarios JOIN opiniones ON (usuarios.id_usuario = opiniones.id_pasajero) JOIN viaje ON (opiniones.id_viaje = viaje.id_viaje) WHERE (viaje.origen='${request.body.origen}' AND viaje.destino='${request.body.destino}' AND viaje.radio='${request.body.radio}' AND viaje.fecha='${request.body.fecha}' AND viaje.pasajeros='${request.body.pasajeros}')`;
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
module.exports = {postViaje, getViaje}