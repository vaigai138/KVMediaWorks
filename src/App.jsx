import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Showreel from './components/Showreel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Whatwedo from './components/Whatwedo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoreWorks from './components/MoreWorks';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route
          path="/"
          element={
            <div className="bg-background">
              <div
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 70, 200, 0.2), rgba(0, 30, 60, 0.1))`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  height: '100%',
                  paddingBottom: '50px',
                }}
              >
                <Navbar />
                <Hero />
              </div>
              <About />
              <Works />
              <Showreel />
              <Whatwedo />
              <Contact />
              <Footer />
            </div>
          }
        />
        {/* Route for the MoreWorks page */}
        <Route path="/works" element={<MoreWorks />}/>
      </Routes>
    </Router>
  );
};

export default App;
