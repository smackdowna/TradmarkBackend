import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { PDF } from "../models/pdfModel.js";

//upload pdf
export const uploadPdf = catchAsyncError(async (req, res, next) => {
  const { file_name } = req.body;
  const buffers = req.files.map((file) => file.buffer); // Access buffers from each file

  if (!file_name || buffers.length === 0)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  const newPDF = new PDF({
    file_name: file_name,
    data: buffers,
  });

  newPDF.save();

  res.status(201).json({
    success: true,
    message: "Template Uploaded Successfully",
  });
});

//get all pdf
export const getAllPdf = catchAsyncError(async (req, res, next) => {
  const pdfCount = await PDF.countDocuments();
  const pdfs = await PDF.find();

  res.status(201).json({
    success: true,
    pdfCount,
    pdfs,
  });
});

//delete a pdf ---Admin
export const deletePdf = catchAsyncError(async (req, res, next) => {
  const pdf = await PDF.findById(req.params.id);

  if (!pdf) return next(new ErrorHandler("pdf not found", 400));

  await pdf.deleteOne();

  res.status(200).json({
    success: true,
    message: "pdf Deleted Successfully",
  });
});
