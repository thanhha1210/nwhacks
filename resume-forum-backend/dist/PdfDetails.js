"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema
const PdfDetailsSchema = new mongoose_1.default.Schema({
    pdf: { type: String, required: true },
    title: { type: String, required: true },
}, { collection: "PdfDetails" });
// Create and export the model
const PdfDetails = mongoose_1.default.model("PdfDetails", PdfDetailsSchema);
exports.default = PdfDetails;
