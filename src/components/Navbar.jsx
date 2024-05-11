import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <>
            <div className="container bg-black px-7 py-2 w-full flex justify-between items-center">
                <div className='flex gap-3 items-center'>
                    <img src="./icon.png" alt="" className='w-9' draggable="false" />
                    <h1 className='text-white text-xl font-bold'>Todo App</h1>
                </div>
                <div className='flex gap-9 items-center'>
                    <NavLink to={"/"} className={({ isActive }) => `px-3 rounded-xl py-2 transition-all  hover:bg-slate-500 ${isActive ? "font-bold bg-gray-700 border-b border-white" : ""}`} draggable="false">
                        <h1 className='text-white text-lg'>Home</h1>
                    </NavLink>
                    <NavLink to={"/completed"} className={({ isActive }) => `px-3 py-2 rounded-xl transition-all  hover:bg-slate-500 ${isActive ? "font-bold bg-gray-700 border-b border-white" : ""}`} draggable="false">
                        <h1 className='text-white text-lg'>Completed</h1>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar