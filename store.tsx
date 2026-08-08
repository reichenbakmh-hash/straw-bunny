import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { AppState, JournalEntry, Profile, RewardEvent, Task } from '../types'
import { loadState, saveState } from './storage'
import { levelFromXp, todayKey } from './utils'
import { COLLECTION_TEMPLATE } from '../data/defaultData'

type Action =
  | { type: 'COMPLETE_TASK'; date: string; taskId: string }
  | { type: 'UNDO_TASK'; date: string; taskId: string }
  | { type: 'ADD_CUSTOM_TASK'; date: string; title: string; description: string }
  | { type: 'SET_JOURNAL'; date: string; field: keyof Omit<JournalEntry, 'date' | 'updatedAt'>; value: string }
  | { type: 'MARK_QUIET_TIME'; date: string }
  | { type: 'SET_MOOD'; date: string; mood: string }
  | { type: 'PLACE_ITEM'; id: string }
  | { type: 'UPDATE_PROFILE'; profile: Partial<Profile> }
  | { type: 'CONSUME_REWARD'; id: string }

interface StoreState extends AppState {
  rewardQueue: RewardEvent[]
}

function withXpAndUnlocks(state: StoreState, xpGain: number, pointsGain: number, streakBumpIfFirstToday: boolean, date: string): StoreState {
  const beforeLevel = levelFromXp(state.progress.xp).level
  const newXp = state.progress.xp + xpGain
  const { level: afterLevel } = levelFromXp(newXp)

  let streak = state.progress.streak
  let longestStreak = state.progress.longestStreak
  let lastCompletedDate = state.progress.lastCompletedDate
  let completedDays = state.progress.completedDays

  if (streakBumpIfFirstToday && lastCompletedDate !== date) {
    const wasYesterday = isYesterday(lastCompletedDate, date)
    streak = wasYesterday ? streak + 1 : 1
    longestStreak = Math.max(longestStreak, streak)
    lastCompletedDate = date
    completedDays = completedDays.includes(date) ? completedDays : [...completedDays, date]
  }

  const rewardQueue = [...state.rewardQueue]
  rewardQueue.push({ id: cryptoId(), label: `+${xpGain} XP · +${pointsGain} 🍓`, kind: 'xp' })

  let collection = state.collection
  if (afterLevel > beforeLevel) {
    rewardQueue.push({ id: cryptoId(), label: `Niveau ${afterLevel} atteint`, sublabel: 'Ton StrawBunny est si fier de toi.', kind: 'levelup' })
    collection = collection.map((item) => {
      if (!item.unlocked && item.unlockAt <= afterLevel) {
        rewardQueue.push({ id: cryptoId(), label: `${item.emoji} ${item.name}`, sublabel: 'Un nouvel objet est apparu dans ta chambre.', kind: 'unlock' })
        return { ...item, unlocked: true, placed: true, unlockedAt: date }
      }
      return item
    })
  }

  if (streakBumpIfFirstToday && streak > 1 && streak !== state.progress.streak) {
    rewardQueue.push({ id: cryptoId(), label: `Série de ${streak} jours ✨`, sublabel: 'Une douce constance t\u2019habite.', kind: 'streak' })
  }

  return {
    ...state,
    collection,
    progress: {
      ...state.progress,
      xp: newXp,
      level: afterLevel,
      strawberryPoints: state.progress.strawberryPoints + pointsGain,
      streak,
      longestStreak,
      lastCompletedDate,
      completedDays
    },
    rewardQueue
  }
}

function isYesterday(prev: string | null, current: string): boolean {
  if (!prev) return false
  const p = new Date(prev)
  const c = new Date(current)
  const diff = Math.round((c.getTime() - p.getTime()) / (1000 * 60 * 60 * 24))
  return diff === 1
}

function cryptoId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'COMPLETE_TASK': {
      const tasks = state.tasksByDate[action.date] ?? []
      const task = tasks.find((t) => t.id === action.taskId)
      if (!task || task.done) return state
      const updatedTasks = tasks.map((t) => (t.id === action.taskId ? { ...t, done: true } : t))
      const anyDoneBefore = tasks.some((t) => t.done)
      const nextState: StoreState = {
        ...state,
        tasksByDate: { ...state.tasksByDate, [action.date]: updatedTasks }
      }
      return withXpAndUnlocks(nextState, task.xp, task.points, !anyDoneBefore, action.date)
    }
    case 'UNDO_TASK': {
      const tasks = state.tasksByDate[action.date] ?? []
      const updatedTasks = tasks.map((t) => (t.id === action.taskId ? { ...t, done: false } : t))
      return { ...state, tasksByDate: { ...state.tasksByDate, [action.date]: updatedTasks } }
    }
    case 'ADD_CUSTOM_TASK': {
      const tasks = state.tasksByDate[action.date] ?? []
      const newTask: Task = {
        id: `custom-${cryptoId()}`,
        title: action.title,
        description: action.description || 'Une intention douce, choisie par toi.',
        category: 'task',
        xp: 12,
        points: 6,
        done: false,
        custom: true
      }
      return { ...state, tasksByDate: { ...state.tasksByDate, [action.date]: [...tasks, newTask] } }
    }
    case 'SET_JOURNAL': {
      const existing = state.journalByDate[action.date] ?? {
        date: action.date,
        thought: '',
        gratitude: '',
        smallWin: '',
        intention: '',
        updatedAt: new Date().toISOString()
      }
      const updated: JournalEntry = { ...existing, [action.field]: action.value, updatedAt: new Date().toISOString() }
      return { ...state, journalByDate: { ...state.journalByDate, [action.date]: updated } }
    }
    case 'MARK_QUIET_TIME': {
      if (state.quietTime.doneDates.includes(action.date)) return state
      const nextState: StoreState = {
        ...state,
        quietTime: { doneDates: [...state.quietTime.doneDates, action.date] }
      }
      return withXpAndUnlocks(nextState, 20, 10, false, action.date)
    }
    case 'SET_MOOD': {
      return { ...state, moodOfDay: { ...state.moodOfDay, [action.date]: action.mood } }
    }
    case 'PLACE_ITEM': {
      const collection = state.collection.map((item) => (item.id === action.id && item.unlocked ? { ...item, placed: !item.placed } : item))
      return { ...state, collection }
    }
    case 'UPDATE_PROFILE': {
      return { ...state, profile: { ...state.profile, ...action.profile } }
    }
    case 'CONSUME_REWARD': {
      return { ...state, rewardQueue: state.rewardQueue.filter((r) => r.id !== action.id) }
    }
    default:
      return state
  }
}

interface StoreContextValue {
  state: StoreState
  todayTasks: Task[]
  today: string
  completeTask: (taskId: string) => void
  undoTask: (taskId: string) => void
  addCustomTask: (title: string, description: string) => void
  setJournalField: (field: keyof Omit<JournalEntry, 'date' | 'updatedAt'>, value: string) => void
  markQuietTimeDone: () => void
  setMood: (mood: string) => void
  togglePlaceItem: (id: string) => void
  updateProfile: (profile: Partial<Profile>) => void
  consumeReward: (id: string) => void
  levelInfo: { level: number; xpIntoLevel: number; xpForNextLevel: number }
}

const StoreContext = createContext<StoreContextValue | null>(null)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ ...loadState(), rewardQueue: [] }))
  const today = todayKey()

  useEffect(() => {
    if (!state.tasksByDate[today]) {
      // nouvelle journée détectée pendant que l'app est ouverte — géré au prochain chargement
    }
  }, [today, state.tasksByDate])

  useEffect(() => {
    const { rewardQueue, ...persistable } = state
    saveState(persistable)
  }, [state])

  const todayTasks = state.tasksByDate[today] ?? []

  const completeTask = useCallback((taskId: string) => dispatch({ type: 'COMPLETE_TASK', date: today, taskId }), [today])
  const undoTask = useCallback((taskId: string) => dispatch({ type: 'UNDO_TASK', date: today, taskId }), [today])
  const addCustomTask = useCallback((title: string, description: string) => dispatch({ type: 'ADD_CUSTOM_TASK', date: today, title, description }), [today])
  const setJournalField = useCallback(
    (field: keyof Omit<JournalEntry, 'date' | 'updatedAt'>, value: string) => dispatch({ type: 'SET_JOURNAL', date: today, field, value }),
    [today]
  )
  const markQuietTimeDone = useCallback(() => dispatch({ type: 'MARK_QUIET_TIME', date: today }), [today])
  const setMood = useCallback((mood: string) => dispatch({ type: 'SET_MOOD', date: today, mood }), [today])
  const togglePlaceItem = useCallback((id: string) => dispatch({ type: 'PLACE_ITEM', id }), [])
  const updateProfile = useCallback((profile: Partial<Profile>) => dispatch({ type: 'UPDATE_PROFILE', profile }), [])
  const consumeReward = useCallback((id: string) => dispatch({ type: 'CONSUME_REWARD', id }), [])

  const levelInfo = useMemo(() => levelFromXp(state.progress.xp), [state.progress.xp])

  const value: StoreContextValue = {
    state,
    todayTasks,
    today,
    completeTask,
    undoTask,
    addCustomTask,
    setJournalField,
    markQuietTimeDone,
    setMood,
    togglePlaceItem,
    updateProfile,
    consumeReward,
    levelInfo
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore doit être utilisé à l\u2019intérieur de <StoreProvider>')
  return ctx
}

export { COLLECTION_TEMPLATE }
