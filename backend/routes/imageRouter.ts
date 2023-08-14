import {Router} from "express"
import { getImage, getImagesList, uploadImage } from "../controllers/imageController";
import auth from "../middleware/auth";

const router = Router();

router.post('/upload',auth, uploadImage);
router.get('/image/:imageId', getImage);
router.get('/getList',auth, getImagesList);

export default router;