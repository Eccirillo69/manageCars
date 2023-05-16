import express from "express";
import {createPoint, deletePoint, getAllPoints} from "../controllers/point"
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(express.json());

router.post("/createPoint",[authMiddleware], createPoint);
router.delete("/deletePoint/:id",[authMiddleware], deletePoint);
router.get("/getAllPoints", [authMiddleware], getAllPoints);

export {router};