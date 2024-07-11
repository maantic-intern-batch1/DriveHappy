export default function PartsSummary({ car }) {
    return (
        <>
            <div className="mt-2 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Parts Summary</h3>
                <div className="flex flex-col gap-y-6">
                    <div>
                        <div className="font-bold">Repainted Parts</div>
                        <div>
                            {car.repainted_parts}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Perfect Parts</div>
                        <div>{car.perfect_parts}</div>
                    </div>
                </div>
            </div>
        </>
    )
}