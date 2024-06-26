import CarImage from "../assets/homepageCar1.webp"
import Car2 from "../assets/car4.jpg";
export default function HomePage() {
    return (
        <>
            <div className="w-full">
                <div className="pt-5 px-24 w-full">
                    <div
                        className="h-[500px] bg-bottom bg-cover bg-no-repeat relative after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-[#00000088]"
                        style={{ backgroundImage: `url(${Car2})` }}
                    >
                    </div>
                    <div className="absolute top-1/3 left-1/4 transform -translate-x-1/4 -translate-y-1/4 text-white">
                        <h1 className="text-3xl"><span className="font-bold">Find</span> your next match. </h1>
                        <p>Dream Cars, Real Prices. Drive home your perfect ride today. </p>
                    </div>
                </div>
            </div>
        </>
    )
}
