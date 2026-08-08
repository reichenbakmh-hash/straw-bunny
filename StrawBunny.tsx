import React from 'react'
import type { BunnyMood } from '../types'

interface StrawBunnyProps {
  mood: BunnyMood
  size?: number
  className?: string
}

const MOOD_LABEL: Record<BunnyMood, string> = {
  wake: 'StrawBunny s\u2019étire, tout juste réveillé',
  happy: 'StrawBunny sourit doucement',
  focused: 'StrawBunny t\u2019accompagne avec attention',
  resting: 'StrawBunny se repose paisiblement',
  sleepy: 'StrawBunny somnole déjà',
  proud: 'StrawBunny est si fier de toi',
  cozy: 'StrawBunny savoure un moment cocon'
}

// Yeux et bouche selon l'humeur — tout en courbes douces, jamais de traits durs.
function Face({ mood }: { mood: BunnyMood }) {
  switch (mood) {
    case 'happy':
      return (
        <g>
          <path d="M72 108 Q80 98 88 108" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M112 108 Q120 98 128 108" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M88 122 Q100 132 112 122" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'proud':
      return (
        <g>
          <path d="M74 112 l6 -6 l6 6 l-6 6 z" fill="#F4658F" />
          <path d="M114 112 l6 -6 l6 6 l-6 6 z" fill="#F4658F" />
          <path d="M86 122 Q100 136 114 122" stroke="#6B4A55" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'sleepy':
      return (
        <g>
          <path d="M72 110 Q80 114 88 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M112 110 Q120 114 128 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M94 124 Q100 128 106 124" stroke="#6B4A55" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <text x="132" y="90" fontSize="14" fill="#C9436B" fontFamily="Fredoka, sans-serif">z</text>
          <text x="142" y="76" fontSize="10" fill="#C9436B" fontFamily="Fredoka, sans-serif">z</text>
        </g>
      )
    case 'resting':
      return (
        <g>
          <path d="M72 110 Q80 115 88 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M112 110 Q120 115 128 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M90 123 Q100 130 110 123" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'focused':
      return (
        <g>
          <circle cx="80" cy="108" r="6.5" fill="#6B4A55" />
          <circle cx="120" cy="108" r="6.5" fill="#6B4A55" />
          <circle cx="82.5" cy="105.5" r="2" fill="#fff" />
          <circle cx="122.5" cy="105.5" r="2" fill="#fff" />
          <path d="M92 124 Q100 128 108 124" stroke="#6B4A55" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'cozy':
      return (
        <g>
          <path d="M72 110 Q80 116 88 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M112 110 Q120 116 128 110" stroke="#6B4A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="100" cy="126" rx="6" ry="4" fill="#F4658F" opacity="0.6" />
        </g>
      )
    case 'wake':
    default:
      return (
        <g>
          <circle cx="80" cy="109" r="6" fill="#6B4A55" />
          <circle cx="120" cy="109" r="6" fill="#6B4A55" />
          <circle cx="82" cy="106.5" r="1.8" fill="#fff" />
          <circle cx="122" cy="106.5" r="1.8" fill="#fff" />
          <ellipse cx="100" cy="126" rx="5" ry="3.5" fill="#C9436B" opacity="0.7" />
        </g>
      )
  }
}

const StrawBunny: React.FC<StrawBunnyProps> = ({ mood, size = 200, className = '' }) => {
  return (
    <svg
      role="img"
      aria-label={MOOD_LABEL[mood]}
      width={size}
      height={size}
      viewBox="0 0 200 220"
      className={className}
    >
      {/* ombre douce au sol */}
      <ellipse cx="100" cy="204" rx="52" ry="10" fill="#F4658F" opacity="0.12" />

      {/* oreilles */}
      <g className={mood === 'sleepy' || mood === 'resting' ? '' : 'origin-[100px_60px]'}>
        <path d="M70 70 C58 34 62 10 78 4 C90 0 94 20 90 46 C88 60 82 72 78 78 Z" fill="#FFF7F0" stroke="#FFD1DE" strokeWidth="2" />
        <path d="M74 66 C66 40 68 22 78 16 C86 14 88 28 85 46 C83 56 79 64 76 70 Z" fill="#FFE0EA" />
        <path d="M130 70 C142 34 138 10 122 4 C110 0 106 20 110 46 C112 60 118 72 122 78 Z" fill="#FFF7F0" stroke="#FFD1DE" strokeWidth="2" />
        <path d="M126 66 C134 40 132 22 122 16 C114 14 112 28 115 46 C117 56 121 64 124 70 Z" fill="#FFE0EA" />
      </g>

      {/* corps / capuche fraise */}
      <path
        d="M100 88 C144 88 168 122 162 158 C158 188 132 208 100 208 C68 208 42 188 38 158 C32 122 56 88 100 88 Z"
        fill="#FF9DB8"
      />
      <path
        d="M100 88 C144 88 168 122 162 158 C158 188 132 208 100 208 C68 208 42 188 38 158 C32 122 56 88 100 88 Z"
        fill="url(#strawberryShade)"
        opacity="0.5"
      />
      {/* graines de fraise */}
      {[
        [72, 140], [128, 140], [60, 165], [140, 165], [86, 185], [114, 185], [100, 155], [78, 118], [122, 118]
      ].map(([x, y], idx) => (
        <ellipse key={idx} cx={x} cy={y} rx="2.6" ry="3.6" fill="#FFE9EF" opacity="0.85" transform={`rotate(${(idx * 37) % 360} ${x} ${y})`} />
      ))}
      {/* feuille */}
      <path d="M100 88 C92 78 84 78 80 86 C88 92 96 92 100 88 Z" fill="#9FCFAE" />
      <path d="M100 88 C108 78 116 78 120 86 C112 92 104 92 100 88 Z" fill="#C8E6D0" />

      {/* visage (zone crème) */}
      <ellipse cx="100" cy="120" rx="46" ry="40" fill="#FFFDF9" />

      {/* joues */}
      <ellipse cx="68" cy="122" rx="10" ry="7" fill="#FFB6C9" opacity="0.7" />
      <ellipse cx="132" cy="122" rx="10" ry="7" fill="#FFB6C9" opacity="0.7" />

      <Face mood={mood} />

      {/* museau */}
      <path d="M96 132 Q100 136 104 132" stroke="#E14E79" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

      <defs>
        <linearGradient id="strawberryShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C9436B" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default StrawBunny
