// src/components/FileDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {File} from "../../services/use-file"

const FileDetails: React.FC = () => {
  const { fileId } = useParams(); // Get fileId from the URL params
  const [file, setFile] = useState<File | null>(null); // Store file and comments
  const [newComment, setNewComment] = useState(""); // Store the new comment
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch file details and comments based on fileId
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(`/api/files/${fileId}`);
        setFile(response.data.data); // Set file and comments
        setLoading(false);
      } catch (error) {
        console.error("Error fetching file details:", error);
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Don't allow empty comments

    try {
      const response = await axios.put(`/api/files/${fileId}/comment`, { comment: newComment });
      setFile(response.data.data); // Update file with new comment
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!file) {
    return <p>File not found.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-gray-800">{file.title}</h2>
      <object
        data={`http://localhost:5000/uploads/${file.pdf}#page=1`}
        type="application/pdf"
        width="100%"
        height="500px"
        className="rounded-md overflow-hidden mt-4"
      >
        <p>Your browser does not support PDF viewing. You can <a href={`http://localhost:5000/uploads/${file.pdf}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">download the PDF</a> to view it.</p>
      </object>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">Tags:</h3>
        <div className="mt-2 text-gray-600">
          {file.tags.map((tag, index) => (
            <span key={index} className="mr-2 inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">Comments:</h3>
        {file.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="mt-2 text-gray-600">
            {file.comments.map((comment, index) => (
              <li key={index} className="border-b py-2">{comment}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Comment */}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add a comment"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default FileDetails;
