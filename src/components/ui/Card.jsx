import React from 'react';

/**
 * Card Component - A flexible container with multiple variants and styling options
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.variant - Card style variant ('default', 'elevated', 'outlined', 'gradient')
 * @param {string} props.padding - Padding size ('sm', 'md', 'lg', 'xl')
 * @param {boolean} props.hoverable - Adds hover effects when true
 * @param {boolean} props.clickable - Makes card clickable with cursor pointer
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @param {Function} props.onClick - Click handler (when clickable)
 * @param {string} props.role - ARIA role for accessibility
 */
const Card = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  children,
  onClick,
  role = 'article',
  ...props
}) => {
  // Base card classes
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    gradient: 'bg-gradient-to-br from-cyber-blue to-cyber-purple text-white border-0',
    dark: 'bg-gray-800 border border-gray-700 text-white'
  };
  
  // Padding-specific classes
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  // Interactive classes
  const interactiveClasses = clickable ? 'cursor-pointer' : '';
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:scale-105' : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${hoverClasses} ${className}`;
  
  // Handle click
  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };
  
  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      role={role}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 