import React from 'react';
import { useNavigate } from 'react-router';

const UploadButton = () => {
    const navigator = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigator('/upload');
    };

    return (
        <div className="relative">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-pink-400 text-white rounded-lg shadow-lg hover:bg-pink-500 transition-colors"
            >
                Upload
            </button>
        </div>
    );
};

export default UploadButton;
