import express from "express";
import * as controller from "../controllers/car"

const router = express.Router();

router.use(express.json());

router.delete("/deleteCarByPlates/:plates", controller.deleteCarByPlates);
router.put("/changeCarPlatesByPlates/:plates", controller.changeCarPlatesByPlates);
router.post("/addCar/", controller.addCar);

export {router};

