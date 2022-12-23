const connection = require("../dataBase");


const getChats = (request, response) => {
      let  chats = "SELECT * FROM chats WHERE chats.id_usuario1=" + request.query.id_usuario1;
        console.log(chats);  
        connection.query(chats, function (err, result) {
            if (err) 
                console.log(err);
            else {
                console.log(result)
                response.send(result);
            }
        })
    }

const getChat = (request, request2, request3, response) => {
    let  chat = `SELECT * FROM chats WHERE chats.id_usuario1=${request.query.id_usuario1} AND chats.id_usuario2=${request2.query.id_usuario2} AND chats.id_viaje=${request3.query.id_viaje}`;
    console.log(chat);  
    connection.query(chat, function (err, result) {
        if (err) 
            console.log(err);
        else {
            console.log(result)
            response.send(result);
        }
    })
}


const postChat = (request, response) => {
    console.log(request.body);
    let sql = "INSERT INTO railway.chats (id_viaje, id_usuario1, id_usuario2)" +
                " VALUES ('" + request.body.id_viaje + "', '" +
                                request.body.id_usuario1 + "' , '" +
                                request.body.id_usuario2 + "')";

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



module.exports = {getChats, postChat,getChat };