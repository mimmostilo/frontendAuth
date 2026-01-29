import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

const SkeletonLoader = ({ 
  count = 1, 
  height = '20px', 
  width = '100%', 
  className = '', 
  variant = 'rectangular' 
}: SkeletonLoaderProps) => {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md";
  
  const variantClasses = {
    text: "h-4",
    rectangular: "h-10",
    circular: "rounded-full",
  };
  
  const elements = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        height: variant === 'text' ? undefined : height,
        width: variant === 'circular' ? height : width,
      }}
    />
  ));
  
  return <>{elements}</>;
};

export default SkeletonLoader;