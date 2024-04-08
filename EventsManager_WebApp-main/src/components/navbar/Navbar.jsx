import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBell } from "react-icons/fa";
import { Avatar, Badge } from "@material-tailwind/react";
import avatar from '../../assets/profile.jpg';
import profileNone from '../../images/user/profileNone.png'

import {
  Button,
} from "@material-tailwind/react";
import LoginUser from '../form/LoginUser';
import { logoutUser } from '../../api/auth';
import { photoBaseURL } from '../../api/constant';


function Navbar ()  {

  // Dialog Component Connexion
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const profilePhoto = localStorage.getItem('profilePhoto');
  const navigate =  useNavigate();
  const location = useLocation();

  const profilePhotoURI = profilePhoto ? photoBaseURL + profilePhoto : profileNone

  const getPhoto = () =>{
    let photo= "";
    if(!profilePhoto || profilePhoto === "undefined"){
      return photo = profileNone
    }
    return photoBaseURL + profilePhoto
  }


  const handleOpen = () => setOpen((cur) => !cur);


  /*useEffect(() => {
    const verifyAuth = async () => {
      const {isAuthenticated, userId} = await checkAuth();
      console.log(isAuthenticated);
      //setIsAuthenticated(isAuthenticated);
    };

    verifyAuth();
  }, []);*/

  const handleLogout = async () =>{
    try {
      const response = await logoutUser()
      localStorage.removeItem('user');
      localStorage.removeItem('profilePhoto')
      setIsLoggedIn(false);
      redirectHome();
    } catch (error) {
      
    }
  }

  const redirectHome = () =>{
    if (location.pathname === "/") {
      return window.location.reload()
    }
    return navigate('/')
  }



  

  return (
    <nav>
      <div className="flex items-center justify-between bg-[#fdfdfe] font-police mt-[34px] mb-[40px] pl-24 pr-20 m-auto max-w-7xl">
        <div className="font-bold text-2xl "><Link to="/">Events<span className="text-green">.</span></Link></div>
        <ul className="flex items-center gap-6 ">
            <li className="link-nav cursor-pointer"><Link to="/">Acceuil</Link></li>
            <li className="link-nav cursor-pointer"><Link to="/events">Evènement</Link></li>
            <li className="link-nav cursor-pointer"><Link to="/about">A propos</Link></li>
            <li className="link-nav cursor-pointer"><Link to="/contact-us">Contact</Link></li>
        </ul>
        <div className="flex items-center gap-3">
            {isLoggedIn ? 
            (
              <Button onClick={handleLogout} className="btn-nav ml-20 cursor-pointer text-white bg-orange ">Se déconnecter</Button>

            ) :
            (
              <>
              <Button onClick={handleOpen} className="btn-nav ml-20 cursor-pointer ">CONNEXION</Button>
              <LoginUser open={open} handleOpen={handleOpen} />
              
              <Link to="/signup"><Button  className="btn-nav cursor-pointer">S'Inscrire</Button></Link>
              </>
              )
          }

           {isLoggedIn && <Link to="/profile" className="ml-5 text-[24px] cursor-pointer"><Avatar src={getPhoto()} alt="avatar" variant="circular" /></Link>}

            {/*<Badge content="10"><span className="text-[24px] cursor-pointer ml-2"><FaBell /></span></Badge>*/}
        </div>
      </div>
    </nav>
  )
}

export default Navbar