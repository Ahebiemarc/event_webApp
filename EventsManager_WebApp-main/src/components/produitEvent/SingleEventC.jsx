import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import  EventProducts  from "../../data";
import { useParams } from 'react-router-dom';
import {StarIcon} from "@heroicons/react/24/solid";

const SingleEventC = () => {
  
  const { id } = useParams(); // Récupérer l'ID de l'événement à partir de l'URL
  const [event, setEvent] = useState(null); // État local pour stocker les détails de l'événement

  // Utiliser useEffect pour trouver l'événement correspondant à l'ID dans les données locales
  useEffect(() => {
    // Trouver l'événement correspondant à l'ID dans les données locales
    const foundEvent = EventProducts.find(event => event.id === parseInt(id));
    if (foundEvent) {
      setEvent(foundEvent); // Mettre à jour l'état avec les détails de l'événement trouvé
    }
  }, [id]); // Le tableau de dépendances assure que useEffect s'exécute lorsque l'ID change

  // Si l'événement est nul (non trouvé), afficher un message d'erreur
  if (!event) {
    return <div className="h-[200px] w-[400px] m-auto font-police font-medium text-3xl mt-[200px]"><p>Événement non trouvé...</p></div>;
  }


  return (
    <main>
      <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
        <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="hidden md:block large-image">
            <img
              className="object-cover cursor-pointer rounded-xl w-[500px] h-[500px]"
              src={event.img}
              alt="snekers-photo"
            />
          </div>
        </div>

        <div className="description p-6 md:basis-1/2 md:py-[40px]">
          <p className="text-green text-[14px] tracking-widest uppercase font-[700] mb-6">
            Night Club
          </p>
          <h1 className="text-3xl text-orange font-police md:text-4xl capitalize font-[700]">
            {event.title} <br />
          </h1>
          <p className="hidden md:block font-police text-darkGrayishBlue my-10 leading-7">
            {event.description}
          </p>

          <div className="price flex items-center">
            <span className="text-3xl font-[700] mr-4">50DT</span>
            <span className="bg-paleOrange text-orange font-[700] py-1 px-2 rounded-lg">
              50%
            </span>
            <div className="flex items-center mx-[15px] ">
              <span ><StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700 " /></span>
              <span ><StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700 " /></span>
              <span ><StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700 " /></span>
              <span ><StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700 " /></span>
              <span ><StarIcon className="-mt-0.5 h-5 w-5 text-blue-700" /></span>
            </div>
            <span><a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a></span>
          </div>
          <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
            100DT
          </p>

          <div className="buttons-container flex flex-col md:flex-row mt-8">
            <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
            </div>
            <button className="flex text-white items-center justify-center btn-hero z-[100] w-[9.5rem] h-[4.5rem]  shadow-sm font-police text-xl">
                Adhésion <FontAwesomeIcon size={34} icon={faCheckSquare} color="white" className="ml-2" />
                
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleEventC;
