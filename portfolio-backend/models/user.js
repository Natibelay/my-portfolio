// Import mongoose and bcrypt
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },       // User's name
  email: { type: String, required: true, unique: true }, // Must be unique
  password: { type: String, required: true }    // Hashed password
});

// Pre-save hook: hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); // skip if password is not changed
  }
  const salt = await bcrypt.genSalt(10);        // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash password
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create model
const User = mongoose.model("User", userSchema);

export default User;
