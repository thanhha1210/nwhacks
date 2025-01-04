import axios from "axios";

export interface File {
    _id: string;
    title: string;
    pdf: string;
    tags: string[];
    comments: string[]; 
}
const BASE_URL = "http://localhost:8080/api/files"

const uploadFile = async (formData: FormData) => {
    const response = await axios.post(BASE_URL + "/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const getFiles = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

const getFileById = async (fileId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${fileId}`);
        return response.data;
    } 
    catch (error) {
        console.error("Error fetching file:", error);
    }
  };

const addComment = async (fileId: string, comment: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/${fileId}/comment`, { comment }); 
        return response.data;
    } 
    catch (error) {
        console.error("Error adding comment:", error); 
    }
};

export { uploadFile, getFiles, getFileById, addComment };