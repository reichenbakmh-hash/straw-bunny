import React, { useState } from 'react'
import { useStore } from './lib/store'
import BottomNav from './components/BottomNav'
import RewardToast from './components/RewardToast'
import HomeScreen from './screens/HomeScreen'
import RoutineScreen from './screens/RoutineScreen'
import QuietTimeScreen from './screens/QuietTimeScreen'
import JournalScreen from './screens/JournalScreen'
import CollectionScreen from './screens/CollectionScreen'
import ProfileScreen from './screens/ProfileScreen'

export type ScreenId = 'home' | 'routine' | 'quiet' | 'journal' | 'collection'

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenId>('home')
  const [profileOpen, setProfileOpen] = useState(false)
  const { state, consumeReward } = useStore()

  const currentReward = state.rewardQueue[0]

  return (
    <div className="min-h-screen bg-blush-100">
      <main className="min-h-screen">
        {screen === 'home' && <HomeScreen onNavigate={setScreen} onOpenProfile={() => setProfileOpen(true)} />}
        {screen === 'routine' && <RoutineScreen onOpenProfile={() => setProfileOpen(true)} />}
        {screen === 'quiet' && <QuietTimeScreen onOpenProfile={() => setProfileOpen(true)} />}
        {screen === 'journal' && <JournalScreen onOpenProfile={() => setProfileOpen(true)} />}
        {screen === 'collection' && <CollectionScreen onOpenProfile={() => setProfileOpen(true)} />}
      </main>

      <BottomNav active={screen} onChange={setScreen} />

      {profileOpen && <ProfileScreen onClose={() => setProfileOpen(false)} />}

      {currentReward && <RewardToast key={currentReward.id} reward={currentReward} onDone={() => consumeReward(currentReward.id)} />}
    </div>
  )
}

export default App
