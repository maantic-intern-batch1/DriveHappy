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
                                <li className="cursor-pointer hover:text-[#0473E9]"><NavLink to="/review" className={({ isActive }) => isActive ? "text-[#193950]" : undefined} end>Open as Reviewer</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </>

    )
}