import React from 'react'
import { useStore } from '../lib/store'
import ScreenShell from '../components/ScreenShell'
import TopBar from '../components/TopBar'
import { HeartSticker, FlowerSticker } from '../components/Stickers'

interface JournalScreenProps {
  onOpenProfile: () => void
}

const FIELDS: { key: 'thought' | 'gratitude' | 'smallWin' | 'intention'; label: string; placeholder: string; emoji: string }[] = [
  { key: 'thought', label: 'Pensée du jour', placeholder: 'Ce qui traverse ton c\u0153ur en ce moment...', emoji: '🌷' },
  { key: 'gratitude', label: 'Gratitude', placeholder: 'Une petite chose douce pour laquelle tu es reconnaissante...', emoji: '🍓' },
  { key: 'smallWin', label: 'Petite victoire', placeholder: 'Quelque chose dont tu peux être fière, même minuscule...', emoji: '✨' },
  { key: 'intention', label: 'Intention pour demain', placeholder: 'Ce que tu aimerais offrir à la toi de demain...', emoji: '🌙' }
]

const JournalScreen: React.FC<JournalScreenProps> = ({ onOpenProfile }) => {
  const { state, today, setJournalField } = useStore()
  const entry = state.journalByDate[today]

  return (
    <ScreenShell>
      <TopBar onOpenProfile={onOpenProfile} />

      <div className="flex items-center gap-2 mb-1">
        <HeartSticker size={18} />
        <h1 className="font-display text-[22px] text-ink">Ton carnet secret</h1>
      </div>
      <p className="font-body text-[13px] text-ink-soft mb-6">Quatre petites lignes, juste pour toi.</p>

      <div className="space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key} className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal px-4 py-3.5">
            <p className="font-display text-[13px] text-ink mb-1.5 flex items-center gap-1.5">
              <span>{f.emoji}</span> {f.label}
            </p>
            <textarea
              value={entry?.[f.key] ?? ''}
              onChange={(e) => setJournalField(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={2}
              maxLength={280}
              className="w-full resize-none bg-transparent font-body text-[13.5px] text-ink placeholder:text-ink-soft/60 outline-none leading-relaxed"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-ink-soft">
        <FlowerSticker size={16} />
        <p className="font-body text-[11.5px]">Tout est enregistré tout doucement, ici même.</p>
      </div>
    </ScreenShell>
  )
}

export default JournalScreen
