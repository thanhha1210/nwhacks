import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getFileById, addComment, File } from "../../services/use-file";

const FileDetails: React.FC = () => {
  const { fileId } = useParams();
  const navigate = useNavigate(); // Hook to navigate between routes
  const [file, setFile] = useState<File | null>(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        if (!fileId) {
          throw new Error("File ID is missing");
        }
        const fileData = await getFileById(fileId);
        setFile(fileData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching file details:", error);
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      if (!fileId) {
        throw new Error("File ID is missing");
      }

      await addComment(fileId, newComment);

      setFile((prevFile) => {
        if (!prevFile) return null;
        return {
          ...prevFile,
          comments: [...prevFile.comments, newComment],
        };
      });

      setNewComment("");
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
    <>
      <nav className="bg-green-100 p-4">
          <button
            onClick={_ => navigate("/")}
            className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Home
          </button>
      </nav>
      <div className="container mx-auto p-8 bg-green-50 ">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mt-4">{file.title}</h2>
        <object
          data={`https://nwhacks.onrender.com/uploads/${file.pdf}`}
          type="application/pdf"
          width="60%"
          height="500px"
          className="rounded-md overflow-hidden mt-4 text-center mx-auto my-4"
        >
          <p>
            Your browser does not support PDF viewing. You can{" "}
            <a
              href={`https://nwhacks.onrender.com/uploads/${file.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              download the PDF
            </a>{" "}
            to view it.
          </p>
        </object>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">Tags:</h3>
          <div className="mt-2 text-gray-600">
            {file.tags.map((tag, index) => (
              <span
                key={index}
                className="mr-2 inline-block bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
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
                <li key={index} className="border-b py-2">
                  {comment}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Add a comment"
            required
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default FileDetails;
