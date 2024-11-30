import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';

// Import client data
import { BeardoShorts, NishkaShorts, VivinShorts, ALArogyaShorts, NiveaShorts, BusinessShorts, DivyaRavirajShorts, AdvertisementShorts } from '../utils/moreworks/shorts/shorts';
import { BeardoLong, NiveaLong } from '../utils/moreworks/longs/longs';

const MoreWorks = () => {
  // State to track which thumbnail is clicked for each client
  const [clickedShorts, setClickedShorts] = useState({});
  const [clickedLongs, setClickedLongs] = useState({});

  // Combine clients' data dynamically
  const shortsClients = [
    { name: "Beardo", data: BeardoShorts },
    { name: "Dr. Nishka", data: NishkaShorts },
    { name: "Dr. Vivin", data: VivinShorts },
    { name: "AL Arogya", data: ALArogyaShorts },
    { name: "Dr. Nivea", data: NiveaShorts },
    { name: "Business", data: BusinessShorts },
    { name: "Divya Raviraj", data: DivyaRavirajShorts },
    { name: "Ad Videos", data: AdvertisementShorts }
  ];

  const longClients = [
    { name: "Beardo", data: BeardoLong },
    { name: "Dr. Nivea", data: NiveaLong }
  ];

  // Function to handle click event on thumbnail for short videos
  const handleThumbnailClickShort = (clientIndex, index) => {
    setClickedShorts(prevState => ({
      ...prevState,
      [clientIndex]: index
    }));
  };

  // Function to handle click event on thumbnail for long videos
  const handleThumbnailClickLong = (clientIndex, index) => {
    setClickedLongs(prevState => ({
      ...prevState,
      [clientIndex]: index
    }));
  };

  return (
    <div>
      <section className="max-w-screen-xl mx-auto px-6 pb-0 mt-6" id="moreworks">
        <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center pb-8 md:pb-14">Works</h5>

        {/* Short Form Content Section */}
        <div className="pb-8 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8 mb-6">
          <h6 className="text-primary text-2xl md:text-4xl font-medium text-center md:text-left pb-10 md:pb-14">Short Form Content</h6>
          {shortsClients.map((client, clientIndex) => (
            <div key={clientIndex}>
              <h6 className="text-primary text-xl font-medium pb-6 mt-3">{client.name}</h6>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Pagination, Navigation]}
              >
                {client.data.map((work, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative block">
                      {/* Show thumbnail image only if it hasn't been clicked */}
                      {clickedShorts[clientIndex] !== idx && (
                        <div className="relative w-full">
                          {/* Thumbnail image */}
                          <img
                            src={work.coverImage}
                            alt={`${client.name} Short ${idx + 1}`}
                            className="rounded-lg w-full cursor-pointer"
                            onClick={() => handleThumbnailClickShort(clientIndex, idx)} // Handle click
                          />

                          {/* Play button */}
                          <div className="absolute inset-0 flex justify-center items-center">
                            <button
                              onClick={() => handleThumbnailClickShort(clientIndex, idx)} // Handle play button click
                              className="bg-opacity-60 text-primary rounded-full p-4 hover:bg-opacity-80 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-12 h-12"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 3l14 9-14 9V3z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Show video only if the thumbnail is clicked */}
                      {clickedShorts[clientIndex] === idx && (
                        <iframe
                          width="100%" // Set iframe width to 100% of the container
                          height="320" // Set iframe height (can be adjusted if needed)
                          src={work.videoLink}
                          className="rounded-lg responsive-iframe"
                          title={`${client.name} Short ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>

        {/* Long Form Content Section */}
        <div className="pb-8 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8 mb-8">
          <h6 className="text-primary text-2xl md:text-4xl font-medium text-center md:text-left pb-10 md:pb-14">Long Form Content</h6>
          {longClients.map((client, clientIndex) => (
            <div key={clientIndex}>
              <h6 className="text-primary text-xl font-medium pb-6">{client.name}</h6>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                modules={[Pagination, Navigation]}
              >
                {client.data.map((work, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative block">
                      {/* Show thumbnail image only if it hasn't been clicked */}
                      {clickedLongs[clientIndex] !== idx && (
                        <div className="relative w-full">
                          {/* Thumbnail image */}
                          <img
                            src={work.coverImage}
                            alt={`${client.name} Long ${idx + 1}`}
                            className="rounded-lg w-full cursor-pointer"
                            onClick={() => handleThumbnailClickLong(clientIndex, idx)} // Handle click
                          />

                          {/* Play button */}
                          <div className="absolute inset-0 flex justify-center items-center">
                            <button
                              onClick={() => handleThumbnailClickLong(clientIndex, idx)} // Handle play button click
                              className="text-primary rounded-full p-4 hover:bg-opacity-80 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-12 h-12"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 3l14 9-14 9V3z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Show video only if the thumbnail is clicked */}
                      {clickedLongs[clientIndex] === idx && (
                        <iframe
                          width="100%" // Set iframe width to 100% of the container
                          height="100%" // Set iframe height (it will take the full container height)
                          src={work.videoLink}
                          title={`${client.name} Long ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoreWorks;
