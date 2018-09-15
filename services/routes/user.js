const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller.js');

router.post('/create_user', user_controller.create_user);
router.post('/create_trip', user_controller.create_trip);

module.exports = router;