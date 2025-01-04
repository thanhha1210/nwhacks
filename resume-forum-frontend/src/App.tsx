// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Upload from "./components/upload/Upload";
import Home from "./components/pages/Home";

const App = () => {
  return (
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
      </Router>
  );
};

export default App;
