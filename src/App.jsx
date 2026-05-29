import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import AdminRoute from './components/admin/AdminRoute';
import HomePage from './pages/HomePage';

// Lazy-load secondary pages — only HomePage loads eagerly
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin panel (lazy — never loaded for normal visitors)
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const AdminPageMeta = lazy(() => import('./pages/admin/PageMeta'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

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

/* Public site — full chrome (navbar, footer, cursor, transitions) */
const PublicSite = () => (
  <>
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
  </>
);

/* Admin panel — no public chrome */
const AdminApp = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/new" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
      <Route path="/admin/edit/:slug" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
      <Route path="/admin/seo" element={<AdminRoute><AdminPageMeta /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
    </Routes>
  </Suspense>
);

const AppContent = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return isAdmin ? <AdminApp /> : <PublicSite />;
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
