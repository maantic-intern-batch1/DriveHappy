import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCarDetails, updateCarDetails, setIsEditing } from '../redux/slices/carSlice';
import Loader from "../components/Loading";
import Carousal from '../components/Carousal';
import TyreSummary from '../components/TyreSummary';
import ImperfectionSummary from '../components/ImperfectionSummary';
import PartsSummary from '../components/PartsSummary';
import EditButton from '../components/EditButton';

export default function AnalysisReview() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { details: carDetails, isEditing } = useSelector(state => state.car);
    const w = ['Imperfections', 'Tyres'];
    const { id } = location.state || {};
    const { review } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(0);
    const [error, setError] = useState('');
    function formatIndianPrice(price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0, // Remove decimal places
        }).format(price);
    }
    useEffect(() => {
        console.log("Location state:", location.state);
        console.log("Review value:", review);
    }, [location.state, review]);
    function formatDistance(distanceKm) {
        return distanceKm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(() => {
        async function fetchCarDetails() {
            try {
                setLoading(true);
                let url = import.meta.env.VITE_BACKEND + `/fetchData/${id}`;
                const response = await fetch(url);
                if (response.status === 200) {
                    const jsonData = await response.json();
                    dispatch(setCarDetails(jsonData.data));
                } else {
                    throw new Error('Error 500, Please refresh the page or try again later.')
                }
            } catch (err) {
                console.error(err);
                setError('An unexpected error occurred! Please try again later');
            } finally {
                setLoading(false);
            }
        }
        fetchCarDetails();
    }, [id, dispatch]);

    async function handleSave() {
        try {
            setLoading(true);
            let url = import.meta.env.VITE_BACKEND + `/uploadData/update/${id}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carDetails)
            });
            if (response.status !== 200) {
                throw new Error("Failed to update car details");
            }
            dispatch(setIsEditing(false));
        } catch (err) {
            console.error(err);
            setError('Failed to update car details. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function handleInputChange(e, field) {
        dispatch(updateCarDetails({ [field]: e.target.value }));
    }

    function handleTabSelect(val) {
        setSelected(val);
    }

    if (loading) return <Loader />;
    if (error) return <div className="px-24">{error}</div>;
    if (!carDetails) return <div className="px-24">No car details available</div>;

    return (
        <div className="px-24">
            <div className="flex flex-row gap-x-20">
                <div className="w-1/2">
                    <Carousal car={carDetails} />
                </div>
                <div className="mt-10 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-1/2">
                    <div className="flex flex-row justify-between mb-4">
                        {isEditing ? (<>
                            <input
                                className="text-black font-normal"
                                type="text"
                                value={carDetails.make}
                                placeholder="Make name"
                                onChange={(e) => handleInputChange(e, 'make')}
                            />
                            <input
                                className="text-black font-normal"
                                type="text"
                                value={carDetails.model}
                                placeholder="Model name"
                                onChange={(e) => handleInputChange(e, 'model')}
                            />
                        </>) : <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {carDetails.make} {carDetails.model}
                        </h3>}
                        {review == true && <EditButton isEditing={isEditing} toggleEdit={() => dispatch(setIsEditing(!isEditing))} handleSave={handleSave} />}
                    </div>
                    <div className="grid grid-cols-3 gap-y-4 gap-x-6">
                        <div>
                            <div className="font-bold">Price</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="number"
                                    value={carDetails.price}
                                    onChange={(e) => handleInputChange(e, 'price')}
                                />
                            ) : (
                                <div>{formatIndianPrice(carDetails.price)}</div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Fuel Type</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="text"
                                    value={carDetails.fueltype}
                                    onChange={(e) => handleInputChange(e, 'fueltype')}
                                />
                            ) : (
                                <div>{carDetails.fueltype || 'Not Available'}</div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Year</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="number"
                                    value={carDetails.year}
                                    onChange={(e) => handleInputChange(e, 'year')}
                                />
                            ) : (
                                <div>{carDetails.year || 'Not Available'}</div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Distance</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="number"
                                    value={carDetails.distance}
                                    onChange={(e) => handleInputChange(e, 'distance')}
                                />
                            ) : (
                                <div>{formatDistance(carDetails.distance)} km</div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Car Condition</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="text"
                                    value={carDetails.carcondition}
                                    onChange={(e) => handleInputChange(e, 'carcondition')}
                                />
                            ) : (
                                <div>{carDetails.carcondition}</div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Repainted Parts</div>
                            {isEditing ? (
                                <textarea
                                    className="text-black font-normal pl-1 w-full resize-none overflow-y-auto"
                                    value={carDetails.repainted_parts}
                                    onChange={(e) => handleInputChange(e, 'repainted_parts')}
                                    rows="2"  // Adjust this value to set the initial visible height
                                    style={{ maxHeight: '100px' }}  // Adjust this value to set the maximum height
                                />
                            ) : (
                                <div
                                    className="overflow-y-auto max-h-[100px] rounded p-2 "
                                    style={{
                                        backgroundColor: '#1F2937',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#4B5563 #1F2937'
                                    }}
                                >
                                    {carDetails.repainted_parts}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Perfect Parts</div>
                            {isEditing ? (
                                <textarea
                                    className="text-black font-normal pl-1 w-full resize-none overflow-y-auto"
                                    value={carDetails.perfect_parts}
                                    onChange={(e) => handleInputChange(e, 'perfect_parts')}
                                    rows="2"  // Adjust this value to set the initial visible height
                                    style={{ maxHeight: '100px' }}  // Adjust this value to set the maximum height
                                />
                            ) : (
                                <div
                                    className="overflow-y-auto max-h-[100px] rounded p-2 "
                                    style={{
                                        backgroundColor: '#1F2937',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#4B5563 #1F2937'
                                    }}
                                >
                                    {carDetails.perfect_parts}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="font-bold">Repair Cost</div>
                            {isEditing ? (
                                <input
                                    className="text-black font-normal pl-1"
                                    type="text"
                                    value={carDetails.repair_cost}
                                    onChange={(e) => handleInputChange(e, 'repair_cost')}
                                />
                            ) : (
                                <div>{formatIndianPrice(carDetails.repair_cost)}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {w.map((val, index) => (
                        <li className="me-2" key={index}>
                            <button
                                onClick={() => handleTabSelect(index)}
                                className={`${index === selected ? 'border-[#193950] text-[#193950]' : ''} inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 font-bold hover:border-gray-300 dark:hover:text-gray-300 group font-poppins`}
                            >
                                {val}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {selected === 0 && <ImperfectionSummary />}
            {selected === 1 && <TyreSummary />}
            {/* {selected === 2 && <PartsSummary />} */}
        </div>
    );
}