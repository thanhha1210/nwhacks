import React from "react";
import { useNavigate } from "react-router";
import { File } from "../../services/use-file";

interface FileDisplayProps {
  files: File[];
}

const FileDisplay: React.FC<FileDisplayProps> = ({ files }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 p-8">
      {files.length === 0 ? (
        <p className="text-gray-500 text-center">No files uploaded yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div
              key={file._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{file.title}</h3>
              </div>

              {file.tags && file.tags.length > 0 && (
                <div className="mt-2 text-gray-600">
                  {file.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 inline-block bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {file.tags.length > 2 && (
                    <span className="text-gray-500">+ {file.tags.length - 2} more</span>
                  )}
                </div>
              )}

              <div className="mt-4">
                <object
                  data={`http://localhost:8080/uploads/${file.pdf}#page=1`}
                  type="application/pdf"
                  width="100%"
                  height="300px"
                  className="rounded-md overflow-hidden"
                >
                  <p>
                    Your browser does not support PDF viewing. You can{" "}
                    <a
                      href={`http://localhost:8080/uploads/${file.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      download the PDF
                    </a>{" "}
                    to view it.
                  </p>
                </object>
              </div>
              <a
                href={`http://localhost:8080/uploads/${file.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Full PDF
              </a>
              <button
                onClick={() => navigate(`/fileDetails/${file._id}`)}
                className="mt-4 w-full bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-300 focus:outline-none focus:ring focus:ring-pastel-ring"
              >
                See all comments
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDisplay;
