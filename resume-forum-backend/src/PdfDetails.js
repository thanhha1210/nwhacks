const mongoose = require("mongoose");

// Define the schema
const PdfDetailsSchema = new mongoose.Schema(
    {
        pdf: { type: String, required: true },
        title: { type: String, required: true },
        tags: {type: [String], required: true},
        comments: {type: [String], required: true}
    },
    { collection: "PdfDetails" }
);

// Create and export the model
const PdfDetails = mongoose.model("PdfDetails", PdfDetailsSchema);
module.exports = PdfDetails;
