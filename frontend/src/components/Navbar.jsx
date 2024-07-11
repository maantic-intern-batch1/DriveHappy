import car1 from "../../../Testing_Gemini/image1.jpg"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <>
            <nav className={`py-4 border-b-2  border-gray-200/70  w-full bg-white `}>
                <div className="flex flex-row items-center justify-between font-poppins w-full">
                    <div className="flex flex-row justify-between laptop:gap-x-8 w-full pr-20 pl-20">
                        <div className=" text-[#193950] font-bold text-xl"><Link to="/">DriveHappy</Link></div>
                        <div className="hidden tablet:block">
                            <ul className="flex flex-row gap-x-2 font-bold text-gray-500 text-sm laptop:gap-x-8 laptop:text-base">
                                <li className="cursor-pointer hover:text-[#0473E9]"><NavLink to="/" className={({ isActive }) => isActive ? "text-[#193950]" : undefined} end>Home</NavLink></li>
                                <li className="cursor-pointer hover:text-[#0473E9]" ><NavLink to="/addImages" className={({ isActive }) => isActive ? "text-[#193950]" : undefined} end>Add Car Images</NavLink></li>
                                <li className="cursor-pointer hover:text-[#0473E9]"><NavLink to="/analysisReview" className={({ isActive }) => isActive ? "text-[#193950]" : undefined} end>Analyze Review</NavLink></li>
                                <li className="cursor-pointer hover:text-[#0473E9]">About Us</li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="tablet:flex tablet:flex-row items-center gap-x-4 laptop:gap-x-8 hidden">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-3 h-3 laptop:w-4 laptop:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar" className="block w-40 p-2 pl-10 text-sm text-gray-900 rounded-lg bg-[#c3c5cb48] focus:ring-blue-500 focus:border-blue-500" placeholder="Search" />
                    </div>
                    <ul className="flex flex-row gap-x-4 font-bold text-gray-500 items-center text-sm laptop:gap-x-8 laptop:text-base">
                        <li className="cursor-pointer hover:text-[#EC4899]">Icon</li>
                        <li className="cursor-pointer"><img src={car1} alt="profilePhoto" className="w-10 h-10 rounded-full" /></li>
                        <li className="bg-[#EC4899] text-white rounded py-1.5 px-3 cursor-pointer">Upload</li>
                    </ul>
                </div>
                <div className="tablet:hidden cursor-pointer flex flex-row gap-x-4" >
                    <img src={car1} alt="profilePhoto" className="w-10 h-10 rounded-full" />
                    <img src={Menu} alt="" />
                </div> */}
                </div>
                {/* {menu && <div className="tablet:hidden w-full mt-6">
                <ul className="font-bold text-gray-500 flex flex-col gap-y-4">
                    <li className="cursor-pointer hover:text-[#EC4899]">Inspiration</li>
                    <li className="cursor-pointer hover:text-[#EC4899]">Find Work</li>
                    <li className="cursor-pointer hover:text-[#EC4899]">Learn Design</li>
                    <li className="cursor-pointer hover:text-[#EC4899]">Go Pro</li>
                    <li className="cursor-pointer hover:text-[#EC4899]">Hire Designers</li>
                </ul>
                <div className="relative w-full my-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                        </svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar" className="block w-[80vw] p-2 pl-10 text-sm text-gray-900 rounded-lg bg-[#c3c5cb48] focus:ring-blue-500 focus:border-blue-500" placeholder="Search" />
                </div>
                <ul>
                    <li className="bg-[#EC4899] text-white rounded py-1.5 px-3 cursor-pointer w-[80vw] text-center">Upload</li>
                </ul>
            </div>} */}
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </>

    )
}