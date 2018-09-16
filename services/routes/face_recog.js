const express = require('express');
const router = express.Router();
const face_recog_controller = require('../controllers/face_recog_controller.js');

router.post('/enroll', face_recog_controller.enroll);
router.post('/recognize', face_recog_controller.recognize);
router.post('/clear', face_recog_controller.clear);

module.exports = router;