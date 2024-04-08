//'use client'
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value == '') {
            setActiveSearch([]);
            return false;
        }
    }
    return(
        <form className="w-[500px] relative mx-auto">
            <div className="relative">
                <input type="text" placeholder="Search" className="w-full p-4 rounded-full border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-orange rounded-full">
                    <FaSearch />
                </button>
            </div>
            <div className="absolute top-20 p-4 bg-gray text-black w-full rounded-sm left-1/2 -translate-x-1/2 flex flex-col gap-2 hidden">
                <span>span</span>
            </div>
        </form>
    )
}

export default SearchBar;