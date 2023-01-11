const {Router} = require ("express")
const router = Router();
const viajesCtrl = require("../controller/viajes.controller");

router.post("/viajes",viajesCtrl.postViaje);
router.get("/viajes",viajesCtrl.getViaje);
router.get("/misViajes",viajesCtrl.getMisViajes);
router.get("/viaje",viajesCtrl.getTarjetaViaje);
router.get("/viajePublicado",viajesCtrl.getMisViajesPublicados);
router.delete("/misViajes", viajesCtrl.deleteViajePasajero);
router.delete("/viajesPublicados", viajesCtrl.deleteViajePublicado);
router.get("/viajesPublicados",viajesCtrl.getPasajeros);

module.exports = router;