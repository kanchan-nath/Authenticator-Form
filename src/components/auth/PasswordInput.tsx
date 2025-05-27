import React, { useState } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { gsap } from 'gsap';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  id, 
  label, 
  registration, 
  error 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    // Animate the icon switch
    const iconElement = document.getElementById(`${id}-toggle-icon`);
    if (iconElement) {
      gsap.fromTo(
        iconElement,
        { rotationY: 0 },
        { rotationY: 180, duration: 0.4, ease: 'power2.inOut' }
      );
    }
    
    setShowPassword(prev => !prev);
  };
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`block w-full pl-10 pr-10 py-2 border ${error ? 'border-error-400' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors`}
          placeholder="••••••••"
          {...registration}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            id={`${id}-toggle-icon`}
            onClick={togglePasswordVisibility}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-1 flex items-center text-error-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;