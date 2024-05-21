import mongoose from "mongoose";


const schema = new mongoose.Schema({
    file_name: {
      type: String,
      required: [true, "Please Enter Your pdf name"],
    },
    subject: {
      type: String,
      required: [true, "Please Enter Your subject"],
    },
    data:{
        type: Buffer,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  });

  
  export const PDF = mongoose.model("PDF", schema);