import React from 'react'
import { useStore } from '../lib/store'

interface TopBarProps {
  onOpenProfile: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onOpenProfile }) => {
  const { state, levelInfo } = useStore()
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-full bg-strawberry-100 flex items-center justify-center text-base shadow-petal">🍓</span>
        <div className="leading-tight">
          <p className="font-body text-[11px] text-ink-soft">Niveau {levelInfo.level}</p>
          <p className="font-display text-sm text-ink">{state.progress.strawberryPoints} points</p>
        </div>
      </div>
      <button
        onClick={onOpenProfile}
        className="w-10 h-10 rounded-full bg-white border border-blush-300/60 shadow-petal flex items-center justify-center text-lg active:scale-95 transition-transform"
        aria-label="Profil et paramètres"
      >
        🐰
      </button>
    </div>
  )
}

export default TopBar
