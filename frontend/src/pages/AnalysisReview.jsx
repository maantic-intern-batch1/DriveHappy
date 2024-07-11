import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from "../components/Loading";
import Carousal from '../components/Carousal'
export default function AnalysisReview() {
    const location = useLocation();
    const { id, review } = location.state || {};
    console.log("id: ", id);
    const [loading, setLoading] = useState(false);
    const [carDetails, setCarDetails] = useState();
    useEffect(() => {
        async function fetchCarDetails() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/fetchData/${id}`);
                if (response.status === 200) {
                    const jsonData = await response.json();
                    const carDataFromDB = jsonData.data;
                    setCarDetails(carDataFromDB);
                }
                else {
                    setError('Error 500, Please refresh the page or try again later.')
                }
            }
            catch (err) {
                console.log(err);
                setError('An unexpected error occurred ! Please try again later');
            }
            finally {
                setLoading(false);
            }
        }
        fetchCarDetails();
    }, [])
    return (
        <>
            {loading && <Loader />}
            <div className="px-24">
                {
                    carDetails ? (
                        <div className="flex flex-row gap-x-32">
                            <Carousal car={carDetails} />
                            <div className="flex flex-col gap-y-4 h-40 shadow-lg shadow-indigo-500/40 mt-10 p-10">
                                <div className="flex flex-row">
                                    <label htmlFor="make" className="w-40">Manufactuer Name : </label>
                                    <input type="text" value={carDetails.make} id="make" className="" />
                                </div>
                                <div>
                                    <label htmlFor="model" className="w-40">Model Name : </label>
                                    <input type="text" value={carDetails.model} id="model" className={`border p-2 focus:outline-none focus:ring-0 ${!review ? 'bg-gray-100 read-only:bg-gray-100 disabled:opacity-75' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No car details available</p>
                    )
                }
            </div>
        </>
    );
}
