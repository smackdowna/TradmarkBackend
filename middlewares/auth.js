import jwt from "jsonwebtoken";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Admin } from "../models/admin.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please Login to access this", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded._id);
    next();
  } catch (error) {
    // If token is expired
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler('Your session has expired. Please log in again.', 401));
    }
    // For other errors, return a generic error message
    return next(new ErrorHandler('Authentication failed. Please log in again.', 401));
  }
});
