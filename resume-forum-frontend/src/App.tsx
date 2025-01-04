// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Upload from "./components/pages/Upload";
import Navbar from "./components/nav/Navbar";
import Home from "./components/pages/Home";

const App = () => {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
          </Routes>
      </Router>
  );
};

export default App;
