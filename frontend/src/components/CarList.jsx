import CarCard from "./CarCard"
import { useState, useEffect } from 'react';
import Loader from './Loading';

export default function CarList({ reviewer, make, fuel, price }) {
    const [carData, setCarData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCarData() {
            try {
                setLoading(true);
                setError(null);
                let url = new URL(import.meta.env.VITE_BACKEND + '/fetchData');

                if (make !== 'any') url.searchParams.append('make', make);
                if (fuel !== 'any') url.searchParams.append('fuel', fuel);
                if (price !== 'any') url.searchParams.append('price', price);

                const response = await fetch(url);
                if (response.ok) {
                    const jsonData = await response.json();
                    if (jsonData.success) {
                        setCarData(jsonData.data);
                    } else {
                        setError(jsonData.error || 'Failed to fetch car data');
                    }
                } else {
                    setError('Error fetching data. Please try again later.');
                }
            } catch (err) {
                console.error(err);
                setError('An unexpected error occurred! Please try again later');
            } finally {
                setLoading(false);
            }
        }
        fetchCarData();
    }, [make, fuel, price])

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