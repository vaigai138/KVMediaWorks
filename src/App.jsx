import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/whatWeDo';
import OurWorks from './components/Works';
import FAQ from './components/Faq';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import './App.css'; // Make sure your CSS file is imported globally

function App() {
  return (
    <Router>
      {/* Wrap everything inside a main container to retain styles */}
      <div className="app-wrapper">
        {/* Always render the Navbar and Footer regardless of the route */}
        <Navbar />

        {/* Route handling for content */}
        <Routes>
          {/* Main page route */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <About />
                <WhatWeDo />
                <OurWorks />
                <FAQ />
                <GetStarted />
              </>
            } 
          />

          {/* Terms and Conditions route */}
          <Route 
            path="/terms-and-conditions" 
            element={<TermsAndConditions />} 
          />
        </Routes>

        {/* Always render the Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
