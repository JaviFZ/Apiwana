const connection = require("../dataBase")



const postCoche = (request, response) => {
    console.log(request.body);
    let sql = "INSERT INTO usuario (nombreCoche, marca, modelo, matricula, combustible, color, fumar, mascotas)" +
                " VALUES ('" + request.body.nombreCoche + "', '" +
                                request.body.marca + "' , '" +
                                request.body.modelo + "' , '" +
                                request.body.matricula + "' , '" +
                                request.body.combustible + "' , '" +
                                request.body.color + "' , '" +
                                request.body.fumar + "' , '" +
                                request.body.mascotas + "')";

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

const deleteCoche = (request, response) =>{
    console.log(request.body);
    let sql = `DELETE FROM coche WHERE id_coche=${request.body.id_coche} `;
    console.log(sql); 
    connection.query(sql, (err, result) => {
        if (err) 
            console.log(err);
        else 
        {
            response.send(result);
        }
    })
}

module.exports = {postCoche, deleteCoche};