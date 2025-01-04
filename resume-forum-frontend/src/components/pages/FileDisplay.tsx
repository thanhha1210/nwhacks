// src/components/FileDisplay.tsx

import React from "react";

interface File {
  _id: string;
  title: string;
  pdf: string;
}

interface FileDisplayProps {
  files: File[];
}

const FileDisplay: React.FC<FileDisplayProps> = ({ files }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
        {files.length === 0 ? 
            (<p>No files uploaded yet.</p>) 
            : 
            (files.map((file) => (
            <div
                key={file._id}
                className="max-w-xs bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
                <h3 className="text-xl font-semibold text-gray-800">{file.title}</h3>
                <a
                    href={`http://localhost:5000/uploads/${file.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 block"
                >
                View PDF
                </a>
            </div>
            )))
        }
    </div>
  );
};

export default FileDisplay;
