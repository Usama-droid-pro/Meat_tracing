
const express = require('express');
const router = express.Router();
const controller = require("../controllers/animalRecordController")
const upload = require('../middlewares/animal_images')


router.post("/create_record" , upload.single('image') , controller.createAnimalRecord)
router.get("/getAnimalBy_qrCode" , controller.getAnimalBy_QR)
router.delete("/deleteAnimalRecord" , controller.deleteAnimalRecord)



module.exports= router;