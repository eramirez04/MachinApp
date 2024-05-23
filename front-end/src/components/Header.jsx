
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import sena3 from '../assets/img/sena3.jpg'

const Header = () => {
    return(
        <header >
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 bg-greental">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a className="flex items-center">
                        <img src={sena3} className=" h-20" />
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className=" dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  "><FaRegUserCircle size="4rem" /></a>
                        <a href="#" className="dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "><FaGear size="4rem"/></a>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" className="block text-2xl py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">PANEL DE CONTROL</a>
                            </li>
  
                        </ul>
                    </div>
                </div>
            </nav>
    </header>
    )
};

export default Header;