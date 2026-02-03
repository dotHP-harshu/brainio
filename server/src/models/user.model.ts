import mongoose from "mongoose";

interface UserInterface {
  googleId:string
  email:string
  userName:string
  photo:string
}

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    userName: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
export {UserInterface}
export default userModel;
