const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/ranking');



router.get('/resultado', rankingController.getRanking);
router.post('/nuevo-registro', rankingController.postRanking);

module.exports = router;