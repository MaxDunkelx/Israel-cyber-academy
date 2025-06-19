import React from 'react';

/**
 * Badge Component - A small status indicator or label with multiple variants
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge style variant ('default', 'success', 'warning', 'error', 'info', 'primary')
 * @param {string} props.size - Badge size ('sm', 'md', 'lg')
 * @param {boolean} props.removable - Shows remove button when true
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Badge content
 * @param {Function} props.onRemove - Remove handler (when removable)
 * @param {string} props.ariaLabel - Accessibility label
 */
const Badge = ({
  variant = 'default',
  size = 'md',
  removable = false,
  className = '',
  children,
  onRemove,
  ariaLabel,
  ...props
}) => {
  // Base badge classes
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    primary: 'bg-cyber-blue text-white'
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  
  // Remove button classes
  const removeButtonClasses = 'mr-1 ml-1.5 rounded-full hover:bg-black/10 transition-colors';
  
  // Combine all classes
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Handle remove
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  
  return (
    <span
      className={badgeClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          className={removeButtonClasses}
          onClick={handleRemove}
          aria-label="Remove badge"
        >
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge; 