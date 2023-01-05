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
    connection.query(chat, async function (err, result) {
        if (err)
            console.log(err);
        else {
            if (result.length > 0) {
                try {
                    const chatData = await getChatData(result[0].idChat, request.body.id_usuario2)
                    response.send(chatData);
                } catch (err) {
                    console.log(err)
                }
            } else {
                try {
                    const nuevoChat = await crearChat(request.body.id_viaje, request.body.id_usuario1, request.body.id_usuario2);
                    const chatData = await getChatData(nuevoChat.insertId, request.body.id_usuario2);
                    response.send(chatData);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    })
}

const crearChat = (id_usuario1, id_usuario2, id_viaje) => {
    return new Promise(function(resolve, reject) {
        let sql = "INSERT INTO railway.chats (id_viaje, id_usuario1, id_usuario2)" +
        " VALUES ('" + id_viaje + "', '" +
        id_usuario1 + "' , '" +
        id_usuario2 + "')";
    connection.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
    });
    })
    
}

const getChatData = (id_chat, idUsuario2) => {
    return new Promise(async function(resolve, reject) {
        try {
            const mensajes = await getChatMensajes(id_chat);
            const usuario2 = await usuario.getUsuario(idUsuario2);
            resolve({ id_chat, mensajes, usuario2 });
        } catch (err) {
            reject(err);
        }
    });
}

const getChatMensajes = (idChat) => {
    return new Promise(function(resolve, reject) {
        let mensajes = `SELECT * FROM mensajes WHERE mensajes.id_chat=${idChat}`;
        connection.query(mensajes, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    })
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