import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBell } from "react-icons/fa";
import { Avatar } from "@material-tailwind/react";
import avatar from '../../assets/profile.jpg';
import {
  Button,
} from "@material-tailwind/react";
import LoginUser from '../form/LoginUser';
import UserProfileC from '../userProfile/UserProfile';


function Navbar ()  {

  // Dialog Component Connexion
  const [open, setOpen] = useState(false);

  // Dialog Component Profile user
  const [openP, setOpenP] = useState(false);


  const handleOpen = () => setOpen((cur) => !cur);

  const handleOpenP = ()  => setOpenP(!openP);
  

  return (
    <nav>
      <div className="flex items-center justify-between bg-[#fdfdfe] font-police mt-[34px] mb-[40px] pl-24 pr-20 m-auto max-w-7xl">
        <div className="font-bold text-2xl "><Link to="/home">Events<span className="text-green">.</span></Link></div>
        <ul className="flex items-center gap-6 ">
            <li className="link-nav cursor-pointer"><Link to="/">Acceuil</Link></li>
            <li className="link-nav cursor-pointer">Evènemen</li>
            <li className="link-nav cursor-pointer">A propos</li>
            <li className="link-nav cursor-pointer">Contact</li>
        </ul>
        <div className="flex items-center gap-3">
            <Button onClick={handleOpenP} className="btn-nav ml-20 cursor-pointer ">CONNEXION</Button>
            <LoginUser open={openP} handleOpen={handleOpenP} />
            <Link to="/signup"><Button  className="btn-nav cursor-pointer">S'Inscrire</Button></Link>

            <span onClick={handleOpen} className="ml-5 text-[24px] cursor-pointer"><Avatar src={`${avatar}`} alt="avatar" variant="circular" /></span>
            <UserProfileC open={open} handleOpen={handleOpen} />

            <span className="text-[24px] cursor-pointer ml-2"><FaBell /></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar