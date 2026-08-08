import React from 'react'

interface ScreenShellProps {
  children: React.ReactNode
  className?: string
}

const ScreenShell: React.FC<ScreenShellProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-full px-5 pt-6 pb-28 animate-driftIn ${className}`}>
      <div className="mx-auto w-full max-w-md">{children}</div>
    </div>
  )
}

export default ScreenShell
