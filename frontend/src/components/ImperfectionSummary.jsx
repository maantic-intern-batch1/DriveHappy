import { useSelector, useDispatch } from 'react-redux';
import { updateCarDetails } from '../redux/slices/carSlice';
import { useState } from 'react'
export default function ImperfectionSummary() {
    // return <>Imperfection</>
    const dispatch = useDispatch();
    const { details: carDetails, isEditing } = useSelector(state => state.car);
    const [tab, setTab] = useState(0); // 0 for Exterior, 1 for Interior

    function handleInputChange(e, index, field) {
        const value = e.target.value;
        const updatedImperfections = carDetails.imperfections.map((imperfection, i) =>
            i === index ? { ...imperfection, [field]: value } : imperfection
        );
        dispatch(updateCarDetails({ imperfections: updatedImperfections }));
    }

    function parseString(str) {
        let spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
        let result = spacedStr.split(' Imperfection')[0];
        return result;
    }

    return (
        <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Imperfections Summary</h3>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {['Exterior', 'Interior'].map((val, index) => (
                        <li key={index} className="me-2">
                            <button
                                onClick={() => setTab(index)}
                                className={`${index === tab ? 'border-[#193950] text-white' : ''} inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 font-bold hover:border-gray-300 dark:hover:text-gray-300 group font-poppins`}
                            >
                                {val}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {carDetails.imperfections.map((val, index) => {
                    let location = parseString(val.location);
                    if ((tab === 0 && index < 22) || (tab === 1 && index >= 22)) {
                        return (
                            <div className="flex flex-col gap-y-2" key={index}>
                                <div className="font-bold">{location}</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={val.description}
                                        onChange={(e) => handleInputChange(e, index, 'description')}
                                    />
                                ) : (
                                    <div>{val.description}</div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}