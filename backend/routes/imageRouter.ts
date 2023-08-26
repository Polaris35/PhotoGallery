import {Router} from "express"
import { deleteImage, getImage, getImagesList, renameImage, uploadImage } from "../controllers/imageController";
import auth from "../middleware/auth";

const router = Router();

router.post('/upload',auth, uploadImage);
router.get('/image/:imageId/:token', getImage);
router.get('/getList',auth, getImagesList);
router.delete('/delete',auth, deleteImage);
router.put('/rename', auth, renameImage);

export default router;