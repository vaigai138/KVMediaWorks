import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { CgMenuMotion } from 'react-icons/cg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Testimonials', path: '/testimonials' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/web.png" alt="KV Media Works" className="h-9 w-auto" />
            <span className="text-white font-medium text-subheading hidden sm:block">
              KV Media Works
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-caption tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-white/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden lg:flex btn-primary">
              Contact
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 text-xl text-white/70 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex items-center justify-center rounded-sm lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <RiCloseFill /> : <CgMenuMotion />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-background border-l border-white/[0.06] flex flex-col page-enter">
            <div className="h-20 flex items-center px-8 border-b border-white/[0.06]">
              <span className="text-white font-medium text-subheading">
                Menu
              </span>
            </div>
            <nav className="flex-1 px-8 py-10">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block py-3 text-body-lg transition-colors duration-300 ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-white/60'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-8 pb-10">
              <Link
                to="/contact"
                className="btn-primary w-full text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
