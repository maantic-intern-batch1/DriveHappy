export default function TyreSummary({ car }) {
    let w = [
        { name: "Front Left", value: car.tyre_details.left_front },
        { name: "Front Right", value: car.tyre_details.right_front },
        { name: "Rear Left", value: car.tyre_details.left_rear },
        { name: "Rear Right", value: car.tyre_details.right_rear }
    ]
    return (
        <>
            <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tyre Health Remaining (in %)</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {w.map((val, index) => {
                        return (
                            <>
                                <div className="flex flex-col gap-y-2">
                                    <div className="font-bold">{val.name}</div>
                                    <div>{val.value}</div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    )
}