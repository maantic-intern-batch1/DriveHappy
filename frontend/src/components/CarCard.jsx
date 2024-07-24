import { useNavigate } from "react-router-dom"
export default function CarCard({ car, review }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/analysisReview", { state: { id: car.car_id, review: review } });
    }
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0, // Remove decimal places
    }).format(car.price);
    return (
        <>
            <div className="border border-slate-200 rounded-xl p-4 shadow">
                <div className="h-72">
                    <img src={car.image_urls[0]} alt={car.make} className="h-72" />
                </div>
                <div>
                    <div className="flex flex-row justify-between mt-4">
                        <div className="font-bold text-base font-poppins">{car.make} {car.model}</div>
                        <div className="font-bold text-base font-poppins">{formattedPrice}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="text-sm text-gray-500 font-lato">{car.year ? car.year : 'N.A'} | {car.fueltype ? car.fueltype : 'N.A'}</div>

                        <div className="text-sm text-gray-500 font-lato">{car.distance} km</div>
                    </div>
                </div>
                <div>
                    <button onClick={handleClick} className="bg-[#193950] text-white w-full mt-4 py-2 rounded hover:bg-[#2F4C61]">View Details</button>
                </div>
            </div>
        </>
    )
}