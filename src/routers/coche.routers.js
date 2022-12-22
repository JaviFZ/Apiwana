const {Router} = require ("express")
const router = Router();
const cocheCtrl = require("../controller/coche.controller")




router.get("/coche", cocheCtrl.getCoche);
router.post("/coche", cocheCtrl.postCoche);
router.delete("/coche", cocheCtrl.deleteCoche);








module.exports = router;