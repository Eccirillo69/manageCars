import express from "express";
import * as controller from "../controllers/car"
import { authMiddleware} from '../middleware/auth.middleware';
import {checkRoleMiddleware } from "../middleware/role.middleware"
import { Role } from "@prisma/client";

const router = express.Router();

router.use(express.json());

router.delete("/deleteCarByPlates/:plates", [authMiddleware,checkRoleMiddleware(Role.ADMIN)], controller.deleteCarByPlates);
router.put("/changeCarPlatesByPlates/:plates",[authMiddleware, checkRoleMiddleware(Role.ADMIN)], controller.changeCarPlatesByPlates);
router.post("/addCar/",[authMiddleware, checkRoleMiddleware(Role.ADMIN)], controller.addCar);

export {router};

