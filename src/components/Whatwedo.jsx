import React from 'react';
import { Whatwedo_Data } from '../utils/data';

const Whatwedo = () => {
  return (
    <div>
      <section className="max-w-screen-xl px-6 mx-auto pb-20 mt-8" id='whatwedo'>
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8">
          <h5 className="text-xl font-medium mb-5">What We Do ?</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Whatwedo_Data.map((data) => (
              <WhatWeDoCards
                key={data.Id}
                icon={data.Icon}
                title={data.Title}
                comment={data.Comment}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const WhatWeDoCards = ({ icon, title, comment }) => {
  return (
    <div className="bg-slate-900 rounded border border-blue-900 p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-base">{title}</p>
        <i className={`bi ${icon} text-primary text-3xl`}></i>
      </div>
      <p className="text-xs font-light leading-5 opacity-80">{comment}</p>
    </div>
  );
};

export default Whatwedo;
