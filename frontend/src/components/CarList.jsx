import CarCard from "./CarCard"
import { useState, useEffect } from 'react';
import Loader from './Loading';
export default function CarList({ reviewer }) {
    const [carData, setCarData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchCarData() {
            try {
                setLoading(true);
                const url = import.meta.env.VITE_BACKEND + '/fetchData';
                const response = await fetch(url);
                if (response.status === 200) {
                    const jsonData = await response.json();
                    const carDataFromDB = jsonData.data;
                    setCarData(carDataFromDB);
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
        fetchCarData();
    }, [])
    return (
        <>
            {loading && <Loader />}
            {error == null && <div className="w-full mb-40">
                <div className="px-24">
                    {reviewer == false && <div className="flex flex-row justify-center mt-6">
                        <h1 className="text-2xl font-bold">Browse through our collection of affordable cars</h1>
                    </div>}
                    <div className="grid grid-cols-3 gap-x-3 gap-y-5 mt-4">
                        {
                            carData.map((car, index) => {
                                return <CarCard car={car} key={index} />
                            })
                        }
                    </div>
                </div>
            </div>}
            {
                error && <div>{error}</div>
            }
        </>
    )
}