import React, { useState } from 'react'
import { useStore } from '../lib/store'
import TaskCard from '../components/TaskCard'
import ScreenShell from '../components/ScreenShell'
import TopBar from '../components/TopBar'
import { RibbonSticker, StarSticker } from '../components/Stickers'

interface RoutineScreenProps {
  onOpenProfile: () => void
}

const RoutineScreen: React.FC<RoutineScreenProps> = ({ onOpenProfile }) => {
  const { todayTasks, completeTask, undoTask, addCustomTask } = useStore()
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const todo = todayTasks.filter((t) => !t.done)
  const done = todayTasks.filter((t) => t.done)

  function handleAdd() {
    if (!title.trim()) return
    addCustomTask(title.trim(), desc.trim())
    setTitle('')
    setDesc('')
    setShowAdd(false)
  }

  return (
    <ScreenShell>
      <TopBar onOpenProfile={onOpenProfile} />

      <div className="flex items-center gap-2 mb-1">
        <RibbonSticker size={22} className="animate-ribbonWiggle" />
        <h1 className="font-display text-[22px] text-ink">Ta routine du jour</h1>
      </div>
      <p className="font-body text-[13px] text-ink-soft mb-5">Un pas après l’autre, tout doucement.</p>

      {todo.length > 0 && (
        <div className="space-y-2.5 mb-6">
          <h2 className="font-display text-[13px] text-ink-soft mb-1">À accomplir</h2>
          {todo.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => completeTask(task.id)} />
          ))}
        </div>
      )}

      {!showAdd ? (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full mb-6 rounded-cozy border-2 border-dashed border-blush-400 text-strawberry-700 font-body text-[13px] py-3 active:scale-[0.98] transition-transform"
        >
          + Ajouter une petite intention
        </button>
      ) : (
        <div className="mb-6 rounded-cozy bg-white/85 border border-blush-300/60 p-4 shadow-petal space-y-2.5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Le titre de ta mission..."
            className="w-full rounded-full bg-blush-100 px-4 py-2.5 font-body text-[13px] text-ink placeholder:text-ink-soft/70 outline-none focus:ring-2 focus:ring-strawberry-300"
            maxLength={60}
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Une petite description douce (optionnel)"
            className="w-full rounded-full bg-blush-100 px-4 py-2.5 font-body text-[13px] text-ink placeholder:text-ink-soft/70 outline-none focus:ring-2 focus:ring-strawberry-300"
            maxLength={90}
          />
          <div className="flex gap-2 pt-1">
            <button onClick={handleAdd} className="flex-1 rounded-full bg-strawberry-500 text-white font-display text-[13px] py-2.5 active:scale-95 transition-transform">
              Ajouter avec amour
            </button>
            <button onClick={() => setShowAdd(false)} className="rounded-full bg-blush-200 text-ink-soft font-body text-[13px] px-4 py-2.5">
              Annuler
            </button>
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <StarSticker size={16} />
            <h2 className="font-display text-[13px] text-ink-soft">Accomplies</h2>
          </div>
          {done.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => undoTask(task.id)} />
          ))}
        </div>
      )}

      {todayTasks.length === 0 && (
        <p className="text-center font-body text-[13px] text-ink-soft mt-10">Ta journée commence à peine à s’écrire...</p>
      )}
    </ScreenShell>
  )
}

export default RoutineScreen
