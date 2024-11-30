import React from 'react'
import { Hero_Data } from '../utils/data'
import { Link } from 'react-scroll'

const Hero = () => {
  const {
    Name,
    Tagline,
    HeroTitle,
    HeroPictureDiscription,
    HeroPicture
  } = Hero_Data;

 

  return (
    <section className='max-w-screen-xl flex flex-col gap-10 md:gap-14 md:flex-row md:items-center pt-16 md:pt-28 pb-20 px-6 mx-auto' id="hero">

      <div className='flex-1 text-center md:text-left z-[1]'>
        <span className="text-xs md:text-sm text-blue-200 font-thin">{Hero_Data.HeroTitle}</span>
        <h2 className="text-3xl mt-3 md:text-5xl md:mt-5">{Name}</h2>
        <p className="w-full text-xss font-light text-neutral-50 leading-5 my-6 lg:w-[38vw] md:text-5m md:leading-6 md:my-8">{Tagline}</p>
       
        <Link to='contact' smooth spy offset={-80}>
        <button className="primary-btn">Contact Us</button>
            </Link>
      </div>

      <div className='flex justify-center'>
        <div className='w-full max-w-[403px] bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-950 p-6'>
          <div className="flex justify-center items-center mb-4">
            <img src={HeroPicture} alt="" className='hero-img '/>
          </div>
          <div className="font-light text-neutral-40 my-6 md:text-3m sm:text-small md:leading-6 md:my-0 text-gray-400 bg-gradient-to-br text-center rounded-lg from-blue-1050 to-slate-900 p-2 border border-blue-950">
            <p>{HeroPictureDiscription}</p>
          </div>
        </div>
      </div>
    <div className="ui-circle absolute top-6 md:top10 -left-12 md:left-0"></div>
    </section>
  )
}

export default Hero;
