import React from 'react'
import type { Task } from '../types'
import { CategoryIcon } from './CategoryIcon'

interface TaskCardProps {
  task: Task
  onToggle: () => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`group w-full text-left rounded-cozy border transition-all duration-300 px-4 py-3.5 flex items-center gap-3.5
        ${task.done ? 'bg-sage-100 border-sage-300/60 shadow-none' : 'bg-white/80 border-blush-300/50 shadow-petal hover:shadow-soft hover:-translate-y-0.5'}
      `}
    >
      <div
        className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
          ${task.done ? 'bg-sage-300/70' : 'bg-blush-200'}
        `}
      >
        <CategoryIcon category={task.category} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-display text-[15px] leading-tight ${task.done ? 'text-ink-soft line-through decoration-sage-500/60' : 'text-ink'}`}>
          {task.title}
        </p>
        <p className="font-body text-[12.5px] text-ink-soft mt-0.5 leading-snug">{task.description}</p>
      </div>

      <div
        className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${task.done ? 'bg-strawberry-500 border-strawberry-500 scale-100' : 'border-blush-400 group-hover:border-strawberry-500 scale-95'}
        `}
      >
        {task.done && (
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}

export default TaskCard
