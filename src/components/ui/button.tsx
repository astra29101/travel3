
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  // Base styles
  let buttonClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Size variations
  switch (size) {
    case 'sm':
      buttonClasses += ' h-8 px-3 text-xs';
      break;
    case 'lg':
      buttonClasses += ' h-12 px-6 text-base';
      break;
    default: // md
      buttonClasses += ' h-10 px-4 py-2 text-sm';
  }
  
  // Variant styles
  switch (variant) {
    case 'outline':
      buttonClasses += ' border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50';
      break;
    case 'ghost':
      buttonClasses += ' bg-transparent text-gray-700 hover:bg-gray-100';
      break;
    default: // default
      buttonClasses += ' bg-blue-600 text-white hover:bg-blue-700';
  }
  
  return (
    <button className={`${buttonClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
