import { useNavigate } from "react-router"; 

const Navbar = () => {
    const navigate = useNavigate(); 
    const handleUploadClick = () => {
        navigate("/upload"); 
    };

    return (
        <nav className="bg-green-100 p-4">
            <button
                onClick={handleUploadClick}
                className="px-6 py-3 bg-green-400 text-white rounded-lg shadow-lg hover:bg-green-500 transition-colors"
            >
              Upload
            </button>
        </nav>
    );
};

export default Navbar;
