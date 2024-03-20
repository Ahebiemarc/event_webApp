import React from 'react'
import { Link } from 'react-router-dom'

function Footer () {
  return (
    <footer className="font-police footer-after">
        <div className="flex justify-between mx-[4rem]">
            <div className="font-bold text-2xl "><Link to="/home">Events<span className="text-green">.</span></Link></div>
            <div >
                <div className="px-[4rem]">
                    <Link className="inline-block mr-[6rem] mb-[2rem]">A propos de nous</Link>
                    <Link to="/contact-us">Contact</Link>
                </div>
                <div className="px-[4rem]">
                    <Link to="/events" className="inline-block mr-[6rem] mb-[2rem]">Evènements</Link>
                    <Link to="/about" className="ml-[2.5rem]">A propos</Link>
                </div>
            </div>
            <div>
                <div>
                    <h1 className="text-center font-medium text-[1.5rem]">Rejoignez notre communauté</h1>
                </div>
                <div className="mt-[1.5rem] shadow-sm overflow-hidden">
                    <input type="email" placeholder='Entrer votre mail' className="grow px-[2rem] py-[0.5rem] font-light focus:outline-none"/>
                    <button className="h-[2.6rem] w-[7.6rem] btn-hero z-[100] text-white text-[16px] ">Recevoir</button>
                </div>
            </div>
        </div>
        <div className="mt-10 mb-4">
            <hr />
        </div>
        <idv>
            <div className="text-[0.9rem] ml-[4rem] mb-4 font-light"> &copy; Events. FSM 2023. Tous les droits sont réservés</div>
            <div></div>
        </idv>
    </footer>
  )
}

export default Footer