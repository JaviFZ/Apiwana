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
    let sql = `SELECT origen,destino,fecha,precio,pasajeros FROM usuarios 
    JOIN opiniones ON (usuarios.id_usuario = opiniones.id_pasajero) 
    JOIN viaje ON (opiniones.id_viaje = viaje.id_viaje) 
    WHERE (viaje.codigoPostalOrigen='${request.query.codPostalOr}' AND viaje.CodigoPostalDestino='${request.query.codPostalDes}' 
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
    let sql = `SELECT foto, nombre, origen, destino, fecha, hora, precio, pasajeros, puntuacionMedia 
    FROM viaje JOIN usuarios ON (viaje.id_usuarios=usuarios.id_usuario) 
    WHERE viaje.id_usuarios=${request.query.id_usuarios} `;

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
module.exports = {postViaje, getViaje, getTarjetaViaje}