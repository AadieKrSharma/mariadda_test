import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide valid Username"],
    unique: [true, "Username Exists"],
  },
  email: {
    type: String,
    required: [true, "Please Provide a Unique Email"],
    unique: [true, "Email Exists"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    unique: [false],
  },
  gender: { type: String },
  dob:{type : String},
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);