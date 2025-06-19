import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button Component - A versatile, accessible button with multiple variants
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'outline', 'ghost', 'danger')
 * @param {string} props.size - Button size ('sm', 'md', 'lg', 'xl')
 * @param {boolean} props.loading - Shows loading spinner when true
 * @param {boolean} props.disabled - Disables the button
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {string} props.ariaLabel - Accessibility label
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-cyber-blue hover:bg-blue-700 text-white focus:ring-cyber-blue shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-600',
    outline: 'border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white focus:ring-cyber-blue',
    ghost: 'text-cyber-blue hover:bg-cyber-blue/10 focus:ring-cyber-blue',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 shadow-lg hover:shadow-xl',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-600 shadow-lg hover:shadow-xl'
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Handle click with loading state
  const handleClick = (e) => {
    if (!loading && !disabled && onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button; 