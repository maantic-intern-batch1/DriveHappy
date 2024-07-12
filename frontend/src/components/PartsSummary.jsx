import EditButton from "./EditButton";
import { useState } from "react";

export default function PartsSummary({ car, handleSave, review }) {
    const [edit, setEdit] = useState(false);
    const [tempParts, setTempParts] = useState({
        repainted_parts: car.repainted_parts,
        perfect_parts: car.perfect_parts,
    });

    function toggleEdit() {
        setEdit((prev) => !prev);
    }

    function handleInputChange(e, field) {
        const value = e.target.value;
        setTempParts(prev => ({ ...prev, [field]: value }));
    }

    function save() {
        let tempCar = { ...car };
        tempCar.repainted_parts = tempParts.repainted_parts;
        tempCar.perfect_parts = tempParts.perfect_parts;
        handleSave(tempCar);
        setEdit(false);
    }

    return (
        <>
            <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Parts Summary</h3>
                    <EditButton edit={edit} toggleEdit={toggleEdit} handleSave={save} />
                </div>
                <div className="flex flex-col gap-y-6">
                    <div>
                        <div className="font-bold">Repainted Parts</div>
                        {edit ? (
                            <input
                                type="text"
                                value={tempParts.repainted_parts}
                                onChange={(e) => handleInputChange(e, 'repainted_parts')}
                            />
                        ) : (
                            <div>{tempParts.repainted_parts}</div>
                        )}
                    </div>
                    <div>
                        <div className="font-bold">Perfect Parts</div>
                        {edit ? (
                            <input
                                type="text"
                                value={tempParts.perfect_parts}
                                onChange={(e) => handleInputChange(e, 'perfect_parts')}
                            />
                        ) : (
                            <div>{tempParts.perfect_parts}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
