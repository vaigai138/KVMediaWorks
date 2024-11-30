import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { WorksDataShorts } from '../utils/data';
import { WorksDataLong } from '../utils/data';
import { Link, useNavigate } from 'react-router-dom';


const Works = () => {

  return (
    <div>
      <section className="max-w-screen-xl mx-auto px-6 pb-0" id="works">
        <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center pb-8 md:pb-14">
          Works
        </h5>

        {/* First Row - Shorts */}
        <div className="pb-8 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8 mb-6">
          <h6 className="text-primary text-2xl md:text-4xl font-medium text-center md:text-left pb-10 md:pb-14">Shorts</h6>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
          >
            {WorksDataShorts.map((work, index) => (
              <SwiperSlide key={index}>
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="relative block">
                  <img src={work.image_path} alt={`Short ${index + 1}`} className="rounded-lg cursor-pointer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-icon">
                      <i className="bi bi-play-circle-fill text-4xl text-white"></i> {/* Adjust size and color as needed */}
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Second Row - Long Form Content */}
        <div className="pb-8 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8 mb-8">
          <h6 className="text-primary text-2xl md:text-4xl font-medium text-center md:text-left pb-10 md:pb-14">Long Form Content</h6>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
          >
            {WorksDataLong.map((work, index) => (
              <SwiperSlide key={index}>
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="relative block">
                  <img src={work.image_path} alt={`Long Form ${index + 1}`} className="rounded-lg cursor-pointer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-icon">
                      <i className="bi bi-play-circle-fill text-4xl text-white"></i> {/* Adjust size and color as needed */}
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center">
<Link to="/works">
<button className="primary-btn">See More Works</button>
</Link>         
 

        </div>
      </section>
    
    </div>
  );
};  

export default Works;
