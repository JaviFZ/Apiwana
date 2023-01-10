const connection = require("../dataBase")

const postPasajeros = (idViaje, idPasajero) => {
    return new Promise(function(resolve, reject) {
        let pasajero = `INSERT INTO pasajero (id_viaje, id_usuario) VALUES (${idViaje}, ${idPasajero})`;
        connection.query(pasajero, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    })
}

const getPasajeros = async (request, response) => {
    try {
        const chatsData = await getChatsData(request.query.id_usuario);
        for (let i = 0; i<chatsData.length; i++) {
            let idOtroUsuario = chatsData[i].id_usuario1 === parseInt(request.query.id_usuario) ? chatsData[i].id_usuario2 : chatsData[i].id_usuario1;
            const otroUsuario = await usuario.getUsuario(idOtroUsuario)
            const ultimoMensaje = await mensajes.getUltimoMensaje(chatsData[i].id_chat)
            chatsData[i] = { ...chatsData[i], nombre: otroUsuario[0].nombre, apellidos: otroUsuario[0].apellidos, foto: otroUsuario[0].foto, ultimoMensaje };
        }
        response.send(chatsData)
    } catch (err) {
        console.log(err)
    }
}

    module.exports = { postPasajeros };