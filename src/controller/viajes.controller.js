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
    let sql = `SELECT * FROM viaje JOIN usuarios ON (viaje.id_usuarios=usuarios.id_usuario) JOIN coche ON (usuarios.id_usuario = coche.id_conductor) WHERE viaje.id_viaje=${request.query.id_viaje} AND coche.nombreCoche = viaje.id_coche `;

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