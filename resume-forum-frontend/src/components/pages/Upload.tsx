// src/components/Upload.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import { uploadFile } from "../../services/use-file";


const Upload = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
        alert("Please upload a file");
        return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
        await uploadFile(formData);
        alert("File uploaded successfully");
        navigate("/"); // Navigate back to Home page after upload
        } catch (error) {
        alert("Failed to upload file");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50">
        <form
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
            onSubmit={handleSubmit}
        >
            <h2 className="text-3xl font-semibold text-gray-800 text-center">Upload Your Resume</h2>

            <div>
            <input
                type="text"
                className="form-control w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                placeholder="Enter your resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </div>

            <div>
            <input
                type="file"
                className="form-control w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                required
            />
            </div>

            <div className="flex justify-center">
            <button
                type="submit"
                className="w-full py-3 bg-green-400 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
            >
                Upload Resume
            </button>
            </div>
        </form>
        </div>
    );
};

export default Upload;
