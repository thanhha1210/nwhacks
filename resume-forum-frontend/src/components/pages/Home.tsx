// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import FileDisplay from "./FileDisplay";

const Home = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const response = await axios.get("http://localhost:5000/api/files");
      setFiles(response.data.data);
    };

    getFiles();
  }, []);

  return (
    <div>
      <h1>Uploaded Files</h1>
      <FileDisplay files={files} />
    </div>
  );
};

export default Home;
