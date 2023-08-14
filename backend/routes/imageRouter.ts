import {Router} from "express"
import { getImage, uploadImage } from "../controllers/imageController";
import auth from "../middleware/auth";

const router = Router();

router.post('/upload',auth, uploadImage);
router.get('/:imageId', getImage);

export default router;