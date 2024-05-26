import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import {StarIcon} from "@heroicons/react/24/solid";
import { getEventById } from "../../api/event";
import { Rating, Skeleton } from "@mui/material";
import { photoBaseURL } from "../../api/constant";
import { calculateAverageRating } from "./Event";
import { adhererEvent } from "../../api/adhesion";
import { toast } from 'react-toastify'
import { Typography, Avatar } from "@material-tailwind/react";


import UserNone  from "../../images/user/profileNone.png";
import ToastSuccess from "../toast/ToastSuccess";



function multiplierByTwo(input) {
  // Utilisation d'une expression régulière pour extraire les chiffres de la chaîne
  const digits = input.match(/\d+/g);
  
  if (digits) {
    // Conversion des chiffres en nombres et multiplication par 2
    const multipliedDigits = digits.map(digit => parseInt(digit, 10) * 2);
    
    // Rejoindre les chiffres multipliés en une seule chaîne
    return multipliedDigits.join(' ');
  } else {
    return 'Aucun chiffre trouvé';
  }
}

const SingleEventC = () => {
  
  const { id } = useParams(); // Récupérer l'ID de l'événement à partir de l'URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  const [errorSub, setErrorSub] = useState(null)
  const navigate =  useNavigate();


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'événement:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const adhEvent = async () => {
    try {
      const r = await adhererEvent(id);
      navigate('/');
      setSubscribe(true);
      toast.success(`Adhésion réussie!`);
    } catch (error) {
      console.error('Erreur lors de l\'adhésion:', error);
      setSubscribe(false);
      setErrorSub(error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
  };

  if(loading) {
    return (
      <main>

      <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
        <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="hidden md:block large-image">
            <Skeleton variant="rectangular" className="rounded-xl w-[500px] h-[500px]" />
          </div>
        </div>

        <div className="description p-6 md:basis-1/2 md:py-[40px]">
          <p className="text-green text-[14px] tracking-widest uppercase font-[700] mb-6">
            <Skeleton width={100} />
          </p>
          <h1 className="text-3xl text-orange font-police md:text-4xl capitalize font-[700]">
            <Skeleton width={200} />
          </h1>
          <p className="hidden md:block font-police text-darkGrayishBlue my-10 leading-7">
            <Skeleton height={80} />
          </p>

          <div className="price flex items-center">
            <span className="text-3xl font-[700] mr-4"><Skeleton width={50} /></span>
            <span className="bg-paleOrange text-orange font-[700] py-1 px-2 rounded-lg">
              <Skeleton width={30} />
            </span>
            <div className="flex items-center mx-[15px]">
              <Skeleton width={25} height={25} variant="circular" />
              <Skeleton width={25} height={25} variant="circular" />
              <Skeleton width={25} height={25} variant="circular" />
              <Skeleton width={25} height={25} variant="circular" />
              <Skeleton width={25} height={25} variant="circular" />
            </div>
            <span><Skeleton width={50} /></span>
          </div>
          <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
            <Skeleton width={50} />
          </p>

          <div className="buttons-container flex flex-col md:flex-row mt-8">
            <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
              <Skeleton width={100} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            <button className="flex text-white items-center justify-center btn-hero z-[100] w-[9.5rem] h-[4.5rem]  shadow-sm font-police text-xl">
              <Skeleton width={100} />
            </button>
          </div>
        </div>
      </div>
    </main>
    );
  }

  if (!event) {
    return <div className="h-[200px] w-[400px] m-auto font-police font-medium text-3xl mt-[200px]"><p>Événement non trouvé...</p></div>;
  }


  return (
    <main>
      {errorSub &&  <ToastSuccess />}
      {!errorSub &&  <ToastSuccess />}
      <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
        <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="hidden md:block large-image">
            <img
              className="object-cover cursor-pointer rounded-xl w-[500px] h-[500px]"
              src={photoBaseURL + event.photo}
              alt="snekers-photo"
            />
          </div>
        </div>

        <div className="description p-6 md:basis-1/2 md:py-[40px]">
          <p className="text-green text-[14px] tracking-widest uppercase font-[700] mb-6">
            NN
          </p>
          <h1 className="text-3xl text-orange font-police md:text-4xl capitalize font-[700]">
            {event.title} <br />
          </h1>
          <p className="hidden md:block font-sans text-darkGrayishBlue my-10 leading-7 text-sm">
            {event.description}
          </p>

          <div className="price flex items-center">
            <span className="text-3xl font-[700] mr-4">{event.price}</span>
            <span className="bg-paleOrange text-orange font-[700] py-1 px-2 rounded-lg">
              50%
            </span>
            <div className="flex items-center mx-[15px] ">
              <Rating precision={0.5} name="read-only" value={calculateAverageRating(event.reviews)} readOnly />
            </div>
            <span><a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a></span>
          </div>
          <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
            {`${multiplierByTwo(event.price)}DT` }
          </p>

          <div className="buttons-container flex flex-col md:flex-row mt-8">
            <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
            </div>
            <button className="flex text-white items-center justify-center btn-hero z-[100] w-[9.5rem] h-[4.5rem]  shadow-sm font-police text-xl" onClick={adhEvent}>
                Adhésion <FontAwesomeIcon size={34} icon={faCheckSquare} color="white" className="ml-2" />
                
            </button>
          </div>
          
        </div>
        
      </div>
      <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] relative">
          {event.subscribers.map(photo => {
              if (photo !== "") {
                  return(
                      <Avatar 
                          variant="circular"
                          alt="user 1"
                          className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                          src={`${photoBaseURL}${photo}`}
                      />
                  )
              }

              return(
                  <Avatar 
                      variant="circular"
                      alt="user 1"
                      className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                      src={UserNone}
                  />
              )
          })}
                            
      </div>
    </main>
  );
};

export default SingleEventC;
