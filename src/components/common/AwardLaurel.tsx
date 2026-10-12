import React from 'react';

interface AwardLaurelProps {
  topText?: string;
  title?: string;
  category?: string;
  year?: string | number;
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function AwardLaurel({
  topText = 'OFFICIAL SELECTION',
  title = 'WINNER',
  category = 'BEST DESIGN',
  year = '2026',
  color = '#C5A059',
  width = 240,
  height = 192,
  className = '',
}: AwardLaurelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${title} - ${category}`}
    >
      <defs>
        <g id="laurel-leaf-branch">
          <path
            d="M 190 280 C 120 270, 70 210, 70 140 C 70 85, 110 35, 175 20"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaves Pair 1 */}
          <path d="M 175 272 C 160 280, 145 282, 135 278 C 145 270, 160 268, 175 272 Z" fill={color} />
          <path d="M 160 276 C 145 288, 130 292, 120 286 C 132 278, 148 274, 160 276 Z" fill={color} />
          {/* Leaves Pair 2 */}
          <path d="M 140 250 C 120 260, 102 260, 95 252 C 108 244, 126 244, 140 250 Z" fill={color} />
          <path d="M 125 254 C 105 268, 88 270, 80 260 C 95 250, 112 248, 125 254 Z" fill={color} />
          {/* Leaves Pair 3 */}
          <path d="M 110 220 C 90 230, 72 226, 66 216 C 80 210, 98 212, 110 220 Z" fill={color} />
          <path d="M 96 222 C 74 234, 58 232, 52 220 C 68 212, 84 214, 96 222 Z" fill={color} />
          {/* Leaves Pair 4 */}
          <path d="M 88 180 C 68 188, 52 180, 48 168 C 62 165, 78 170, 88 180 Z" fill={color} />
          <path d="M 75 180 C 54 188, 38 182, 34 168 C 50 164, 65 170, 75 180 Z" fill={color} />
          {/* Leaves Pair 5 */}
          <path d="M 74 140 C 56 142, 42 132, 40 120 C 54 120, 67 128, 74 140 Z" fill={color} />
          <path d="M 64 136 C 44 136, 30 124, 28 110 C 44 112, 56 122, 64 136 Z" fill={color} />
          {/* Leaves Pair 6 */}
          <path d="M 75 100 C 60 98, 48 85, 50 72 C 63 76, 72 88, 75 100 Z" fill={color} />
          <path d="M 68 94 C 50 88, 40 74, 44 60 C 58 66, 66 80, 68 94 Z" fill={color} />
          {/* Leaves Pair 7 */}
          <path d="M 90 64 C 80 56, 72 40, 78 28 C 90 36, 94 50, 90 64 Z" fill={color} />
          <path d="M 86 56 C 72 46, 68 30, 76 18 C 88 28, 90 44, 86 56 Z" fill={color} />
          {/* Leaves Pair 8 */}
          <path d="M 120 36 C 114 24, 112 8, 124 2 C 130 14, 130 28, 120 36 Z" fill={color} />
          <path d="M 124 28 C 118 14, 120 0, 132 -4 C 136 10, 134 22, 124 28 Z" fill={color} />
          {/* Tip Leaf */}
          <path d="M 160 22 C 160 8, 168 -4, 180 -6 C 180 8, 174 18, 160 22 Z" fill={color} />
        </g>
      </defs>

      {/* Left Branch */}
      <use href="#laurel-leaf-branch" />

      {/* Right Branch (Mirrored) */}
      <use href="#laurel-leaf-branch" transform="translate(400, 0) scale(-1, 1)" />

      {/* Center Typography */}
      {topText && (
        <text
          x="200"
          y="115"
          textAnchor="middle"
          fill={color}
          fontFamily="'Times New Roman', Georgia, serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="3"
        >
          {topText}
        </text>
      )}

      {title && (
        <>
          <line x1="140" y1="130" x2="260" y2="130" stroke={color} strokeWidth="1.5" />
          <text
            x="200"
            y="165"
            textAnchor="middle"
            fill={color}
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="28"
            fontWeight="900"
            letterSpacing="2"
          >
            {title}
          </text>
          <line x1="140" y1="180" x2="260" y2="180" stroke={color} strokeWidth="1.5" />
        </>
      )}

      {category && (
        <text
          x="200"
          y="205"
          textAnchor="middle"
          fill={color}
          fontFamily="'Times New Roman', Georgia, serif"
          fontSize="14"
          fontWeight="600"
          letterSpacing="2"
        >
          {category}
        </text>
      )}

      {year && (
        <text
          x="200"
          y="228"
          textAnchor="middle"
          fill={color}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="3"
        >
          {year}
        </text>
      )}
    </svg>
  );
}
