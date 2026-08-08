import React, { useState } from 'react'
import { useStore } from '../lib/store'
import StrawBunny from '../components/StrawBunny'

interface ProfileScreenProps {
  onClose: () => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
  const { state, updateProfile, levelInfo } = useStore()
  const [name, setName] = useState(state.profile.displayName)

  return (
    <div className="fixed inset-0 z-40 bg-blush-100 overflow-y-auto animate-driftIn">
      <div className="mx-auto max-w-md px-5 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-[20px] text-ink">Toi &amp; StrawBunny</h1>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white border border-blush-300/60 flex items-center justify-center shadow-petal">
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <StrawBunny mood="cozy" size={120} />
          <p className="font-body text-[12px] text-ink-soft mt-2">
            Niveau {levelInfo.level} · {state.progress.strawberryPoints} 🍓 · série de {state.progress.streak}j
          </p>
        </div>

        <div className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal p-4 mb-4">
          <label className="font-display text-[13px] text-ink block mb-1.5">Ton prénom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => updateProfile({ displayName: name.trim() || 'douce âme' })}
            maxLength={24}
            className="w-full rounded-full bg-blush-100 px-4 py-2.5 font-body text-[13px] text-ink outline-none focus:ring-2 focus:ring-strawberry-300"
          />
        </div>

        <div className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal p-4 mb-4 space-y-4">
          <div>
            <label className="font-display text-[13px] text-ink block mb-1.5">Début de journée</label>
            <input
              type="range"
              min={4}
              max={11}
              value={state.profile.dayStartHour}
              onChange={(e) => updateProfile({ dayStartHour: Number(e.target.value) })}
              className="w-full accent-strawberry-500"
            />
            <p className="font-body text-[11.5px] text-ink-soft mt-1">Vers {state.profile.dayStartHour}h</p>
          </div>
          <div>
            <label className="font-display text-[13px] text-ink block mb-1.5">Routine du soir</label>
            <input
              type="range"
              min={18}
              max={23}
              value={state.profile.eveningRoutineHour}
              onChange={(e) => updateProfile({ eveningRoutineHour: Number(e.target.value) })}
              className="w-full accent-strawberry-500"
            />
            <p className="font-body text-[11.5px] text-ink-soft mt-1">Vers {state.profile.eveningRoutineHour}h</p>
          </div>
        </div>

        <div className="rounded-cozy bg-white/80 border border-blush-300/50 shadow-petal p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="font-display text-[13px] text-ink">Rappels tout doux</p>
            <p className="font-body text-[11.5px] text-ink-soft">De petites notifications bienveillantes.</p>
          </div>
          <button
            onClick={() => updateProfile({ notificationsEnabled: !state.profile.notificationsEnabled })}
            className={`w-12 h-7 rounded-full relative transition-colors ${state.profile.notificationsEnabled ? 'bg-strawberry-500' : 'bg-blush-300'}`}
            aria-pressed={state.profile.notificationsEnabled}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${state.profile.notificationsEnabled ? 'left-6' : 'left-1'}`}
            />
          </button>
        </div>

        <div className="rounded-cozy bg-sage-100 border border-sage-300/50 p-4 text-center">
          <p className="font-body text-[12px] text-ink-soft leading-relaxed">
            StrawBunny grandit avec toi, un tout petit pas à la fois. Merci de prendre soin de toi aujourd’hui.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
