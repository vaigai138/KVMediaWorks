import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Works.css"

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../assets/1.jpg';
import slide_image_2 from '../assets/2.jpg';
import slide_image_3 from '../assets/3.jpg';
import slide_image_4 from '../assets/4.jpg';
import slide_image_5 from '../assets/1.jpg';
import slide_image_6 from '../assets/2.jpg';
import slide_image_7 from '../assets/3.jpg';


const imageLinks = [
    {
    link1:'https://drive.google.com/file/d/1D7hhedPNJes2hm0qqNkJR8VACU6H8pmM/view?usp=drive_link'
    },
    {
        link2:'https://drive.google.com/file/d/1fLCuIA7d_XrEnj2JdIbG7_FFGzYFj2we/view?usp=drive_link'

    }
    ,
    {
link3:'https://drive.google.com/file/d/1FMadm20IWdxzltb3oQohMW-JZMG8SVLe/view?usp=drive_link'
    }
    ,
    {
link4:'https://drive.google.com/file/d/1ODqFGZ2NWWIleUxRs4SfBRa7ODfu7YfO/view?usp=drive_link'
    }
    ,{
link5:'https://drive.google.com/file/d/1_f16U5W-blQUC1VScMke9EqnNQdQLzG6/view?usp=drive_link'
    }
    ,{
link6:'https://drive.google.com/file/d/1rKxuoe-DeCw9R4A5U4tNHhP8LwJUkKmA/view?usp=drive_link'
    }
    ,{
link7:'https://drive.google.com/file/d/1BOAHXsM4BtOLeG84i7LJVLxEilAhn2qc/view?usp=drive_link'
    }
    ,
  ];

function App() {
  return (
    <div className="container" id='works'>
      <h1 className="heading">Our Works</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3} 
        spaceBetween={10}   
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,  
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <a href="https://drive.google.com/file/d/1D7hhedPNJes2hm0qqNkJR8VACU6H8pmM/view?usp=drive_link"><img src={slide_image_1} alt="slide_image" className='slider-img'/></a>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} alt="slide_image" className='slider-img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} alt="slide_image" className='slider-img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} alt="slide_image" className='slider-img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} alt="slide_image" className='slider-img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} alt="slide_image" className='slider-img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_7} alt="slide_image" className='slider-img'/>
        </SwiperSlide>

        <div className="slider-controler">
          {/* <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div> */}
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
      <div className="see-more">
      <button className="see-more-btn">
        <a href='https://drive.google.com/drive/folders/1a2Xgpm2wWNyjmtJEmpkUk_C15tCHyFRD'>See More Works</a>
        </button>
        <hr />
      </div>
    </div>
  );
}

export default App;
