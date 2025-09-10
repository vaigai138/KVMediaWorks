import React, { useState } from 'react';
import {
  FaRegPlayCircle,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const shortFormVideos = [
  { 
    client: 'Scratch Learn',   
    title: 'Short Video 1', 
    link: 'https://www.youtube.com/embed/lXWFcj6dhOs', 
    thumbnail: 'https://img.youtube.com/vi/lXWFcj6dhOs/maxresdefault.jpg' 
  },
  { 
    client: 'Santu In UK', 
    title: 'Short Video 2', 
    link: 'https://www.youtube.com/embed/iJyzJXLGp9E', 
    thumbnail: 'https://img.youtube.com/vi/iJyzJXLGp9E/maxresdefault.jpg' 
  },
  { 
    client: 'Santu In UK', 
    title: 'Short Video 3', 
    link: 'https://www.youtube.com/embed/SFpCJlJHPG8', 
    thumbnail: 'https://img.youtube.com/vi/SFpCJlJHPG8/maxresdefault.jpg' 
  },
  { 
    client: 'Santu In UK', 
    title: 'Short Video 4', 
    link: 'https://www.youtube.com/embed/sRKKLyJdM1A', 
    thumbnail: 'https://img.youtube.com/vi/sRKKLyJdM1A/maxresdefault.jpg' 
  },
  { 
    client: 'Spyka', 
    title: 'Short Video 5', 
    link: 'https://www.youtube.com/embed/KN5E0ZKDaUU', 
    thumbnail: 'https://img.youtube.com/vi/KN5E0ZKDaUU/maxresdefault.jpg' 
  },
  { 
    client: 'InkCharts', 
    title: 'Short Video 6', 
    link: 'https://www.youtube.com/embed/GlXPyudoCFk', 
    thumbnail: 'https://img.youtube.com/vi/GlXPyudoCFk/maxresdefault.jpg' 
  },
  { 
    client: 'InkCharts', 
    title: 'Short Video 7', 
    link: 'https://www.youtube.com/embed/vnhVPFN9KvY', 
    thumbnail: 'https://img.youtube.com/vi/vnhVPFN9KvY/maxresdefault.jpg' 
  },
  { 
    client: 'InkCharts', 
    title: 'Short Video 8', 
    link: 'https://www.youtube.com/embed/GkCpfK1i06E', 
    thumbnail: 'https://img.youtube.com/vi/GkCpfK1i06E/maxresdefault.jpg' 
  },
  { 
    client: 'Game Changer', 
    title: 'Short Video 9', 
    link: 'https://www.youtube.com/embed/65-eTqZ5ni4', 
    thumbnail: 'https://img.youtube.com/vi/65-eTqZ5ni4/maxresdefault.jpg' 
  },
  { 
    client: 'Dr.Balaji', 
    title: 'Short Video 10', 
    link: 'https://www.youtube.com/embed/vkmUe7dujs8', 
    thumbnail: 'https://img.youtube.com/vi/vkmUe7dujs8/maxresdefault.jpg' 
  },
  { 
    client: 'Spyka', 
    title: 'Short Video 11', 
    link: 'https://www.youtube.com/embed/your_short_link11', 
    thumbnail: 'https://img.youtube.com/vi/your_short_link11/maxresdefault.jpg' 
  },
  { 
    client: 'Scratch Learn', 
    title: 'Short Video 12', 
    link: 'https://www.youtube.com/embed/your_short_link12', 
    thumbnail: 'https://img.youtube.com/vi/your_short_link12/maxresdefault.jpg' 
  },
];


const longFormVideos = [
  { client: 'Santu UK', title: 'Long Video Intro', link: 'https://www.youtube.com/embed/Ijhy7m2sDeA', thumbnail: 'https://img.youtube.com/vi/Ijhy7m2sDeA/maxresdefault.jpg' },
  { client: 'Focas', title: 'Long Video', link: 'https://www.youtube.com/embed/5D31g4eMFbA', thumbnail: 'https://img.youtube.com/vi/5D31g4eMFbA/maxresdefault.jpg' },
  { client: 'Santu UK', title: 'Long Video 01', link: 'https://www.youtube.com/embed/gYVne66AaxE', thumbnail: 'https://img.youtube.com/vi/gYVne66AaxE/maxresdefault.jpg' },
  { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/9KICweMciK4', thumbnail: 'https://img.youtube.com/vi/9KICweMciK4/maxresdefault.jpg' },
  { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/_Cao_r2swWQ', thumbnail: 'https://img.youtube.com/vi/_Cao_r2swWQ/maxresdefault.jpg' },
  { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/ta5uEqzhTBo', thumbnail: 'https://img.youtube.com/vi/ta5uEqzhTBo/maxresdefault.jpg' },
];

const MoreWorks = () => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const renderShorts = (start, end) =>
    shortFormVideos.slice(start, end).map((video, index) => {
      const id = `short-${start + index}`;
      const isPlaying = playingIndex === id;
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={id}
          className="relative group aspect-[9/16] rounded-lg overflow-hidden"
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`${video.link}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                onClick={() => setPlayingIndex(id)}
              />
              <div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center"
                onClick={() => setPlayingIndex(id)}
              >
                <FaRegPlayCircle className="text-white text-6xl mb-2" />
                <div className="text-white text-sm font-semibold">{video.title}</div>
                <div className="text-white text-xs italic">{video.client}</div>
              </div>
            </>
          )}
        </motion.div>
      );
    });

  const renderLongs = (start, end) =>
    longFormVideos.slice(start, end).map((video, index) => {
      const id = `long-${start + index}`;
      const isPlaying = playingIndex === id;
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={id}
          className="relative group aspect-video rounded-lg overflow-hidden"
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`${video.link}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                onClick={() => setPlayingIndex(id)}
              />
              <div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center"
                onClick={() => setPlayingIndex(id)}
              >
                <FaRegPlayCircle className="text-white text-6xl mb-2" />
                <div className="text-white text-sm font-semibold">{video.title}</div>
                <div className="text-white text-xs italic">{video.client}</div>
              </div>
            </>
          )}
        </motion.div>
      );
    });

  return (
    <>
      {/* Stats Section */}
      

      {/* Client Works Section */}
      <motion.section
        id="moreworks"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-screen-xl mx-auto px-6 pb-0 mt-6"
      >
        <h5 className="text-primary text-3xl md:text-5xl font-extrabold text-center pb-2 font-serif tracking-wide">
          Client Works 🎬
        </h5>
        <p className="text-center text-blue-300 italic text-md md:text-lg">
          “Bringing stories to life, one frame at a time.”
        </p>

        <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-screen-xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <CountUp end={450} duration={3} />+
            </h3>
            <p className="text-gray-300 mt-2">Videos Edited</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <CountUp end={50} duration={3} />+
            </h3>
            <p className="text-gray-300 mt-2">Clients Worked With</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <CountUp end={3} duration={3} />+
            </h3>
            <p className="text-gray-300 mt-2">Years Experience</p>
          </div>
        </div>
      </motion.section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {renderShorts(0, 4)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {renderLongs(0, 3)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {renderShorts(4, 8)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {renderLongs(3, 6)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {renderShorts(8, 12)}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 mt-10"
      >
        <div className="max-w-screen-md mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let’s Work Together 🚀
          </h3>
          <p className="text-gray-300 mb-8">
            Have a project in mind? Reach out and let’s bring your vision to
            life.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <a
              href="mailto:vaigaivendhan138@gmail.com"
              className="flex items-center gap-2 text-white hover:text-primary transition"
            >
              <FaEnvelope className="text-xl" /> vaigaivendhan138@gmail.com
            </a>
            <a
              href="tel:+917604895101"
              className="flex items-center gap-2 text-white hover:text-primary transition"
            >
              <FaPhone className="text-xl" /> +91 7604895101
            </a>
          </div>

          <div className="flex justify-center gap-6 text-white text-2xl">
            <a
              href="https://instagram.com/imkv__"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="http://linkedin.com/in/vaigai-vendhan-9b142b258"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default MoreWorks;
