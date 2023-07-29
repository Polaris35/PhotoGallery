import {Router} from "express"
import { registration } from "../controllers/userController";
import 'dotenv/config'

const router = Router();

router.post("/registration", registration);

export default router;