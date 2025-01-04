"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const PdfDetails_1 = __importDefault(require("./PdfDetails"));
// MongoDB connection URL
const mongoURL = "mongodb+srv://thanhha201906:k3UkIpaHihb3RHzj@resumeforum.vij7q.mongodb.net/?retryWrites=true&w=majority&appName=ResumeForum";
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/uploads", express_1.default.static("uploads")); // Serve uploaded files statically
// Connect to MongoDB
mongoose_1.default
    .connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
// Configure Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// File Upload Route
app.post("/api/files/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const newPdf = yield PdfDetails_1.default.create({
            title: req.body.title,
            pdf: req.file.filename,
        });
        res.status(201).json({ message: "File uploaded successfully", data: newPdf });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Get All Files Route
app.get("/api/files", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield PdfDetails_1.default.find();
        res.status(200).json({ status: "ok", data: files });
    }
    catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
