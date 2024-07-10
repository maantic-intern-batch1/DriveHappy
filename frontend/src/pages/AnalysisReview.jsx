import { useLocation } from 'react-router-dom';
import Carousal from '../components/Carousal'
import { useState } from 'react';

export default function AnalysisReview() {
    const location = useLocation();
    const { car } = location.state || {};
    console.log(car);
    // State to track the active slide

    return (
        <div className="px-24">
            {
                car ? (
                    <div className="flex flex-row items-center gap-x-32">
                        <Carousal car={car} />
                        <div className="flex flex-col gap-y-4 h-40">
                            <h1 className="font-poppins font-bold text-2xl">{car.year} {car.make} {car.model}</h1>
                            <div className="font-poppins">
                                <p>Price: ₹{car.price}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No car details available</p>
                )}
        </div>
    );
}
