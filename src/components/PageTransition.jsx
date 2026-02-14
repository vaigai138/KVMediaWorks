import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAnimating(true);
    setDisplayChildren(children);
    const timer = setTimeout(() => setIsAnimating(false), 50);
    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div
      className={isAnimating ? '' : 'page-enter'}
      style={{ minHeight: '100vh' }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
