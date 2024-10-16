import React from 'react'
import "./Hero.css"
import logo from "../assets/logofinal.png"
const Hero = () => {
  return (
    <div className="hero-container">
       <div className='free'>
       <button>1st Video is 100% Free !</button>
       </div>
    <section id="home" className="hero-section">
  <div className="hero-content">
    
    <h1 className="gradient-text">
    Transform Your Vision Into <br/><span>Stunning Videos</span>
    </h1>
    <img src={logo} alt="" className='hero-logo'/>
  </div>
  
  {/* <div className="get-started">
    <button>Get Started !</button>
  </div> */}
</section>

  </div>
  )
}

export default Hero
