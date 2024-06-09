const { register, login, getallUser } = require('../controllers/userController');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);
router.get('/alluser/:id', getallUser);



module.exports = router;