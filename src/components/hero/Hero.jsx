import React, { useEffect, useState } from 'react'
import hero1 from'../../assets/hero1.jpg'
import hero2 from '../../assets/hero2.jpg'
import hero3 from'../../assets/hero3.jpg'

function Hero () {

  const first_text =`Choisissez.\nParticipez.\nGrandir.`
  const [text1, setText1] = useState("");
  const textState = ["istyping", "isdeleting"];
  const [typing, setTyping] = useState(textState[0]);

  /*useEffect(() =>{
    const timeout = setTimeout(() =>{
      setText1(first_text.slice(0, text1.length+1));
    }, 100);
    return () => clearTimeout(timeout);

  }, [text1]);*/

  function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typing === "istyping" && text1 !== first_text) {
        setText1(first_text.slice(0, text1.length + 1));
      }
      else if (text1 === first_text && typing === "istyping"){
        sleep(3000).then(()=>{
        setTyping(textState[1])
        })
      }
      else if ( (text1 === first_text && typing==="isdeleting") || typing === "isdeleting" ) {
        setText1(first_text.slice(0, text1.length - 1));
        if(text1.length<=2){
            setTyping(textState[0])
        }
      }
    }, 100);
  return () => clearTimeout(timeout);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [text1, typing]);


  return (
    <main className="font-police mx-[10px] mb-[3rem]">
      <div className="grid grid-cols-2 mr-[24px]">
        <div className="h-[100%] col-[1/5] relative z-[200] pt-[3rem]">
          <h1 className="h1-text font-medium text-[4rem] tracking-[-.14rem] leading-[1] mb-[10rem] pl-[50px]">
            <span className="blinking-cursor">{text1}</span>
          </h1>
          <div className="flex h-[7rem] mb-[2rem] z-[100] overflow-visible whitespace-nowrap absolute shadow-sm bottom-[3rem] w-[100%] right-[-80px] ">
            <input className="grow px-[2.5rem] bg-white font-light focus:outline-none" type="email" placeholder='entrer votre mail' />
            <button className="btn-hero">Recevoir</button>
          </div>
        </div>
        <div className="col-[5/13] flex gap-[2rem] contain-img">
          <div className="img-hero img-hero2" style={{backgroundImage: `url(${hero1})`}}>
              <div className="horiz horiz2">
                <span className="name">Formation</span>
                <div className="topics">
                  <strong className="strong">100</strong>
                  <span className="span">EVENTS</span>
                </div>
              </div>
            </div>
          <div className="img-hero" style={{backgroundImage: `url(${hero2})`}}>
            <div className="vert">Night Club</div>
              <div className="horiz">
                <span className="name">NightClub</span>
                <div className="topics">
                  <strong className="strong">100</strong>
                  <span className="span">EVENTS</span>
                </div>
              </div>
          </div>
          <div className="img-hero" style={{backgroundImage: `url(${hero3})`}}>
            
            <div className="vert">Robotic AI</div>
              <div className="horiz">
                <span className="name">Robotic AI</span>
                <div className="topics">
                  <strong className="strong">100</strong>
                  <span className="span">EVENTS</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero