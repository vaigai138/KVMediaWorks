import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';

// Lazy-load secondary pages — only HomePage loads eagerly
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

/* Loading fallback — spinner with brand styling */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#020e2b' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30">Loading</p>
    </div>
  </div>
);

/* 404 Page */
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#020e2b' }}>
    <div className="text-center">
      <p className="text-[8rem] md:text-[12rem] font-bold leading-none text-white/[0.04]">404</p>
      <h1 className="text-display-sm text-white -mt-8 mb-4">Page not found</h1>
      <p className="text-body text-white/50 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <main>
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Legacy route */}
              <Route path="/works" element={<PortfolioPage />} />
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
