import axios from "axios";

export interface File {
    _id: string;
    title: string;
    pdf: string;
    tags: string[];
    comments: string[]; 
}
const BASE_URL = "https://nwhacks.onrender.com";

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

const allJobTags = [
    "Software Engineer", "Data Scientist", "Machine Learning", "Frontend Developer",
    "Backend Developer", "Full Stack Developer", "Product Manager", "UI/UX Designer", 
    "DevOps", "AI Specialist", "Database Administrator", "Project Manager", 
    "Web Developer", "Mobile Developer", "Cloud Engineer", "Cybersecurity Analyst", 
    "Business Analyst", "Quality Assurance", "Game Developer", "Blockchain Developer", 
    "Systems Architect", "Network Engineer", "IT Consultant", "HR Specialist", 
    "SEO Expert", "Marketing Specialist", "Content Writer", "Graphic Designer", 
    "Database Analyst", "Cloud Architect", "Data Analyst"
];
const allTags = ["All tags", ... allJobTags]; 

export { uploadFile, getFiles, getFileById, addComment, allJobTags, allTags };