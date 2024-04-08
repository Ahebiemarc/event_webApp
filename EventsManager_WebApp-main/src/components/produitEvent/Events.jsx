import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import {
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";



import EventProducts from '../../data'
import Event from './Event'
import { Link } from 'react-router-dom';
import { getEventsWithLimit } from '../../api/event';

function Events(){

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const limit = 10; // Par exemple, vous pouvez changer cette valeur selon vos besoins
        const eventsData = await getEventsWithLimit(limit);
        console.log('eventData:', eventsData);
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <main  className="my-[2.5rem] font-police">
        <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
            {events.map((event) => (
                <Link key={event._id} to={`/event/${event._id}`}>
                 <Event event={event} />
                </Link>
            ))}
 
        </div>
        <div className="bg-red-300 my-[4.5rem]">
        <Button variant="text" className="flex items-center gap-2 w-[200px] float-right mr-[80px] hover:bg-[#e8f8ff]">
          Encore Plus <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
        </div>
    </main>
  )
}

export default Events