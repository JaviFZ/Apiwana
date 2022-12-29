const connection = require("../dataBase");

function postViaje(request,response){
    console.log(request.body);
    let sql = "INSERT INTO viaje (origen,destino,fecha,precio,radio,diasSemana,activo,habitual,pasajeros)" + `VALUES('${request.body.origen}','${request.body.destino}','${request.body.fecha}','${request.body.precio}','${request.body.radio}','${request.body.diasSemana}','${request.body.activo}','${request.body.habitual}',${request.body.pasajeros})`;
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
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