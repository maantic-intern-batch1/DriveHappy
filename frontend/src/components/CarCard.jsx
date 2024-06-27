export default function CarCard({ car }) {
    return (
        <>
            <div className="border border-slate-200 rounded-xl p-4 shadow">
                <div className="">
                    <img src={car.url} alt={car.make} />
                </div>
                <div>
                    <div className="flex flex-row justify-between mt-4">
                        <div className="font-bold text-base font-poppins">{car.make} {car.model}</div>
                        <div className="font-bold text-base font-poppins">₹{car.price}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="text-sm text-gray-500 font-lato">{car.year} | {car.fuel}</div>
                        <div className="text-sm text-gray-500 font-lato">{car.km} km</div>
                    </div>
                </div>
                <div>
                    <button className="bg-[#193950] text-white w-full mt-4 py-2 rounded hover:bg-[#2F4C61]">View Details</button>
                </div>
            </div>
        </>
    )
}