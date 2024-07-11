import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from "../components/Loading";
import Carousal from '../components/Carousal'
import TyreSummary from '../components/TyreSummary';
import ImperfectionSummary from '../components/ImperfectionSummary';
import PartsSummary from '../components/PartsSummary';
export default function AnalysisReview() {
    const location = useLocation();
    const w = ['Imperfections', 'Tyres', 'Parts Summary']
    const { id, review } = location.state || {};
    console.log("id: ", id);
    const [loading, setLoading] = useState(false);
    const [carDetails, setCarDetails] = useState();
    const [selected, setSelected] = useState(0);
    function handleTabSelect(val) {
        setSelected(val);
    }
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
            {!loading && <div className="px-24">
                {
                    carDetails ? (
                        <>
                            <div className="flex flex-row gap-x-20">
                                <div className="w-1/2">

                                    <Carousal car={carDetails} />
                                </div>
                                <div className="mt-10 p-6 mb-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-1/2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{carDetails.make} {carDetails.model}</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <div className="font-bold">Price</div>
                                            <div>₹ {carDetails.price}</div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Year</div>
                                            <div>
                                                {carDetails.year ? carDetails.year : 'Not Available'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Distance</div>
                                            <div>{carDetails.distance} km</div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Car Condition</div>
                                            <div>{carDetails.carcondition}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 border-b border-gray-200 dark:border-gray-700">
                                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    {
                                        w.map((val, index) => {
                                            return <li class="me-2">
                                                <button onClick={() => handleTabSelect(index)} class={`${index == selected ? 'border-[#193950] text-[#193950]' : ''} inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 font-bold hover:border-gray-300 dark:hover:text-gray-300 group font-poppins`}>
                                                    {val}
                                                </button>
                                            </li>
                                        })
                                    }
                                </ul>

                            </div>
                            {
                                selected === 0 ? <ImperfectionSummary car={carDetails} review={review} /> : selected === 1 ? <TyreSummary car={carDetails} review={review} /> : <PartsSummary car={carDetails} review={review} />
                            }
                        </>

                    ) : (
                        <p>No car details available</p>
                    )
                }
            </div>}
        </>
    );
}
