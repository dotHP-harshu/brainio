import mongoose from "mongoose";

interface UserInterface {
  _id: string;
  googleId: string;
  email: string;
  userName: string;
  accessToken:string;
  photo: string;
  createdAt: Date;
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
    accessToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
export { UserInterface };
export default userModel;
