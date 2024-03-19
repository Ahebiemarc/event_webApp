import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import TitleContainer from '../components/titleContainer/TitleContainer'
import Events from '../components/produitEvent/Events'
import Acordion from '../components/accordion/Acordion'
import Footer from '../components/footer/Footer'

function Home () {
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