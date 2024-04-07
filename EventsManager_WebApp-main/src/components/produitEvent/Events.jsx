import React from 'react'
import { Button } from "@material-tailwind/react";
import {
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";



import EventProducts from '../../data'
import Event from './Event'
import { Link } from 'react-router-dom';

function Events(){

  

  return (
    <main  className="my-[2.5rem] font-police">
        <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
            {EventProducts.map((EventProduct) => (
                <Link key={EventProduct.id} to={`/event/${EventProduct.id}`}>
                 <Event  EventProduct={EventProduct}/>
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