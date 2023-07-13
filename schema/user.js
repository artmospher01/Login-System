import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
    },
    date: {
      type: Date
    },
    answer: {
      type: String
    },
    googleId: {
      type: String
    }
  }, { timestamps: true }
)
const userModel = mongoose.model("user", modelSchema)

export default userModel