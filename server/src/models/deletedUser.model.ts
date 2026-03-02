import mongoose from "mongoose";

const deleteUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);


const deletedUserModel = mongoose.model("deleteUser", deleteUserSchema)

export default  deletedUserModel