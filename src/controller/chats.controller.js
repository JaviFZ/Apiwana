const connection = require("../dataBase");
const usuario = require("./usuario.controller")


const getChats = (request, response) => {
    let chats = "SELECT * FROM chats WHERE chats.id_usuario1=" + request.query.id_usuario1;
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

const getChat = (request, response) => {
    let chat = `SELECT * FROM chats WHERE (chats.id_usuario1=${request.body.id_usuario1} OR chats.id_usuario1=${request.body.id_usuario2}) AND  (chats.id_usuario2=${request.body.id_usuario1} OR chats.id_usuario2=${request.body.id_usuario2})  AND chats.id_viaje=${request.body.id_viaje}`;
    console.log(chat);
    connection.query(chat, function (err, result) {
        if (err)
            console.log(err);
        else {

            if (result.length > 0) {
                response.send(getChatData(result[0].idChat, request.body.id_usuario2));
            } else {
               const nuevochat = crearChat(request.body.id_viaje, request.body.id_usuario1, request.body.id_usuario2)
               response.send(getChatData(nuevochat.insertId, request.body.id_usuario2));
            }
        }
    })
}

const crearChat = (id_usuario1, id_usuario2, id_viaje) => {
    let sql = "INSERT INTO railway.chats (id_viaje, id_usuario1, id_usuario2)" +
        " VALUES ('" + id_viaje + "', '" +
        id_usuario1 + "' , '" +
        id_usuario2 + "')";
    connection.query(sql, (err, result) => {
        if (err) console.log(err);
        else return result;
    });
}

const getChatData = (id_chat, idUsuario2) => {
    const mensajes = getChatMensajes(id_chat);
    const usuario2 = usuario.getUsuario(idUsuario2)[0];

    return { id_chat, mensajes, usuario2 };
}

const getChatMensajes = (idChat) => {
    let mensajes = `SELECT * FROM mensajes WHERE mensajes.id_chat=${idChat}`;
    connection.query(mensajes, (err, result) => {
        if (err) console.log(err);
        else return result;
    });
}


const postChat = (request, response) => {
    console.log(request.body);
    let sql = "INSERT INTO railway.chats (id_viaje, id_usuario1, id_usuario2)" +
        " VALUES ('" + request.body.id_viaje + "', '" +
        request.body.id_usuario1 + "' , '" +
        request.body.id_usuario2 + "')";

    console.log(sql);
    connection.query(sql, function (err, result) {
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
}



module.exports = { getChats, postChat, getChat };