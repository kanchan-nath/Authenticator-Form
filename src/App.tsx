import React, { useEffect } from 'react';
import AuthLayout from './components/auth/AuthLayout';
import { initLocomotive } from './utils/locomotiveScroll';

function App() {
  useEffect(() => {
    // Initialize locomotive scroll
    const scroll = initLocomotive();
    
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50" data-scroll-container>
      <AuthLayout />
    </div>
  );
}

export default App;