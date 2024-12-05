const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose.connect("mongodb://localhost:27017/filedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  uploadTime: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.get("/files", async (req, res) => {
  const { page = 1, limit = 5 } = req.query; 
  const files = await File.find()
    .sort({ uploadTime: -1 }) 
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await File.countDocuments();
  res.json({ files, total });
});


app.post("/upload", upload.array("files"), async (req, res) => {
  const files = req.files.map((file) => ({
    name: file.originalname,
    path: file.path,
    uploadTime: new Date(), 
  }));

  await File.insertMany(files);
  res.status(200).json(await File.find().sort({ uploadTime: -1 }));
});

app.get("/download/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  if (file) {
    const fullPath = path.resolve(file.path);
    if (fs.existsSync(fullPath)) {
      res.download(fullPath, file.name);
    } else {
      res.status(404).json({ error: "File not found on server" });
    }
  } else {
    res.status(404).json({ error: "File not found in database" });
  }
});

app.delete("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found in database" });
    }

    const fullPath = path.resolve(file.path);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    } else {
      console.warn(`File not found on server: ${fullPath}`);
    }
    await File.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/share", async (req, res) => {
  const { email, subject, content, fileId } = req.body;
  const file = await File.findById(fileId);

  if (file) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: content,
      attachments: [{ path: file.path }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json({ message: "Email sent", info });
    });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.get("/images", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

  const files = await File.find()
    .sort({ uploadTime: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .where('name')
    .in(imageExtensions.map(ext => new RegExp(ext, 'i')));

  const total = await File.countDocuments({
    name: { $in: imageExtensions.map(ext => new RegExp(ext, 'i')) }
  });

  res.json({ files, total });
});

const FormData = mongoose.model(
  "FormData",
  new mongoose.Schema({
    name: String,
    location: {
      lat: Number,
      lng: Number,
    },
  })
);

app.get("/formdata", async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
