import React, { useState } from 'react';

function InterestedModal({ isOpen, onClose, onSubmit }) {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ phone, email });
    };

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Interested in this car?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#2F3C7E] text-white rounded hover:bg-[#1F2A5E]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InterestedModal;