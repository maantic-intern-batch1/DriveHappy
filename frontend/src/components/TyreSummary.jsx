import { useSelector, useDispatch } from 'react-redux';
import { updateCarDetails } from '../redux/slices/carSlice';

export default function TyreSummary() {
    const dispatch = useDispatch();
    const { details: carDetails, isEditing } = useSelector(state => state.car);

    function handleInputChange(e, field) {
        const value = e.target.value;
        dispatch(updateCarDetails({
            tyre_details: {
                ...carDetails.tyre_details,
                [field]: value
            }
        }));
    }

    const tyreLabels = {
        left_front: "Front Left",
        right_front: "Front Right",
        left_rear: "Rear Left",
        right_rear: "Rear Right"
    };

    const tyreOrder = ['left_front', 'right_front', 'left_rear', 'right_rear'];

    return (
        <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tyre Health Remaining (in %)</h3>
            <div className="grid grid-cols-2 gap-4">
                {tyreOrder.map((key) => (
                    <div key={key} className="bg-white p-4 rounded-lg shadow">
                        <div className="font-bold text-gray-700">{tyreLabels[key]}</div>
                        {isEditing ? (
                            <input
                                type="number"
                                value={carDetails.tyre_details[key]}
                                onChange={(e) => handleInputChange(e, key)}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        ) : (
                            <div className="mt-2 text-2xl font-semibold text-gray-900">
                                {carDetails.tyre_details[key]}%
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}