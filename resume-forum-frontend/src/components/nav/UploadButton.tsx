import React, { useState } from 'react';
import Upload from '../pages/Upload';

const UploadButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-pink-400 text-white rounded-lg shadow-lg hover:bg-pink-500 transition-colors"
      >
        Upload
      </button>

      {/* Conditionally render centered "Upload" form */}
      {isClicked && <Upload />}
    </div>
  );
};

export default UploadButton;
