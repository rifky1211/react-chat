var express = require('express');
var router = express.Router();

const helpers = require("../helpers/util")

const apiUserController = require("../controllers/apiUserController")
const apiChatController = require("../controllers/apiChatController")


router.get('/user', apiUserController.get)
router.post('/user/register', apiUserController.register)
router.post('/user/login', apiUserController.login)

router.get('/chat', helpers.verifyToken, apiChatController.read)
router.post('/chat/add', helpers.verifyToken, apiChatController.addChat)
router.delete('/chat/:id', helpers.verifyToken, apiChatController.deleteChat)


module.exports = router;
