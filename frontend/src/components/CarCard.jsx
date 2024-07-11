import { useNavigate } from "react-router-dom"
export default function CarCard({ car }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/analysisReview", { state: { id: car.car_id, review: false } });
    }
    return (
        <>
            <div className="border border-slate-200 rounded-xl p-4 shadow">
                <div className="">
                    <img src={car.image_urls[0]} alt={car.make} />
                </div>
                <div>
                    <div className="flex flex-row justify-between mt-4">
                        <div className="font-bold text-base font-poppins">{car.make} {car.model}</div>
                        <div className="font-bold text-base font-poppins">₹{car.price}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="text-sm text-gray-500 font-lato">{car.year ? car.year : 'N.A'}</div>

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