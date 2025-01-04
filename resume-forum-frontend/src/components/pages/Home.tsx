// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import FileDisplay from "./FileDisplay";
import Navbar from "../nav/Navbar";
import { getFiles, File } from "../../services/use-file";

const Home = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const getAllFiles = async () => {
      const response = await getFiles();
      setFiles(response.data);
    };

    getAllFiles();
  }, []);

  return (
    <div>
      <Navbar />
      <FileDisplay files={files} />
    </div>
  );
};

export default Home;
