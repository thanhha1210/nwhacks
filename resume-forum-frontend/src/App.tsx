// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Upload from "./components/upload/Upload";
import Home from "./components/pages/Home";
import FileDetails from "./components/details/FileDetails";

const App = () => {
  return (
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/fileDetails/:fileId" element={<FileDetails />} />
            </Routes>
      </Router>
  );
};

export default App;
