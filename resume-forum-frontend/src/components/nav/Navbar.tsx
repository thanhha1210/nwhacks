import { useNavigate } from "react-router";
import DropDown from "./DropDown";

interface Props {
  allTags: string[];
  onSelectTag: (tag: string) => void;
}

const Navbar = ({ allTags, onSelectTag }: Props) => {
  const navigate = useNavigate();
  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <nav className="bg-green-100 px-8 py-4 flex justify-between items-center">
      <DropDown allTags={allTags} onSelectTag={onSelectTag} />
      <button
        onClick={handleUploadClick}
        className="px-6 py-1.5 bg-green-400 text-white rounded-lg shadow-lg hover:bg-green-500 transition-colors"
      >
        Upload
      </button>
    </nav>
  );
};

export default Navbar;
