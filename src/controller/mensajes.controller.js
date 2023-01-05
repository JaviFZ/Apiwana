const connection = require("../dataBase");
const { get } = require("../routers/usuario.routers");


 const getMensaje = (mensajeId) => {
    return new Promise(function(resolve, reject) {
        let  mensaje = "SELECT * FROM mensajes WHERE mensajes.id_mensaje=" + mensajeId;
        console.log(mensaje);  
        connection.query(mensaje, function (err, result) {
            if (err) 
                reject(err);
            else {
                resolve(result);
            }
        })
    });
     }




const postMensaje = (request, response) => {
    console.log(request.body);
    let sql = "INSERT INTO railway.mensajes (id_chat, id_usuario, fecha, mensaje)" +
                " VALUES ('" + request.body.id_chat + "', '" +
                                request.body.id_usuario + "' , '" +
                                request.body.fecha + "' , '" +
                                request.body.mensaje + "')";

    console.log(sql);
    connection.query(sql, async function (err, result) 
    {
        if(err)
            console.log(err);
        else {
            try {
                const mensaje = await getMensaje(result.insertId)
                response.send(mensaje);
            } catch (err) {
                console.log(err)
            }
        }        
    })
}


module.exports = {getMensaje, postMensaje};