import { useState } from 'react';
import EditButton from './EditButton';

export default function ImperfectionSummary({ car, handleSave, review }) {
    const [tab, setTab] = useState(0); // 0 for Exterior, 1 for Interior
    const [edit, setEdit] = useState(false);
    const [tempImperfections, setTempImperfections] = useState(car.imperfections);

    function toggleEdit() {
        setEdit((prev) => !prev);
    }

    function handleInputChange(e, index, field) {
        const value = e.target.value;
        setTempImperfections(prevImperfections =>
            prevImperfections.map((imperfection, i) =>
                i === index ? { ...imperfection, [field]: value } : imperfection
            )
        );
    }

    function parseString(str) {
        let spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
        let result = spacedStr.split(' Imperfection')[0];
        return result;
    }

    function save() {
        setEdit(false);
        // changing only the imperfections field in the CarDetails Object
        let tempCar = { ...car };
        tempCar.imperfections = tempImperfections;
        handleSave(tempCar);
    }

    return (
        <>
            <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Imperfections Summary</h3>
                    <EditButton edit={edit} toggleEdit={toggleEdit} handleSave={save} />
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        {['Exterior', 'Interior'].map((val, index) => (
                            <li key={index} className="me-2">
                                <button
                                    onClick={() => setTab(index)}
                                    className={`${index === tab
                                        ? 'border-[#193950] text-white'
                                        : ''
                                        } inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 font-bold hover:border-gray-300 dark:hover:text-gray-300 group font-poppins`}
                                >
                                    {val}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {tempImperfections.map((val, index) => {
                        let location = parseString(val.location);
                        return (
                            <>
                                {tab === 0 && index < 22 && (
                                    <div className="flex flex-col gap-y-2" key={index}>
                                        <div className="font-bold">{location}</div>
                                        {edit ? (
                                            <input
                                                type="text"
                                                value={val.description}
                                                onChange={(e) => handleInputChange(e, index, 'description')}
                                            />
                                        ) : (
                                            <div>{val.description}</div>
                                        )}
                                    </div>
                                )}
                                {tab === 1 && index >= 22 && (
                                    <div className="flex flex-col gap-y-2" key={index}>
                                        <div className="font-bold">{location}</div>
                                        {edit ? (
                                            <input
                                                type="text"
                                                value={val.description}
                                                onChange={(e) => handleInputChange(e, index, 'description')}
                                            />
                                        ) : (
                                            <div>{val.description}</div>
                                        )}
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
