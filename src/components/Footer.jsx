import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure to include Bootstrap Icons CSS
import { Hero_Data } from '../utils/data';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-950 to-slate-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <img className="w-auto h-20" src={Hero_Data.HeroPicture} alt="Logo" />
          </a>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <a href="#hero" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Home"> Home </a>
            <a href="#about" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="About"> About </a>
            <a href="#works" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Teams"> Works </a>
            <a href="#showreel" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Privacy"> Showreel </a>
          </div>
         
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          
          <p className="text-sm text-gray-500 dark:text-gray-300">© KV Media Works.</p>

          

          <div className="flex -mx-2">
            
            

            <a href="https://www.instagram.com/kv_mediaworks/#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Instagram">
              <i className="bi bi-instagram w-5 h-5"></i>
            </a>

            <a href="mailto:mediaworkskv@gmail.com" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Email">
              <i className="bi bi-envelope w-5 h-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
