import React from 'react';

/**
 * Apple-style Input component
 */
function Input({ className = '', error = false, ...props }) {
  const errorClasses = error 
    ? 'border-[var(--w-rose-300)] focus:ring-[var(--w-rose-300)]' 
    : 'border-[var(--w-border)] focus:ring-[var(--w-rose-300)]';
  
  return (
    <input
      className={`input-apple ${errorClasses} ${className}`}
      {...props}
    />
  );
}

export default Input;

