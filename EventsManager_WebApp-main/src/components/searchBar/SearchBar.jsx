//'use client'
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchAllEventTags } from "../../api/event";

const SearchBar = ({onSearch}) => {

    const [activeSearch, setActiveSearch] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const fetchEvents = async () => {
		  try {
			const eventsTags = await fetchAllEventTags();
			//console.log(eventsTags[0].allData);
			setTags(eventsTags[0].allData);
		  } catch (error) {
			console.error('Erreur lors du chargement des événements:', error);
		  }
		};
	
		fetchEvents();
	  }, []); 

      const handleSearch = (e) => {
        const value = e.target.value;
        if (value === '') {
            setActiveSearch([]);
        } else {
            setActiveSearch(tags.filter(tag => tag.toLowerCase().includes(value)).slice(0, 8)); // Convertir chaque tag en minuscules
        }
    }


    const handleTagClick = (tag) => {
        setActiveSearch([tag]);
        document.getElementById('search').value = tag;
        setSearchValue(tag);
        onSearch(tag)
        setActiveSearch([]);
    }

    const handleButtonClick = (e) =>{
        e.preventDefault();
        onSearch(searchValue)
    }
    return(
        <form className="w-[500px] relative mx-auto">
            <div className="relative">
                <input onChange={(e) => handleSearch(e)} type="text" placeholder="Search" name="search" id="search" className="w-full p-4 rounded-full border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-orange rounded-full" onClick={handleButtonClick}>
                    <FaSearch />
                </button>
            </div>

            {
                activeSearch.length > 0 && (
                    <div className="absolute top-15 p-4 bg-gray bg-opacity-80 text-black w-full rounded-lg left-1/2 -translate-x-1/2 flex flex-col gap-2">
                        {
                            activeSearch.map((tag, index) => {
                                return (
                                    <span key={index}
                                    className="cursor-pointer hover:text-orange"
                                    onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </span>
                                )
                            })
                        }
                    </div>
                )
            }
            
        </form>
    )
}

export default SearchBar;