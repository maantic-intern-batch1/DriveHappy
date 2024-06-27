import React, { useState } from 'react';
import CarList from '../components/CarList';
import { NavLink } from 'react-router-dom';

export default function AddImages() {
    const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

    const addFileInput = () => {
        setFileInputs([...fileInputs, { id: fileInputs.length + 1 }]);
    };

    const removeFileInput = (id) => {
        setFileInputs(fileInputs.filter(input => input.id !== id));
    };

    return (
        <>
            <div className="mt-12 px-24">
                <div>
                    <h1 className="font-poppins font-semibold">Add Car Images</h1>
                </div>
                <div className="mt-4">
                    <form className="flex flex-wrap gap-x-6">
                        {fileInputs.map((input, index) => (
                            <div key={input.id} className="mt-4 flex items-center">
                                <input
                                    type="file"
                                    name={`file-input-${input.id}`}
                                    id={`file-input-${input.id}`}
                                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
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
                    <button
                        type="button"
                        onClick={addFileInput}
                        className="mt-4 px-4 py-2 bg-[#193950] text-white rounded-lg hover:bg-[#2F4C61] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add More Images
                    </button>
                </div>
            </div>
        </>
    );
}
