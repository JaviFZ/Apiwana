const {Router} = require ("express")
const router = Router();
const viajesCtrl = require("../controller/viajes.controller");

router.post("/viajes",viajesCtrl.postViaje);
router.get("/viajes",viajesCtrl.getViaje);

module.exports = router;