const app = require("./app")


// app.listen(app.get("port"), function() 
//     {
//         console.log("Server listen on port " + app.get("port"));
//     });
 
app.listen(process.env.PORT || 3000)