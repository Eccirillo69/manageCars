import express from "express";
import {login} from "../controllers/login"
import {registration} from "../controllers/registration"

const router = express.Router();

router.use(express.json());

router.post("/registration", registration);
router.post("/login", login);

export {router};