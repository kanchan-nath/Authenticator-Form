import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ShieldCheck } from 'lucide-react';

type AuthMode = 'login' | 'register';

const AuthLayout: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Initialize entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    
    tl.fromTo(
      backgroundRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
      "-=0.8"
    );
    
    // Initialize mouse move effect for background
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) * 2 - 1;
      const yPos = (clientY / window.innerHeight) * 2 - 1;
      
      gsap.to(backgroundRef.current, {
        x: xPos * 10,
        y: yPos * 10,
        duration: 1,
        ease: 'power1.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const switchAuthMode = (mode: AuthMode) => {
    if (authMode === mode || isTransitioning) return;
    
    setIsTransitioning(true);
    
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setAuthMode(mode);
        gsap.to(containerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => setIsTransitioning(false)
        });
      }
    });
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden" data-scroll>
      <div 
        ref={backgroundRef}
        className="absolute w-full h-full top-0 left-0 opacity-70"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(147, 197, 253, 0.4) 0%, rgba(196, 181, 253, 0.4) 50%, rgba(94, 234, 212, 0.3) 100%)',
          filter: 'blur(80px)',
          zIndex: -1 
        }}
      />
      
      <div 
        ref={containerRef}
        className="w-full max-w-md relative"
        data-scroll
        data-scroll-speed="0.1"
      >
        <div className="bg-white/80 backdrop-blur-xl shadow-glass rounded-2xl overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center pt-6">
            <div className="p-2 bg-primary-50 rounded-full">
              <ShieldCheck className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {authMode === 'login' ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-gray-600 mt-1">
                {authMode === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Fill in your details to get started'
                }
              </p>
            </div>
            
            {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {authMode === 'login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
                <button 
                  onClick={() => switchAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-primary-600 font-medium hover:text-primary-700 focus:outline-none transition-colors"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;