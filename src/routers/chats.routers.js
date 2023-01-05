const {Router} = require ("express")
const router = Router();
const chatCtrl = require("../controller/chats.controller")



router.post("/chat", chatCtrl.getChat);
router.get("/chats", chatCtrl.getChats);
router.post("/chats", chatCtrl.postChat);









module.exports = router;