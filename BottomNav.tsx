import React from 'react'
import type { ScreenId } from '../App'

interface NavItem {
  id: ScreenId
  label: string
  emoji: string
}

const ITEMS: NavItem[] = [
  { id: 'home', label: 'Cocon', emoji: '🏡' },
  { id: 'routine', label: 'Routine', emoji: '🎀' },
  { id: 'quiet', label: 'Calme', emoji: '🕊️' },
  { id: 'journal', label: 'Journal', emoji: '📔' },
  { id: 'collection', label: 'Boutique', emoji: '🌸' }
]

interface BottomNavProps {
  active: ScreenId
  onChange: (id: ScreenId) => void
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2">
      <div className="mx-auto max-w-md bg-white/90 backdrop-blur-md border border-blush-300/60 rounded-bubble shadow-soft flex items-stretch justify-between px-1.5 py-1.5">
        {ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-[22px] transition-all duration-300
                ${isActive ? 'bg-blush-200/80' : 'bg-transparent'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`text-[19px] transition-transform duration-300 ${isActive ? '-translate-y-0.5 scale-110' : ''}`}>{item.emoji}</span>
              <span className={`font-body text-[10px] leading-none ${isActive ? 'text-strawberry-700 font-semibold' : 'text-ink-soft'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
