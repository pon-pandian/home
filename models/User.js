const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: function () { return this.role === "user"; } },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: function () { return this.role === "user"; } },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "super-admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
