const { addmessages, getAllMessages } = require('../controllers/messageController');

const router = require('express').Router();


router.post('/addmessage', addmessages);
router.post('/getmessage', getAllMessages);




module.exports = router;