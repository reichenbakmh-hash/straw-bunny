import React, { useState } from 'react'
import { useStore } from '../lib/store'
import ScreenShell from '../components/ScreenShell'
import TopBar from '../components/TopBar'
import { CloudSticker, StarSticker } from '../components/Stickers'
import { todayKey } from '../lib/utils'

interface QuietTimeScreenProps {
  onOpenProfile: () => void
}

const MOMENTS = [
  { id: 'reading', label: 'Lecture', emoji: '📖' },
  { id: 'prayer', label: 'Prière', emoji: '🙏' },
  { id: 'silence', label: 'Silence', emoji: '🕊️' }
]

const QuietTimeScreen: React.FC<QuietTimeScreenProps> = ({ onOpenProfile }) => {
  const { state, markQuietTimeDone } = useStore()
  const [chosen, setChosen] = useState<string>('reading')
  const doneToday = state.quietTime.doneDates.includes(todayKey())

  return (
    <ScreenShell>
      <TopBar onOpenProfile={onOpenProfile} />

      <h1 className="font-display text-[22px] text-ink mb-1">Un moment rien qu’à toi</h1>
      <p className="font-body text-[13px] text-ink-soft mb-6">Aucune règle, aucune attente. Juste toi, et le calme.</p>

      <div className="relative rounded-bubble bg-gradient-to-b from-latte/50 via-blush-100 to-sage-100 px-6 py-10 mb-6 overflow-hidden shadow-soft text-center">
        <CloudSticker className="absolute top-5 left-6 opacity-80 animate-floatSlow" />
        <StarSticker className="absolute top-8 right-8 animate-sparkle" />
        <StarSticker className="absolute bottom-10 left-10 animate-sparkle" size={14} />

        <div className="w-20 h-20 mx-auto rounded-full bg-white/70 flex items-center justify-center text-4xl shadow-petal mb-4 animate-breathe">
          {doneToday ? '🕊️' : MOMENTS.find((m) => m.id === chosen)?.emoji}
        </div>

        {doneToday ? (
          <>
            <p className="font-display text-base text-ink mb-1">Ton cœur s’est posé aujourd’hui.</p>
            <p className="font-body text-[12.5px] text-ink-soft">Ton StrawBunny t’a accompagnée en silence. Merci d’avoir pris ce temps.</p>
          </>
        ) : (
          <>
            <p className="font-display text-base text-ink mb-4">Choisis ce dont ton cœur a envie</p>
            <div className="flex justify-center gap-2 mb-6">
              {MOMENTS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setChosen(m.id)}
                  className={`px-3.5 py-2 rounded-full font-body text-[12.5px] transition-all
                    ${chosen === m.id ? 'bg-strawberry-500 text-white shadow-petal' : 'bg-white/70 text-ink-soft'}
                  `}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
            <button
              onClick={markQuietTimeDone}
              className="rounded-full bg-white text-strawberry-700 font-display text-[13px] px-6 py-2.5 shadow-petal active:scale-95 transition-transform"
            >
              Marquer ce moment comme vécu
            </button>
          </>
        )}
      </div>

      <div className="rounded-cozy bg-white/70 border border-blush-300/50 px-4 py-4">
        <p className="font-body text-[12.5px] text-ink-soft leading-relaxed">
          Cet espace t’appartient entièrement. Que tu lises, que tu pries, ou que tu respires simplement en silence —
          chaque choix est le bon. StrawBunny ne juge jamais, il attend juste, tout doucement, à tes côtés.
        </p>
      </div>
    </ScreenShell>
  )
}

export default QuietTimeScreen
