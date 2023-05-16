import express from "express";
import * as controller from "../controllers/person"
import { authMiddleware} from '../middleware/auth.middleware';
import {checkRoleMiddleware } from "../middleware/role.middleware"
import { Role } from "@prisma/client";

const router = express.Router();
router.use(express.json());

//FAI UN CONTROLLER PER OGNI END-POINT
router.get("/getAllPersons",[authMiddleware], controller.getAllPersons);
router.get("/:username/cars" ,[authMiddleware], controller.getAllCarsByPerson);
router.put("/changeUsername/:username",[authMiddleware, checkRoleMiddleware(Role.ADMIN)], controller.changeUsername);
router.post("/addPerson",[authMiddleware, checkRoleMiddleware(Role.ADMIN)], controller.addPerson);
router.get('/search',[authMiddleware], controller.searchPersons);

export {router};