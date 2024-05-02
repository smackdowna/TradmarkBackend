import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
import { deletePdf, getAllPdf, uploadPdf } from "../controllers/pdfController.js";

const router = express.Router();

//upload pdf
router.route("/uploadPdf").post(isAuthenticated,singleUpload,uploadPdf);

//get all pdf
router.route("/pdfs").get(isAuthenticated,getAllPdf);

//delete log

//get all pdf
router.route("/pdf/:id").delete(isAuthenticated,deletePdf);


export default router;
