const {Router} = require ("express")
const router = Router();
const mensajesCtrl = require("../controller/mensajes.controller")




// router.get("/mensaje", mensajesCtrl.getMesajes);
router.post("/mensaje", mensajesCtrl.postMensaje);








module.exports = router;