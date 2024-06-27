import { useState } from "react";
import Car2 from "../assets/car4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import CarList from "../components/CarList";
export default function HomePage() {
    const [make, setMake] = useState('');
    const [fuel, setFuel] = useState('');
    const [price, setPrice] = useState('');
    const [drop1, setDrop1] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [drop3, setDrop3] = useState(false);
    function handleDrop(num) {
        if (num == 1)
            setDrop1((prev) => !prev)
        else if (num == 2)
            setDrop2((prev) => !prev)
        else
            setDrop3((prev) => !prev)
    }
    return (
        <>
            <div className="w-full">
                <div className="pt-5 px-24 w-full">
                    <div
                        className="h-[445px] bg-bottom bg-cover bg-no-repeat relative after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-[#0000009a]"
                        style={{ backgroundImage: `url(${Car2})` }}
                    >
                    </div>
                    <div className="absolute top-1/3 left-1/4 transform -translate-x-1/4 -translate-y-1/4 text-white font-lato">
                        <div>

                            <h1 className="text-3xl "><span className="font-bold">Find</span> your next match. </h1>
                            <p>Dream Cars, Real Prices. Drive home your perfect ride today. </p>
                        </div>
                        <div className="mt-4">
                            <form action="" className="flex flex-row gap-x-8 h-10">
                                <fieldset className="">
                                    <legend className="bg-slate-50 text-black px-4 transform cursor-pointer select-none hover:bg-[#bdd1e0]" onClick={() => handleDrop(1)}>Select Make {drop1 == false ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}</legend>
                                    {drop1 && <div className="bg-slate-50 text-black">
                                        <div>
                                            <input type="radio" id="any" name="make" value="any" />
                                            <label for="any">Any</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="tata" name="make" value="Tata" />
                                            <label for="tata">Tata</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="mahindra" name="make" value="Mahindra" />
                                            <label for="mahindra">Mahindra</label>
                                        </div>
                                    </div>}
                                </fieldset>
                                <fieldset className="">
                                    <legend className="bg-slate-50 text-black px-4 cursor-pointer hover:bg-[#bdd1e0] select-none" onClick={() => handleDrop(2)}>Select Fuel Type {drop2 == false ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}</legend>
                                    {drop2 && <div className="bg-slate-50 text-black">
                                        <div>
                                            <input type="radio" id="anyFuel" name="fuel" value="anyFuel" />
                                            <label for="anyFuel">Any</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="petrol" name="fuel" value="Petrol" />
                                            <label for="petrol">Petrol</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="diesel" name="fuel" value="Diesel" />
                                            <label for="diesel">Diesel</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="electric" name="fuel" value="Electric" />
                                            <label for="electric">Electric</label>
                                        </div>
                                    </div>}
                                </fieldset>
                                <fieldset className="">
                                    <legend className="bg-slate-50 text-black px-4 cursor-pointer hover:bg-[#bdd1e0] select-none" onClick={() => handleDrop(3)}>Select Price Range {drop3 == false ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}</legend>
                                    {drop3 && <div className="bg-slate-50 text-black">
                                        <div>
                                            <input type="radio" id="price1" name="make" value="price1" />
                                            <label for="price1">Any</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="price2" name="make" value="price2" />
                                            <label for="price2"> ₹ 1Lakhs - ₹ 4Lakhs</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="price3" name="make" value="price3" />
                                            <label for="price3"> ₹ 4lakhs - ₹ 8Lakhs</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="price4" name="make" value="price4" />
                                            <label for="price4"> ₹ 8laks - ₹ 15Lakhs</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="price5" name="make" value="price5" />
                                            <label for="price5"> Above ₹ 15Lakhs</label>
                                        </div>
                                    </div>}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <CarList />
        </>
    )
}
