const express = require('express');
const secretController = require("../../controllers/secretController");
const router = express.Router();

router.get('/allLines', secretController.getAllLines);
router.get('/lineStops', secretController.getStops);
router.get('/getNotifi', secretController.getNotifi);
router.get('/allBuses', secretController.getAllBuses);
router.get('/allTrams', secretController.getAllTrams);

module.exports = router;