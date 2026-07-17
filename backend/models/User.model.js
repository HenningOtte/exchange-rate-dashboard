const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    minlength: [2, "Firstname must be at least 3 characters"],
    maxlength: [50, "Firstname cannot exceed 50 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    minlength: [2, "Lastname must be at least 3 characters"],
    maxlength: [50, "Lastname cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
