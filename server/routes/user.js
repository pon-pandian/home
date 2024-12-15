const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = new User({ name, email, phone, password, role: "user" });
    await user.save();
    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const superAdminEmail = "superadmin@zomato.com";
  const superAdminPassword = "1234admin";

  if (email === superAdminEmail) {
    if (password === superAdminPassword) {
      req.session.user = { id: "super-admin", role: "super-admin" };
      return res.status(200).json({ success: true, role: "super-admin" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid Super Admin credentials!" });
    }
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    if (password !== user.password) return res.status(401).json({ success: false, message: "Invalid credentials!" });

    req.session.user = { id: user._id, role: user.role };
    res.status(200).json({ success: true, role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed!" });
  }
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.status(401).json({ success: false, message: "Not authenticated!" });
  res.status(200).json({ success: true, role: req.session.user.role });
});

router.post("/register-admin", async (req, res) => {
  if (req.session.user?.role !== "super-admin") {
    return res.status(403).json({ success: false, message: "Access denied!" });
  }

  const { email, password } = req.body;
  try {
    const admin = new User({ email, password, role: "admin" });
    await admin.save();
    res.status(201).json({ success: true, message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Admin registration failed!" });
  }
});

module.exports = router;
