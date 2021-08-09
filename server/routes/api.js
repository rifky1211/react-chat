var express = require('express');
var router = express.Router();
const apiUserController = require("../controllers/apiUserController")
const apiChatController = require("../controllers/apiChatController")


router.get('/user', apiUserController.get)
router.post('/user/register', apiUserController.register)
router.post('/user/login', apiUserController.login)

router.get('/chat', apiChatController.read)
router.post('/chat/add', apiChatController.addChat)
router.delete('/chat/:id', apiChatController.deleteChat)


module.exports = router;
