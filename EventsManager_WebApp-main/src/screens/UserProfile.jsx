import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover-01.png';
import profileNone from '../images/user/profileNone.png'
import { Link } from 'react-router-dom';
import CreateEvent from '../components/produitEvent/CreateEvent';
import EventProducts from '../data';
import Event from '../components/produitEvent/Event';
import { getUser } from '../api/user';
import { Pagination, Skeleton } from '@mui/material';
import { photoBaseURL } from '../api/constant';
import { Avatar } from '@material-tailwind/react';
import { calculateTotalPages } from './Events';
import { fetchAllEventByUserId } from '../api/event';



const limitPerPage = 3;

function UserProfile(){

   // Dialog Component Create Event
   const [open, setOpen] = useState(false);

   const Myevent = EventProducts.slice(0, 4);

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [events, setEvents] = useState([]);
   const [loadingEvents, setLoadingEvents] = useState(true);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   const userId = sessionStorage.getItem('user');
   


   


   useEffect(() => {
    // Faire défiler vers le haut de la page
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur");
        // Gérer l'erreur, par exemple en définissant un état d'erreur
        setError(error.reponse.data.message);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const eventData = await fetchAllEventByUserId(page);
        setEvents(eventData);
        const totalPages = calculateTotalPages(eventData, limitPerPage);
        setTotalPages(totalPages);
        setLoadingEvents(false);
        
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
            setLoadingEvents(false);
      }
    }
    fetchEvents();
  }, [page]);


  const handlePageChange = (event, value) => {
    setPage(value);
  };
  

  const getPhoto = () =>{
    
    if(user.profilePhoto === "" || user.profilePhoto === "undefined"){
      return profileNone
    }
    return photoBaseURL + user.profilePhoto
  }



   const handleOpen = (e) => {
    setOpen((cur) => !cur)
   };


   if (loading) {
    return (
      <DefaultLayout overflow_y="auto">
        <Breadcrumb pageName="Profile" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Skeleton variant="rectangular" height={200} className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Skeleton variant="circular" width={150} height={150} className="absolute  h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
              </div>
            </div>
            <div className="mt-4 relative">
              <Skeleton variant="text" width={200} className="absolute left-[42%] bottom-13 my-20" />
              <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="mx-auto flex flex-col items-center justify-center  border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <Skeleton variant="text" width={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
  

  return (
    <DefaultLayout overflow_y="auto">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
         
          
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        

        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2 bottom-8">
              <Avatar src={user && getPhoto()} alt="profile" className="h-[200px] w-[200px] rounded-full  object-cover object-center" />
              <Link to="/update-profile"
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-orange text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {user &&  user.username}
            </h3>
            <p className="font-medium"> {user && user.number} </p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="mx-auto flex flex-col items-center justify-center  border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                
                <span className="text-sm font-police">{user && user.email}</span>
              </div>
              
            </div>

            <div>
              <button onClick={handleOpen} className='text-primary underline cursor-pointer'>créer un évènement</button>
              <CreateEvent open={open} handleOpen={handleOpen} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-16 bg-white z-[1000] overflow-visible'>
        <h3 className='text-2xl font-sans font-bold text-blue'>Mes évènements</h3>
        <main  className="my-[2.5rem] font-police">
          {loadingEvents ? (
            <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
            {Array.from({ length: 4 }).map((_, index) => (
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
                  <Link key={event._id} to={`/update-event/${event._id}`}>
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

export default UserProfile