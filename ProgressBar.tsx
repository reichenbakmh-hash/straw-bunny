import React from 'react'

interface ProgressBarProps {
  value: number // 0..1
  label?: string
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, className = '' }) => {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div className={className}>
      {label && <p className="mb-1.5 text-xs font-body font-medium text-ink-soft">{label}</p>}
      <div className="h-3 w-full rounded-full bg-blush-300/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-strawberry-500 to-strawberry-300 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
