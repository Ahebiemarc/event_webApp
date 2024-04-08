'use client';

import React, { useRef } from 'react'
import {Card,CardHeader,CardBody,CardFooter,Typography,Avatar,} from "@material-tailwind/react";
import {StarIcon} from "@heroicons/react/24/solid";
import { FaPeriscope } from "react-icons/fa";
import {motion, useScroll, useTransform} from 'framer-motion';
import { photoBaseURL } from '../../api/constant';

export const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((accumulator, review) => accumulator + review.note, 0);
    return totalRating / reviews.length;
  };  
   
  
export default function ({event}) {
    
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    const imageAnimate = {
        offscreen:{x:-100, opacity:0},
        onscreen:{
        x:0,
        opacity:1,
        rotate:[0,10,0],
        transition: {type:"spring",
        bounce:0.4,
        duration:1}
      }
    
    };

    const textAnimate = {
        offscreen:{y:100, opacity:0},
        onscreen:{y:0,
        opacity:1,
        transition: {type:"spring",
        bounce:0.4,
        duration:1}
     }
    
    }

    return (
        <motion.div ref={ref}
         style={{
            scale: scaleProgress,
            opacity: opacityProgress
         }}
         initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{once:false, amount:0.5}}
        transition={{staggerChildren:0.5}}
        >
            <motion.div
             //whileHover={{ scale: 0.8, rotate: 10 }}
             whileTap={{
             scale: 1.1,
             rotate: -30,
             borderRadius: "100%"
             }}
            >
                <Card 
                className="hover:scale-105 duration-500 col-span-1 mx-5 h-full">
                    <motion.div
                        variants={imageAnimate}
                    >
                        <CardHeader color="blue" className="relative h-56">
                        <img
                            src={photoBaseURL + event.photo}
                            alt="img-blur-shadow"
                            className="w-full h-full object-contain"
                        />
                        </CardHeader>
                    </motion.div>
                    <CardBody className="text-center h-[135px]">
                    <Typography variant="h5" className="mb-2 text-[.9rem]">
                        {event.title}
                    </Typography>

                    <Typography /*className="text-[.65rem]"*/ className='flex items-center'>
                        <div className="flex items-center -space-x-4">
                            <Avatar 
                                variant="circular"
                                alt="user 1"
                                className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 2"
                                className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 3"
                                className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 4"
                                className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 5"
                                className="border-2 border-white hover:z-10 focus:z-10 w-[40px] h-[40px]"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                            />
                        </div>
                        <div className='ml-10'><p className='text-xs font-police'>{event.date}</p></div>
                    </Typography>
                    <CardFooter divider className="flex items-center justify-between py-3">
                        <Typography variant="small" className="flex items-center gap-1.5 font-normal">
                        <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700 " />
                            {calculateAverageRating(event.reviews)}
                        </Typography>
                        <Typography variant="small" color="gray" className="flex gap-1">
                            <FaPeriscope className="mt-[3px]" />
                            {event.location}
                        </Typography>
                    </CardFooter>
                    </CardBody>
                    
                </Card>
                </motion.div>
        </motion.div>
    );
}

