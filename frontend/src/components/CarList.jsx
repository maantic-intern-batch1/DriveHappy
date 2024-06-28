import CarCard from "./CarCard"
export default function CarList({ reviewer }) {
    const obj = {
        url1: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/c70b9a5b-dfa2-4f29-aced-0a209d6ec864/slot/28654480712-75783bd8af2e401586c69b1d94ace295-Exterior-7.jpg?w=690&auto=format',
        url2: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/01c48206-b965-4741-88ba-f8422b45551a/slot/28654480712-75783bd8af2e401586c69b1d94ace295-Exterior-2.jpg?w=700&h=403&auto=format',
        url3: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/a43df60d-06f1-42cb-8728-3b21935e093e/slot/28654480712-75783bd8af2e401586c69b1d94ace295-Exterior-4.jpg?w=700&h=403&auto=format',
        url4: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/6dc4abde-2435-4ee4-8591-13314d4519bf/slot/Dashboard.jpg?w=700&h=403&auto=format',
        url5: 'https://fastly-production.24c.in/hello-ar/dev/uploads/65b7691f24f060abe621d66b/74175c00-02e2-46e8-b2f7-49e359377e02/slot/Front-Cabin-View.jpg?w=700&h=403&auto=format',
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
                    {reviewer == false && <div className="flex flex-row justify-center mt-6">
                        <h1 className="text-2xl font-bold">Browse through our collection of affordable cars</h1>
                    </div>}
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