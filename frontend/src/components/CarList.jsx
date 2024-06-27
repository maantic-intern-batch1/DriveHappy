import CarCard from "./CarCard"
export default function CarList() {
    const obj = {
        url: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/c70b9a5b-dfa2-4f29-aced-0a209d6ec864/slot/28654480712-75783bd8af2e401586c69b1d94ace295-Exterior-7.jpg?w=690&auto=format',
        make: 'Tata',
        price: '800000',
        fuel: 'Electric',
        model: 'Nexon',
        year: 2022,
        km: 12300,
    }
    return (
        <>
            <div className="w-full mb-40">
                <div className="px-24">
                    <div className="flex flex-row justify-center mt-6">
                        <h1 className="text-2xl font-bold">Browse through our collection of affordable cars</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3 gap-y-5 mt-4">
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                        <CarCard car={obj} />
                    </div>
                </div>
            </div>
        </>
    )
}