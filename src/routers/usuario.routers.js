const {Router} = require ("express")
const router = Router();
const usuarioCtrl = require("../controller/usuario.controller")




router.post("/registro", usuarioCtrl.postRegistro);


router.post("/login", usuarioCtrl.postLogin);








module.exports = router;