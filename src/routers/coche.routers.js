const {Router} = require ("express")
const router = Router();
const cocheCtrl = require("../controller/coche.controller")




router.post("/Coche", cocheCtrl.postAñadirCoche);


router.delete("/Coche", cocheCtrl.deleteCoche);








module.exports = router;