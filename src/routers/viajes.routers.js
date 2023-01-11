const {Router} = require ("express")
const router = Router();
const viajesCtrl = require("../controller/viajes.controller");

router.post("/viajes",viajesCtrl.postViaje);
router.get("/viajes",viajesCtrl.getViaje);
router.get("/misViajes",viajesCtrl.getMisViajes);
router.get("/viaje",viajesCtrl.getTarjetaViaje);
router.get("/viajePublicado",viajesCtrl.getMisViajesPublicados);
router.get("/viajesPublicados",viajesCtrl.getpasajeros);

module.exports = router;