const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller.js');

router.post('/', notification_controller.send_notif);

module.exports = router;