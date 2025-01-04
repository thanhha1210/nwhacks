// src/services/apiService.ts

import axios from "axios";

const uploadFile = async (formData: FormData) => {
    const response = await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const getFiles = async () => {
    const response = await axios.get("http://localhost:5000/api/files");
    return response.data;
};

export { uploadFile, getFiles };
