import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { LogIn, Mail, AlertCircle } from 'lucide-react';
import PasswordInput from './PasswordInput';
import Notification from './Notification';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });
  
  // Animation for form elements
  useEffect(() => {
    if (!formRef.current) return;
    
    const formElements = formRef.current.querySelectorAll('.form-element');
    
    gsap.fromTo(
      formElements,
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.4, 
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }, []);
  
  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    console.log('Login data:', data);
    
    // Add animation for button during submission
    if (formRef.current) {
      const button = formRef.current.querySelector('button[type="submit"]');
      
      gsap.to(button, { 
        scale: 0.95, 
        duration: 0.1, 
        yoyo: true, 
        repeat: 1 
      });
    }
    
    // In a real application, you would handle authentication here
    // For example with Firebase:
    // await signInWithEmailAndPassword(auth, data.email, data.password);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success notification
    setShowNotification(true);
  };
  
  return (
    <>
      {showNotification && (
        <Notification
          message="Successfully signed in!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="form-element">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-error-400' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                placeholder="kanchannath.webdev@gmail.com"
              />
            </div>
            {errors.email && (
              <div className="mt-1 flex items-center text-error-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>
          
          <div className="form-element">
            <PasswordInput
              id="password"
              label="Password"
              registration={register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={errors.password}
            />
          </div>
          
          <div className="form-element flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <button type="button" className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none transition-colors">
                Forgot password?
              </button>
            </div>
          </div>
          
          <div className="form-element">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;