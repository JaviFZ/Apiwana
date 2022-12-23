const {Router} = require ("express")
const router = Router();
const usuarioCtrl = require("../controller/usuario.controller")




router.post("/registro", usuarioCtrl.postRegistro);


router.post("/login", usuarioCtrl.postLogin);

router.put("/editarPerfil", usuarioCtrl.putPerfil);

router.get("/perfil", usuarioCtrl.getPerfil);








module.exports = router;