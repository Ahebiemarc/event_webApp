import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import SearchBar from '../components/searchBar/SearchBar'
import TitleContainer from '../components/titleContainer/TitleContainer'
import { fetchAllEventSearch, fetchEventsWithPagination } from '../api/event'
import { Link } from 'react-router-dom'
import Event from '../components/produitEvent/Event'
import { Pagination, Skeleton } from '@mui/material'


export const calculateTotalPages = (array, limitPerPage) => {
  return Math.ceil(array.length / limitPerPage);
};
const limitPerPage = 7;

function Events () {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const fetchEvents = async (searchTerm = '') => {
      try {
          setLoading(true);
          let eventData;
          if (searchTerm === '') {
              eventData = await fetchEventsWithPagination(page);
          } else {
              eventData = await fetchAllEventSearch(searchTerm);
          }
          setEvents(eventData);
          const totalPages = calculateTotalPages(eventData, limitPerPage);
          setTotalPages(totalPages);
          setLoading(false);
      } catch (error) {
          console.error('Erreur lors du chargement des événements:', error);
          setLoading(false);
    }
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (searchTerm) => {
    setPage(1); // Reset pagination to first page when searching
    fetchEvents(searchTerm);
};


  return (
    <DefaultLayout overflow_y="visible">
      <div className='overflow-y-visible'>
        <Breadcrumb pageName="Page des évènements"/>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <TitleContainer />
        <main  className="my-[2.5rem] font-police">
          {loading ? (
            <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index}>
                  {/* Skeleton for each event */}
                  <div>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={100} />
                  </div>
                </div>
              ))}
          </div>
          ) : (
            <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
              {events && events.map((event) => (
                  <Link key={event._id} to={`/event/${event._id}`}>
                  <Event  {...{event}}/>
                  </Link>
              ))}
  
          </div>
          
          )
          }
          
        
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
      </div>
    
    </DefaultLayout>
  )
}

export default Events