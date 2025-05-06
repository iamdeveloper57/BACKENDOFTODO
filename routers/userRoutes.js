const router = require('express').Router();
const userController = require('../controllers/userController');

const rateLimit = require('express-rate-limit');
const limit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'too many request'
});

// create new user
router.post('/signup', limit, userController.createUser);
router.post('/login', limit, userController.loginUser);

module.exports = router;