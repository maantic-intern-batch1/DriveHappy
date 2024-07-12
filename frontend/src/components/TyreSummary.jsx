import EditButton from "./EditButton";
import { useState } from 'react';

export default function TyreSummary({ car, handleSave, review }) {
    const [edit, setEdit] = useState(false);
    const [tempTyreDetails, setTempTyreDetails] = useState({
        left_front: car.tyre_details.left_front,
        right_front: car.tyre_details.right_front,
        left_rear: car.tyre_details.left_rear,
        right_rear: car.tyre_details.right_rear
    });

    function toggleEdit() {
        setEdit((prev) => !prev);
    }

    function handleInputChange(e, field) {
        const value = e.target.value;
        setTempTyreDetails(prev => ({ ...prev, [field]: value }));
    }

    function save() {
        // Save logic here
        // only updating the tyre_details of car
        let tempCar = { ...car };
        tempCar.tyre_details = tempTyreDetails;
        handleSave(tempCar);
        setEdit(false);
    }

    let w = [
        { name: "Front Left", value: tempTyreDetails.left_front, field: 'left_front' },
        { name: "Front Right", value: tempTyreDetails.right_front, field: 'right_front' },
        { name: "Rear Left", value: tempTyreDetails.left_rear, field: 'left_rear' },
        { name: "Rear Right", value: tempTyreDetails.right_rear, field: 'right_rear' }
    ];

    return (
        <>
            <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tyre Health Remaining (in %)</h3>
                    <EditButton edit={edit} toggleEdit={toggleEdit} handleSave={save} />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {w.map((val, index) => (
                        <div className="flex flex-col gap-y-2" key={index}>
                            <div className="font-bold">{val.name}</div>
                            {edit ? (
                                <input
                                    type="number"
                                    value={val.value}
                                    onChange={(e) => handleInputChange(e, val.field)}
                                />
                            ) : (
                                <div>{val.value}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
