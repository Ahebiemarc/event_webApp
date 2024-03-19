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
        Évènements à venir
        </AccordionHeader>
        <AccordionBody>
        Notre faculté des sciences organise régulièrement des événements 
        passionnants qui permettent aux étudiants, au personnel et au grand 
        public de découvrir les dernières avancées en matière de recherche 
        scientifique. Nous sommes fiers de proposer une large gamme 
        d'événements qui s'adressent à tous les niveaux d'expertise et à tous 
        les intérêts scientifiques. <br /><br />
        Notre accordéon interactif vous permet de filtrer les événements à 
        venir en fonction de vos intérêts et de votre disponibilité. 
        Vous pouvez facilement naviguer parmi les conférences, les ateliers, 
        les séminaires et les événements sociaux pour trouver ceux qui vous 
        conviennent le mieux. <br /><br />
        Nos événements sont animés par des scientifiques éminents, des 
        universitaires et des experts de l'industrie qui partagent leur 
        expertise et leur passion pour la science. Nous encourageons les 
        questions et les discussions ouvertes lors de nos événements, afin 
        de créer un environnement d'apprentissage dynamique et stimulant pour 
        tous les participants. <br /><br />
        Que vous soyez un étudiant curieux, un professionnel de l'industrie ou 
        simplement un amateur de science, nos événements à venir sont 
        l'occasion idéale de découvrir les dernières avancées en matière de 
        recherche scientifique et de rencontrer d'autres passionnés de science 
        comme vous.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Évènements passés
        </AccordionHeader>
        <AccordionBody>
        Notre faculté des sciences est fière de son riche passé en matière 
        d'organisation d'évènements scientifiques passionnants. Notre archive 
        d'évènements passés vous permet de parcourir les présentations, les 
        exposés et les discussions des évènements passés, et de revivre les 
        moments forts de ces évènements. <br /><br />
        Nous sommes fiers d'avoir accueilli des scientifiques éminents, des 
        universitaires et des experts de l'industrie lors de nos événements 
        passés. Nos événements passés comprenaient des conférences, des 
        ateliers, des séminaires et des événements sociaux, qui ont tous 
        permis aux participants de découvrir les dernières avancées en matière
         de recherche scientifique. <br /><br />
         Notre archive d'événements passés est mise à jour régulièrement, afin de
          vous offrir un accès facile à nos précédents événements. 
          Nous vous encourageons à parcourir notre archive pour 
          découvrir les événements qui vous intéressent et à les 
          regarder à nouveau pour revivre les moments forts. <br /><br />
          Nous sommes convaincus que notre archive d'événements passés est une 
          ressource précieuse pour tous les passionnés de science, et nous 
          sommes ravis de la partager avec vous.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(3)}>
        Planifiez votre visite
        </AccordionHeader>
        <AccordionBody>
        Nous sommes ravis que vous envisagiez de visiter notre faculté des 
        sciences pour assister à l'un de nos événements. Notre fonctionnalité 
        de planification de visite est conçue pour rendre votre expérience de 
        planification de visite aussi simple et transparente que possible. <br /><br />
        Pour commencer, notre calendrier d'événements à venir vous permet de 
        voir facilement quels événements sont prévus dans un futur proche. Vous 
        pouvez cliquer sur un événement pour en savoir plus sur les détails, 
        tels que la date, l'heure et l'emplacement. <br /><br />
        Une fois que vous avez trouvé un événement qui vous intéresse, vous 
        pouvez vous inscrire directement depuis notre site. Il vous suffit de 
        cliquer sur le bouton "Inscription" et de remplir le formulaire 
        d'inscription. Nous vous enverrons alors une confirmation par e-mail avec 
        tous les détails de l'événement, ainsi que des rappels avant la date de 
        l'événement pour vous assurer de ne pas oublier. <br /><br />
        Si vous avez des questions ou des préoccupations concernant votre visite, 
        notre équipe d'assistance à la clientèle est disponible pour vous aider. 
        Vous pouvez nous contacter par téléphone, e-mail ou chat en direct pour 
        obtenir des réponses à toutes vos questions. <br /><br />
        Enfin, lorsque vous arrivez sur le campus, notre fonctionnalité de 
        planification de visite vous aide à vous orienter et à trouver facilement 
        l'emplacement de l'événement. Nous fournissons des indications détaillées 
        sur l'emplacement de l'événement, ainsi que des plans de campus 
        interactifs pour vous aider à trouver votre chemin. <br /><br />
        Nous sommes impatients de vous accueillir sur notre campus pour l'un de 
        nos événements passionnants. N'hésitez pas à utiliser notre fonctionnalité 
        de planification de visite pour rendre votre visite aussi facile et 
        agréable que possible.
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default Acordion;