import React, { useEffect } from 'react'
import SingleEventC from '../components/produitEvent/SingleEventC'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Textarea } from "@material-tailwind/react";
import { DefaultRating } from '../components/review/DefaultRating';
import { Button } from "@material-tailwind/react";



function SingleEvent () {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


  return (
    <div>
      <Navbar />
      <SingleEventC />
      <div className='mb-[200px] ml-[200px] ' >
        <div className='my-[20px] mb-[30px]  '>
          <p className='text-2xl font-police '>Vous pouvez donner une note : </p>
        </div>
        <DefaultRating value={4} />

        <div className="w-96 mb-[10px]  ">
          <Textarea label="Message" />
        </div>

        <Button className="rounded-full btn-hero h-[50px] z-[100] mt-[30px] bg-green " loading={true}
        >
        Envoyer
        </Button>
      </div>
      <Footer />
    </div>
  )
}

export default SingleEvent