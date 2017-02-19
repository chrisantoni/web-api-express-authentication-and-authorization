var express = require('express');
var router  = express.Router();
var user_controller = require('../controller/userController')


router.get('/user', user_controller.findAll)
router.post('/user/signup', user_controller.signUp)
router.post('/user/login', user_controller.signIn)

module.exports = router;
