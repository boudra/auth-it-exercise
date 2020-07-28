const router = require('express').Router();
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

// add the paths for register, login, me, and logout here
//
router.post("/register", userController.create);

module.exports = router;
