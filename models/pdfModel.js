import mongoose from "mongoose";


const schema = new mongoose.Schema({
    file_name: {
      type: String,
      required: [true, "Please Enter Your pdf name"],
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