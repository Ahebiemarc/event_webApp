import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import TitleContainer from '../components/titleContainer/TitleContainer'
import Events from '../components/produitEvent/Events'
import Acordion from '../components/accordion/Acordion'
import Footer from '../components/footer/Footer'
import { getEventsWithLimit } from '../api/event'

function Home () {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const limit = 10; // Par exemple, vous pouvez changer cette valeur selon vos besoins
        const eventsData = await getEventsWithLimit(limit);
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      }
    };

    fetchEvents();
  }, []); 
  return (
    <>
    <Navbar />
    <Hero />
    <TitleContainer />
    <Events />
    <Acordion />
    <Footer />
    </>
  )
}

export default Home