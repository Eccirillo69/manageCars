import express from "express";
import * as controller from "../controllers/person"

const router = express.Router();
router.use(express.json());

//FAI UN CONTROLLER PER OGNI END-POINT
router.get("/getAllPersons", controller.getAllPersons);
router.get("/:username/cars" , controller.getAllCarsByPerson);
router.put("/changeUsername/:username", controller.changeUsername);
router.post("/addPerson", controller.addPerson);

export {router};