const {Router} = require ("express")
const router = Router();
const chatCtrl = require("../controller/chats.controller")



router.get("/chat", chatCtrl.getChat);
router.get("/chats", chatCtrl.getChat);
router.post("/chats", chatCtrl.postChat);









module.exports = router;