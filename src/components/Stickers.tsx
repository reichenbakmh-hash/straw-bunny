import React from 'react'

type StickerProps = { className?: string; size?: number }

export const FlowerSticker: React.FC<StickerProps> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse key={deg} cx="20" cy="11" rx="6" ry="9" fill="#FFB6C9" transform={`rotate(${deg} 20 20)`} opacity="0.9" />
    ))}
    <circle cx="20" cy="20" r="5.5" fill="#FFE0EA" stroke="#F4658F" strokeWidth="1" />
  </svg>
)

export const CloudSticker: React.FC<StickerProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 32" className={className} aria-hidden="true">
    <ellipse cx="16" cy="20" rx="12" ry="9" fill="#FFFDF9" opacity="0.95" />
    <ellipse cx="30" cy="16" rx="14" ry="11" fill="#FFFDF9" opacity="0.95" />
    <ellipse cx="42" cy="21" rx="9" ry="7" fill="#FFFDF9" opacity="0.95" />
  </svg>
)

export const HeartSticker: React.FC<StickerProps> = ({ className = '', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 28" className={className} aria-hidden="true">
    <path
      d="M16 26 C4 18 0 11 4 6 C8 1 14 3 16 9 C18 3 24 1 28 6 C32 11 28 18 16 26 Z"
      fill="#FF7FA6"
    />
  </svg>
)

export const StarSticker: React.FC<StickerProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      d="M16 2 L19.5 12.5 L30 16 L19.5 19.5 L16 30 L12.5 19.5 L2 16 L12.5 12.5 Z"
      fill="#FFD166"
    />
  </svg>
)

export const RibbonSticker: React.FC<StickerProps> = ({ className = '', size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 40 32" className={className} aria-hidden="true">
    <path d="M20 16 L4 4 C2 10 2 20 4 28 Z" fill="#F4658F" />
    <path d="M20 16 L36 4 C38 10 38 20 36 28 Z" fill="#FF9DB8" />
    <circle cx="20" cy="16" r="5" fill="#C9436B" />
  </svg>
)

export const LeafSticker: React.FC<StickerProps> = ({ className = '', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden="true">
    <path d="M4 24 C2 12 12 2 24 4 C26 16 16 26 4 24 Z" fill="#C8E6D0" />
    <path d="M6 22 C8 14 14 8 22 6" stroke="#9FCFAE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
)

export const StrawberrySticker: React.FC<StickerProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 34" className={className} aria-hidden="true">
    <path d="M16 34 C6 34 2 22 4 16 C6 10 26 10 28 16 C30 22 26 34 16 34 Z" fill="#FF7FA6" />
    <path d="M16 10 C12 4 8 2 4 4 C6 8 10 10 16 10 Z" fill="#9FCFAE" />
    <path d="M16 10 C20 4 24 2 28 4 C26 8 22 10 16 10 Z" fill="#C8E6D0" />
    {[[12, 18], [20, 18], [16, 24], [10, 26], [22, 26]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx="1.4" ry="2" fill="#FFE9EF" />
    ))}
  </svg>
)
