const {Router} = require ("express")
const router = Router();
const usuarioCtrl = require("../controller/loginReg.controller")




router.post("/registro", usuarioCtrl.postRegistro);


router.post("/login", usuarioCtrl.postLogin);








module.exports = router;