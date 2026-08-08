import React, { useEffect } from 'react'
import type { RewardEvent } from '../types'
import { StarSticker, HeartSticker } from './Stickers'

interface RewardToastProps {
  reward: RewardEvent
  onDone: () => void
}

const KIND_ICON: Record<RewardEvent['kind'], React.ReactNode> = {
  xp: <HeartSticker size={22} />,
  levelup: <StarSticker size={24} />,
  unlock: <span className="text-xl">🎁</span>,
  streak: <span className="text-xl">🔥</span>
}

const RewardToast: React.FC<RewardToastProps> = ({ reward, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [reward.id, onDone])

  return (
    <div
      className="pointer-events-none fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-popIn"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur rounded-full pl-3 pr-5 py-2.5 shadow-soft border border-blush-300/60">
        <span className="w-8 h-8 rounded-full bg-blush-200 flex items-center justify-center">{KIND_ICON[reward.kind]}</span>
        <div>
          <p className="font-display text-sm text-ink leading-tight">{reward.label}</p>
          {reward.sublabel && <p className="font-body text-[11px] text-ink-soft leading-tight">{reward.sublabel}</p>}
        </div>
      </div>
    </div>
  )
}

export default RewardToast
