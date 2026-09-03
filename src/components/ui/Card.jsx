import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, elevated = false, hover = false }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-lg border border-[rgba(255,255,255,0.08)] p-4 transition-all',
          elevated ? 'bg-dark-elevated' : 'bg-dark-panel',
          hover && 'hover:border-[rgba(255,255,255,0.15)] hover:shadow-lg hover:shadow-black/20',
          className
        )
      )}
    >
      {children}
    </div>
  );
};