import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import SearchBar from '../components/searchBar/SearchBar'
import TitleContainer from '../components/titleContainer/TitleContainer'
import { fetchEventsWithPagination } from '../api/event'
import { Link } from 'react-router-dom'
import Event from '../components/produitEvent/Event'
import { Pagination } from '@mui/material'


const calculateTotalPages = (array, limitPerPage) => {
  return Math.ceil(array.length / limitPerPage);
};
const limitPerPage = 20;

function Events () {

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await fetchEventsWithPagination(page);
        setEvents(eventData);
        const totalPages = calculateTotalPages(eventData, limitPerPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      }
    };


    fetchEvents();
  }, [page]);


  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Page des évènements"/>
      <div>
        <SearchBar />
      </div>
      <TitleContainer />
      <main  className="my-[2.5rem] font-police">
        <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
            {events && events.map((event) => (
                <Link key={event._id} to={`/event/${event._id}`}>
                 <Event  {...{event}}/>
                </Link>
            ))}
 
        </div>
        {/*<div className="bg-red-300 my-[4.5rem]">
        <Button variant="text" className="flex items-center gap-2 w-[200px] float-right mr-[80px] hover:bg-[#e8f8ff]">
          Encore Plus <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
        </div>}*/}
      
    </main>
    <div className="pagination-container fixed  bottom-0 right-0 mr-34 mb-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    
    </DefaultLayout>
  )
}

export default Events