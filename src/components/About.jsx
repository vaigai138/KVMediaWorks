import React from 'react'
import { About_Data } from '../utils/data'

const About = () => {
  return (
    <section className='max-w-screen-xl px-6 mx-auto py-10 md:py-24' id='about'>
      <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center md:text-left pb-10 md:pb-14">
        About Us
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <img src={About_Data.AboutUsPicture} alt="About Picture" className='w-full h-80 object-contain rounded-lg mb-4 md:mb-0 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 md:display:none' />

        <div className="col-span-2 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-6">
          <p className="text-blue-50 text-xs md:text[13px] font-normal text-justify leading-6">
            {About_Data.AboutPara}
           

          </p>
          <br />
          <div className="font-medium text-neutral-40 my-6 md:text-3m md:leading-5 md:my-0 text-primary bg-gradient-to-br from-blue-1050 to-slate-900 p-2 border border-blue-950 rounded-lg">
            <p>{About_Data.AboutUsTag}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <AboutCard
          count={About_Data.Stats.NumberOfProjects}
          label="Projects Completed"
        />
        <AboutCard
          count={About_Data.Stats.ClientsWorkedWith}
          label="Total Clients Worked With"
        />
        <AboutCard
          count={About_Data.Stats.YearsOfExperience}
          label="Years of Experience"
        />
      </div>
    </section>
  )
}

const AboutCard = ({ label, count }) => {
  return (
    <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border-blue-800/40 px-4 md:px-6 py-3">
      <h6 className="text-primary text-xl md:text-2xl font-semibold">
        {count}
      </h6>
      <span className="text-gray text-x5 md:text-5m font-thin">
        {label}
      </span>
    </div>
  )
}

export default About
