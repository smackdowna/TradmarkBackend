import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { email } from "../controllers/emailController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//upload pdf
router.route("/sendemail").post(isAuthenticated,singleUpload,email);



export default router;
