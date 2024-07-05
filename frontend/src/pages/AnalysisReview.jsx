import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function AnalysisReview() {
    const location = useLocation();
    const { car } = location.state || {};

    // State to track the active slide
    const [activeSlide, setActiveSlide] = useState(0);

    const handlePrev = () => {
        setActiveSlide((prev) => (prev === 0 ? 4 : prev - 1));
    };

    const handleNext = () => {
        setActiveSlide((prev) => (prev === 4 ? 0 : prev + 1));
    };

    return (
        <div className="px-24">
            {
                car ? (
                    <div className="flex flex-row items-center gap-x-32">
                        <div id="default-carousel" className="relative w-[400px]" data-carousel="slide">
                            {/* Carousel wrapper */}
                            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                {Object.keys(car).filter(key => key.startsWith('url')).map((key, index) => (
                                    <div
                                        key={index}
                                        className={`duration-700 ease-in-out ${index === activeSlide ? '' : 'hidden'}`}
                                        data-carousel-item
                                    >
                                        <img
                                            src={car[key]}
                                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                            alt={`${car.make} ${car.model} - ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Slider indicators */}
                            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                {Object.keys(car).filter(key => key.startsWith('url')).map((key, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-gray-300'}`}
                                        aria-current={index === activeSlide}
                                        aria-label={`Slide ${index + 1}`}
                                        data-carousel-slide-to={index}
                                        onClick={() => setActiveSlide(index)}
                                    ></button>
                                ))}
                            </div>

                            {/* Slider controls */}
                            <button
                                type="button"
                                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-prev
                                onClick={handlePrev}
                            >
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg
                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 1 1 5l4 4"
                                        />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-next
                                onClick={handleNext}
                            >
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg
                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-y-4 h-40">
                            <h1 className="font-poppins font-bold text-2xl">{car.year} {car.make} {car.model} {car.fuel}</h1>
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
