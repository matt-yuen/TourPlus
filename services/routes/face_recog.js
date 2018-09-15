const express = require('express');
const router = express.Router();
const face_recog_controller = require('../controllers/face_recog_controller.js');

router.post('/', face_recog_controller.face_recog);

module.exports = router;