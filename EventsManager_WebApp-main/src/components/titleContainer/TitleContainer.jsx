import React from 'react'

function TitleContainer (){
  return (
    <main>
        <div className="pt-[3rem]">
            <div className="text-center pb-[2.5rem]">
                <h1 className="font-semibold text-[2.4rem]">Accès illimité à plus de 100 évènements</h1>
            </div>
            <div className="">
                <ul className="flex justify-center gap-8 pt-[.2rem] pb-[4.5rem] font-medium">
                    <li className="link-nav title-nav-container font-semibold">Toutes catégories</li>
                    <li className="link-nav title-nav-container font-semibold">Divertissement</li>
                    <li className="link-nav title-nav-container font-semibold">Formation Club</li>
                    <li className="link-nav title-nav-container font-semibold">Formation</li>
                </ul>
            </div>
        </div>
    </main>
  )
}

export default TitleContainer