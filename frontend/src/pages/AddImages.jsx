import React, { useState } from 'react';
import CarList from '../components/CarList';
import { useNavigate } from 'react-router-dom';

export default function AddImages() {
    const [fileInputs, setFileInputs] = useState([{ id: 1, file: null }]);
    const navigate = useNavigate();
    const addFileInput = () => {
        setFileInputs(prevFileInputs => [
            ...prevFileInputs,
            { id: prevFileInputs.length + 1, file: null }
        ]);
    };

    const removeFileInput = (id) => {
        setFileInputs(prevFileInputs => prevFileInputs.filter(input => input.id !== id));
    };

    const handleFileChange = (id, file) => {
        setFileInputs(prevFileInputs => prevFileInputs.map(input =>
            input.id === id ? { ...input, file } : input
        ));
    };

    const handleSubmit = async () => {
        if (!window.confirm("Are you sure you want to submit?")) return;
        try {
            const formData = new FormData();
            fileInputs.forEach(input => {
                formData.append('images', input.file);
            });

            // Send the images to the backend
            const response = await fetch('http://localhost:3000/upload-images', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                // navigate('/analysisReview');
            } else {
                alert('There was an error uploading your images. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('There was an error uploading your images. Please try again.');
        }
    };

    return (
        <div className="mt-12 px-24">
            <div>
                <h1 className="font-poppins font-semibold">Add Car Images</h1>
            </div>
            <div className="mt-4">
                <form className="flex flex-wrap gap-x-6">
                    {fileInputs.map(input => (
                        <div key={input.id} className="mt-4 flex items-center">
                            <input
                                type="file"
                                name={`file-input-${input.id}`}
                                id={`file-input-${input.id}`}
                                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                onChange={(e) => handleFileChange(input.id, e.target.files[0])}
                            />
                            <button
                                type="button"
                                onClick={() => removeFileInput(input.id)}
                                className="ml-2 px-2 py-1 bg-red-500/90 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </form>
                <div className="flex flex-start gap-x-4">
                    <button
                        type="button"
                        onClick={addFileInput}
                        className="mt-4 px-4 py-2 bg-[#193950] text-white rounded-lg hover:bg-[#2F4C61] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add More Images
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 px-4 py-2 bg-[#193950] text-white rounded-lg hover:bg-[#2F4C61] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit for Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}