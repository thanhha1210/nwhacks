const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const PdfDetails = require("./PdfDetails");

// MongoDB connection URL
const mongoURL =
  "mongodb+srv://thanhha201906:k3UkIpaHihb3RHzj@resumeforum.vij7q.mongodb.net/?retryWrites=true&w=majority&appName=ResumeForum";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// File Upload Route
app.post("/api/files/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Tags will be passed as a comma-separated string, so split it to convert it into an array
    const tagsArray = req.body.tags ? req.body.tags.split(",") : [];

    const newPdf = await PdfDetails.create({
      title: req.body.title,
      pdf: req.file.filename,
      tags: tagsArray, // Store the tags as an array
    });

    res.status(201).json({ message: "File uploaded successfully", data: newPdf });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Files Route
app.get("/api/files", async (req, res) => {
  try {
    const files = await PdfDetails.find();
    res.status(200).json({ status: "ok", data: files });
  } 
  catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a file based on File ID
app.get("/api/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params; // Get the fileId from URL parameters
    const file = await PdfDetails.findById(fileId); // Find the file by its ID

    if (!file) {
      return res.status(404).json({ message: "File not found in DB" });
    }

    res.status(200).json({ status: "ok", data: file });
  } 
  catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add Comment Api (with the fileId in the URL path)
app.put("/api/files/:fileId/comment", async (req, res) => {
  try {
    const { fileId } = req.params; // Get fileId from URL
    const { comment } = req.body; // Get comment from the request body

    // Find the file by fileId and update its comments array
    const updatedFile = await PdfDetails.findByIdAndUpdate(
      fileId,
      { $push: { comments: comment } }, // $push adds the new comment to the comments array
      { new: true } // This option returns the updated document
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found." });
    }

    res.status(200).json({ message: "Comment added successfully", data: updatedFile });
  } 
  catch (error) {
    console.error("Error adding comment to file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
