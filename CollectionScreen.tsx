import React from 'react'
import { useStore } from '../lib/store'
import ScreenShell from '../components/ScreenShell'
import TopBar from '../components/TopBar'
import { StarSticker } from '../components/Stickers'

interface CollectionScreenProps {
  onOpenProfile: () => void
}

const CollectionScreen: React.FC<CollectionScreenProps> = ({ onOpenProfile }) => {
  const { state, togglePlaceItem, levelInfo } = useStore()
  const unlockedCount = state.collection.filter((c) => c.unlocked).length

  return (
    <ScreenShell>
      <TopBar onOpenProfile={onOpenProfile} />

      <div className="flex items-center gap-2 mb-1">
        <StarSticker size={18} />
        <h1 className="font-display text-[22px] text-ink">Ta petite collection</h1>
      </div>
      <p className="font-body text-[13px] text-ink-soft mb-5">
        {unlockedCount}/{state.collection.length} trésors trouvés · niveau {levelInfo.level}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {state.collection.map((item) => (
          <button
            key={item.id}
            disabled={!item.unlocked}
            onClick={() => togglePlaceItem(item.id)}
            className={`relative rounded-cozy border px-3.5 py-4 text-left transition-all duration-300
              ${item.unlocked ? 'bg-white/85 border-blush-300/50 shadow-petal active:scale-[0.97]' : 'bg-blush-100/60 border-blush-200 opacity-70'}
              ${item.unlocked && item.placed ? 'ring-2 ring-strawberry-400' : ''}
            `}
          >
            <div className="text-2xl mb-2">{item.unlocked ? item.emoji : '🔒'}</div>
            <p className="font-display text-[12.5px] text-ink leading-tight">{item.unlocked ? item.name : '???'}</p>
            <p className="font-body text-[10.5px] text-ink-soft mt-1 leading-snug">
              {item.unlocked ? item.description : `Se révèle au niveau ${item.unlockAt}`}
            </p>
            {item.unlocked && (
              <span className={`absolute top-2.5 right-2.5 text-[9px] font-body px-1.5 py-0.5 rounded-full ${item.placed ? 'bg-strawberry-500 text-white' : 'bg-blush-200 text-ink-soft'}`}>
                {item.placed ? 'placé' : 'ranger'}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-center font-body text-[11.5px] text-ink-soft mt-6">
        Chaque petite mission accomplie fait grandir ton univers, doucement.
      </p>
    </ScreenShell>
  )
}

export default CollectionScreen
