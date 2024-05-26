import React from 'react'
import { useState} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Acordion() {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
 
  return (
    <div className="mx-[5rem] my-[5rem] font-police">
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)}>
        <p className='text-3xl text-orange font-police md:text-4xl capitalize font-[700]'>Évènements à venir</p> 
        </AccordionHeader>
        <AccordionBody>
      {/*<div className='mt-16 bg-white z-[1000] overflow-visible'>
        <h3 className='text-2xl font-sans font-bold text-blue'>Mes évènements</h3>
        <main  className="my-[2.5rem] font-police">
        <div className="grid grid-cols-4 gap-y-20 mx-[3rem]">
              {events && events.map((event) => (
                  <Link key={event._id} to={`/update-event/${event._id}`}>
                  <Event  {...{event}}/>
                  </Link>
              ))}
  
          </div>
          
        
      </main>
        
              </div>*/}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Évènements passés
        </AccordionHeader>
        <AccordionBody>
        <p className='text-3xl text-orange font-sans md:text-xs capitalize font-[700]'>Plongez dans nos archives d'événements passés et redécouvrez les moments qui ont marqué notre communauté. Que vous cherchiez à revivre les highlights de nos rencontres précédentes ou à explorer ce que vous avez manqué, notre bibliothèque d'événements passés est votre fenêtre sur les expériences enrichissantes et inspirantes que nous avons partagées. <br /><br />
        Naviguez à travers nos galeries de photos, vidéos et résumés détaillés pour garder le pouls des événements qui ont façonné notre histoire. <br /><br />
        </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(3)}>
        Planifiez votre visite
        </AccordionHeader>
        <AccordionBody>
        <p className='text-3xl text-orange font-sans md:text-xl capitalize font-[700]'>
        planification de visite aussi simple et transparente que possible. <br /><br />
         <br /><br />
        </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default Acordion;