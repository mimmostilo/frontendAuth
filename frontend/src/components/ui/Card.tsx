import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, subtitle, actions, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ${className}`}
        {...props}
      >
        {(title || subtitle || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 pb-4 space-y-2 sm:space-y-0">
            <div>
              {title && (
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        )}
        <div className={title || subtitle || actions ? 'p-6 pt-0' : 'p-6'}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;