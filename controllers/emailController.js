import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js"; // Corrected import statement

export const email = catchAsyncError(async (req, res, next) => {
  const { to, cc, subject, body } = req.body;
  const attachments = [];

  if (!to || !cc || !subject || !body)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  // Check if attachments are provided
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      attachments.push({
        filename: file.originalname,
        content: file.buffer, // Use file buffer instead of file path
      });
    }
  }

  await sendEmail(to, cc, subject, body, attachments);

  res.status(200).json({
    success: true,
    message: `Email sent successfully`,
  });
});
