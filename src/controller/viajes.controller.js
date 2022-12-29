const connection = require("../dataBase");

function postViaje(request,response){
    console.log(request.body);
    let sql = "INSERT INTO viaje (origen,destino,precio,id_coche,habitual,pasajeros,hora,activo,id_usuarios)" + `VALUES('${request.body.origen}','${request.body.destino}','${request.body.precio}','${request.body.id_coche}','${request.body.habitual}','${request.body.pasajeros}','${request.body.hora}',true, ${request.query.id_usuarios})`;
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
    let sql = `SELECT foto,nombre,origen,destino,fecha,precio,pasajeros,puntuacion FROM usuarios 
    JOIN opiniones ON (usuarios.id_usuario = opiniones.id_pasajero) 
    JOIN viaje ON (opiniones.id_viaje = viaje.id_viaje) 
    WHERE (viaje.origen='${request.query.origen}' AND viaje.destino='${request.query.destino}' 
    AND viaje.radio='${request.query.radio}'  AND viaje.fecha='${request.query.fecha}'
    AND viaje.pasajeros='${request.query.pasajeros}')`;

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