const router = require('express').Router();
const User = require('../models/User');
const UserController = require('../controllers/user-controller')
const authMiddleware = require("../middlewares/auth-middleware");

router.post('/', UserController.registration)
router.post('/login', UserController.login)
router.get("/profile", authMiddleware, UserController.profile);
router.put("/profile", authMiddleware, UserController.update);


//follow and unfollow user
router.get("/follow/:id", authMiddleware, UserController.follow);
router.get("/unfollow/:id", authMiddleware, UserController.unfollow);

module.exports = router
