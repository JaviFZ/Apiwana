const connection = require("../dataBase")

// const getMensaje = (request, response) => {
//       let  mensajes = "SELECT * FROM mensajes WHERE mensajes.id_mensaje=" + request.query.id_mensaje;
//         console.log(mensajes);  
//         connection.query(mensajes, function (err, result) {
//             if (err) 
//                 console.log(err);
//             else {
//                 console.log(result)
//                 response.send(result);
//             }
//         })
//     }




const postMenaje = (request, response) => {
    console.log(request.body);
    let sql = "INSERT INTO railway.mensajes (id_chat, id_usuario, fecha, mensaje)" +
                " VALUES ('" + request.body.id_chat + "', '" +
                                request.body.id_usuario + "' , '" +
                                request.body.fecha + "' , '" +
                                request.body.id_mensaje + "')";

    console.log(sql);
    connection.query(sql, function (err, result) 
    {
        if(err)
            console.log(err);
        else
        {
            console.log(result);
            if (result.insertId)
                response.send(String(result.insertId));
            else
            {
                response.send("-1");
            }
        }        
    })
}



module.exports = {getMensaje, postMenaje};