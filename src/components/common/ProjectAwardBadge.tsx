import React from 'react';

interface ProjectAwardBadgeProps {
  text: string;
  color?: string;
  className?: string;
}

export function ProjectAwardBadge({
  text,
  color = '#E6C687',
  className = '',
}: ProjectAwardBadgeProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        textAlign: 'center',
        color,
        userSelect: 'none',
      }}
    >
      {/* Left Laurel Branch */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 32 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path
          d="M 28 42 C 14 38, 4 28, 4 16 C 4 9, 8 4, 15 2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaves along curve */}
        <path d="M 24 40 C 18 42, 12 40, 10 36 C 14 33, 20 34, 24 40 Z" fill={color} />
        <path d="M 18 35 C 10 38, 5 34, 4 28 C 9 27, 15 30, 18 35 Z" fill={color} />
        <path d="M 11 28 C 4 29, 0 24, 0 18 C 5 18, 10 22, 11 28 Z" fill={color} />
        <path d="M 8 20 C 2 18, 0 12, 2 7 C 6 9, 8 15, 8 20 Z" fill={color} />
        <path d="M 8 13 C 4 9, 5 4, 10 1 C 12 5, 11 10, 8 13 Z" fill={color} />
        <path d="M 14 4 C 13 1, 15 -1, 18 -1 C 18 2, 16 4, 14 4 Z" fill={color} />
      </svg>

      {/* Award Text */}
      <span
        style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          lineHeight: 1.3,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      >
        {text}
      </span>

      {/* Right Laurel Branch (Mirrored) */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 32 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transform: 'scaleX(-1)' }}
        aria-hidden="true"
      >
        <path
          d="M 28 42 C 14 38, 4 28, 4 16 C 4 9, 8 4, 15 2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 24 40 C 18 42, 12 40, 10 36 C 14 33, 20 34, 24 40 Z" fill={color} />
        <path d="M 18 35 C 10 38, 5 34, 4 28 C 9 27, 15 30, 18 35 Z" fill={color} />
        <path d="M 11 28 C 4 29, 0 24, 0 18 C 5 18, 10 22, 11 28 Z" fill={color} />
        <path d="M 8 20 C 2 18, 0 12, 2 7 C 6 9, 8 15, 8 20 Z" fill={color} />
        <path d="M 8 13 C 4 9, 5 4, 10 1 C 12 5, 11 10, 8 13 Z" fill={color} />
        <path d="M 14 4 C 13 1, 15 -1, 18 -1 C 18 2, 16 4, 14 4 Z" fill={color} />
      </svg>
    </div>
  );
}
