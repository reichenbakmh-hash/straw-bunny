import React from 'react'
import type { TaskCategory } from '../types'

const EMOJI: Record<TaskCategory, string> = {
  water: '💧',
  food: '🍓',
  sleep: '🌙',
  quiet: '📖',
  task: '🎀',
  move: '🌿',
  creative: '🖌️',
  connect: '💌'
}

export const CategoryIcon: React.FC<{ category: TaskCategory; className?: string }> = ({ category, className = '' }) => (
  <span className={`inline-flex items-center justify-center text-lg ${className}`} aria-hidden="true">
    {EMOJI[category]}
  </span>
)
