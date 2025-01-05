import React, { useEffect, useState } from "react";
import FileDisplay from "./FileDisplay";
import Navbar from "../nav/Navbar";
import { getFiles, File, allTags } from "../../services/use-file";

const Home = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("All tags");

  useEffect(() => {
    const getAllFiles = async () => {
      const response = await getFiles();
      setFiles(response.data);
      setFilteredFiles(response.data);
    };

    getAllFiles();
  }, []);

  useEffect(() => {
    if (selectedTag === "All tags") {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(files.filter((file) => file.tags.includes(selectedTag)));
    }
  }, [selectedTag, files]);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div>
      <Navbar allTags={allTags} onSelectTag={handleSelectTag} />
      <FileDisplay files={filteredFiles} />
    </div>
  );
};

export default Home;
