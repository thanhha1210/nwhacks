import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import { uploadFile, allJobTags } from "../../services/use-file";

interface Data {
    title: string;
    file: File | null;
    tags: string[];
    comments: string[];
}
const Upload = () => {
    const [data, setData] = useState<Data>({title: "", file: null, tags: [], comments: []});
 
    const [inputTag, setInputTag] = useState(""); 
    const [suggestions, setSuggestions] = useState<string[]>([]); 
    const navigate = useNavigate(); 

    // Predefined set of tags
    const availableTags = allJobTags;

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!data.file || !data.tags || !data.title.trim()) {
            alert("Please enter all the fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("file", data.file);
        formData.append("tags", data.tags.join(", ")); 
        formData.append("comments", JSON.stringify(data.comments));

        try {
            await uploadFile(formData);
            alert("File uploaded successfully");
            navigate("/home"); 
        } 
        catch (error) {
            alert("Failed to upload file");
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputTag(value);
        const filteredSuggestions = availableTags.filter(tag => 
            tag.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // Add selected tag to the tags list
    const handleTagSelect = (tag: string) => {
        if (!data.tags.includes(tag) && availableTags.includes(tag)) {
            setData({...data, tags: [...data.tags, tag]});
        }
        setInputTag(""); 
        setSuggestions([]);
    };

    // Remove tag from the tags list
    const handleTagRemove = (tag: string) => {
        setData({...data, tags: data.tags.filter(t => t != tag)});
    };

    return (
        <>  
            <nav className="bg-green-100 p-4">
                <button
                        onClick={e => navigate("/home")}
                        className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Back
                    </button>
            </nav>
        
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <form
                    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center">Upload Your Resume</h2>

                    {/* Resume Title Input */}
                    <div>
                        <input
                            type="text"
                            className="form-control w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                            placeholder="Enter your resume title"
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})}
                            required
                        />
                    </div>

                    {/* Tag Input */}
                    <div>
                        <input
                            type="text"
                            className="form-control w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                            placeholder="Enter job tags (e.g. Software Engineer)"
                            value={inputTag}
                            onChange={handleTagInputChange}
                        />
                        {suggestions.length > 0 && inputTag && (
                            <ul className="bg-white border mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-green-200"
                                        onClick={() => handleTagSelect(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-2">
                            <p>Selected Tags: </p>
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-blue-800 px-4 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleTagRemove(tag)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* File Upload Input */}
                    <div>
                        <input
                            type="file"
                            className="form-control w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                            accept="application/pdf"
                            onChange={(e) => setData({...data, file: e.target.files ? e.target.files[0] : null})}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-400 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                        >
                            Upload Resume
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Upload;
