import React, { memo } from 'react';

const TimeonLogo = memo(function TimeonLogo({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Timeon logo"
    >
      <rect x="4" y="10" width="40" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <rect
        x="4"
        y="10"
        width="40"
        height="28"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="14" y1="30" x2="18" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="20" x2="28" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="24" x2="26" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="24" r="2.5" fill="currentColor" />
      <circle cx="14" cy="30" r="2" fill="currentColor" />
      <circle cx="26" cy="34" r="2" fill="currentColor" />
    </svg>
  );
});

export default TimeonLogo;
