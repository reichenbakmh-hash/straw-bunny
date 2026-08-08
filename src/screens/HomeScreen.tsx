import React, { useMemo } from 'react'
import { useStore } from '../lib/store'
import StrawBunny from '../components/StrawBunny'
import ProgressBar from '../components/ProgressBar'
import TaskCard from '../components/TaskCard'
import ScreenShell from '../components/ScreenShell'
import TopBar from '../components/TopBar'
import { CloudSticker, FlowerSticker, StarSticker, LeafSticker } from '../components/Stickers'
import { greetingForHour, moodFromHourAndProgress } from '../lib/utils'
import type { ScreenId } from '../App'

interface HomeScreenProps {
  onNavigate: (id: ScreenId) => void
  onOpenProfile: () => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenProfile }) => {
  const { state, todayTasks, completeTask, undoTask, levelInfo } = useStore()

  const hour = new Date().getHours()
  const doneCount = todayTasks.filter((t) => t.done).length
  const ratio = todayTasks.length ? doneCount / todayTasks.length : 0
  const mood = moodFromHourAndProgress(hour, ratio)
  const greeting = greetingForHour(hour, state.profile.displayName)

  const placedDecor = useMemo(() => state.collection.filter((c) => c.unlocked && c.placed).slice(0, 6), [state.collection])
  const nextTasks = todayTasks.filter((t) => !t.done).slice(0, 3)
  const highlightDone = doneCount > 0 && nextTasks.length === 0

  return (
    <ScreenShell>
      <TopBar onOpenProfile={onOpenProfile} />

      <p className="font-body text-[13px] text-ink-soft mb-1">
        {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
      <h1 className="font-display text-[22px] text-ink mb-5 leading-snug">{greeting}</h1>

      {/* Mini chambre / jardin */}
      <div className="relative rounded-bubble bg-gradient-to-b from-blush-300 via-blush-200 to-sage-100 px-6 pt-8 pb-5 overflow-hidden shadow-soft mb-5">
        <CloudSticker className="absolute top-4 left-4 opacity-90 animate-floatSlow" />
        <CloudSticker className="absolute top-9 right-6 opacity-70 scale-75 animate-floatSlow" />
        <StarSticker className="absolute top-6 right-14 animate-sparkle" />
        <FlowerSticker className="absolute bottom-16 left-6 animate-floatSlow" />
        <LeafSticker className="absolute bottom-20 right-8 animate-floatSlow" />

        <div className="flex justify-center animate-float">
          <StrawBunny mood={mood} size={168} />
        </div>

        {placedDecor.length > 0 && (
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {placedDecor.map((item) => (
              <span key={item.id} title={item.name} className="text-lg drop-shadow-sm">
                {item.emoji}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Progression */}
      <div className="rounded-cozy bg-white/80 border border-blush-300/50 px-4 py-4 mb-5 shadow-petal">
        <div className="flex items-center justify-between mb-2">
          <p className="font-display text-sm text-ink">Aujourd’hui, {doneCount}/{todayTasks.length} petits pas ✨</p>
          {state.progress.streak > 1 && (
            <span className="font-body text-[11px] text-strawberry-700 bg-strawberry-100 px-2 py-0.5 rounded-full">
              🔥 {state.progress.streak}j
            </span>
          )}
        </div>
        <ProgressBar value={ratio} />
        <p className="font-body text-[11px] text-ink-soft mt-2">
          Niveau {levelInfo.level} · {levelInfo.xpIntoLevel}/{levelInfo.xpForNextLevel} XP
        </p>
      </div>

      {/* Tâches du jour */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-[15px] text-ink">Petites missions</h2>
        <button onClick={() => onNavigate('routine')} className="font-body text-[12px] text-strawberry-700 underline decoration-strawberry-300 underline-offset-2">
          Voir tout
        </button>
      </div>

      <div className="space-y-2.5 mb-6">
        {highlightDone ? (
          <div className="rounded-cozy bg-sage-100 border border-sage-300/50 px-4 py-5 text-center">
            <p className="font-display text-sm text-ink mb-1">Tu as tout accompli aujourd’hui ♡</p>
            <p className="font-body text-[12px] text-ink-soft">Ton StrawBunny est fier de toi. Repose-toi, tu l’as mérité.</p>
          </div>
        ) : (
          nextTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => (task.done ? undoTask(task.id) : completeTask(task.id))} />
          ))
        )}
      </div>

      {/* Raccourcis */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('journal')}
          className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal px-4 py-4 text-left active:scale-[0.98] transition-transform"
        >
          <span className="text-xl">📔</span>
          <p className="font-display text-[13px] text-ink mt-1.5">Journal minuscule</p>
          <p className="font-body text-[11px] text-ink-soft">Un instant pour toi.</p>
        </button>
        <button
          onClick={() => onNavigate('collection')}
          className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal px-4 py-4 text-left active:scale-[0.98] transition-transform"
        >
          <span className="text-xl">🌸</span>
          <p className="font-display text-[13px] text-ink mt-1.5">Ta collection</p>
          <p className="font-body text-[11px] text-ink-soft">{state.collection.filter((c) => c.unlocked).length}/{state.collection.length} trouvés</p>
        </button>
      </div>
    </ScreenShell>
  )
}

export default HomeScreen
