// StrawBunny — types du petit univers 🍓

export type TaskCategory =
  | 'water'
  | 'food'
  | 'sleep'
  | 'quiet'
  | 'task'
  | 'move'
  | 'creative'
  | 'connect'

export interface Task {
  id: string
  title: string
  description: string
  category: TaskCategory
  xp: number
  points: number
  done: boolean
  custom?: boolean
}

export type BunnyMood =
  | 'wake'
  | 'happy'
  | 'focused'
  | 'resting'
  | 'sleepy'
  | 'proud'
  | 'cozy'

export type CollectionCategory =
  | 'flower'
  | 'ribbon'
  | 'strawberry'
  | 'cup'
  | 'candle'
  | 'furniture'
  | 'accessory'
  | 'wallpaper'
  | 'sticker'

export interface CollectionItem {
  id: string
  name: string
  description: string
  category: CollectionCategory
  emoji: string
  unlockAt: number // niveau requis pour débloquer
  unlocked: boolean
  placed: boolean
  unlockedAt?: string
}

export interface JournalEntry {
  date: string // YYYY-MM-DD
  thought: string
  gratitude: string
  smallWin: string
  intention: string
  updatedAt: string
}

export interface ProgressState {
  xp: number
  level: number
  strawberryPoints: number
  streak: number
  longestStreak: number
  lastCompletedDate: string | null
  completedDays: string[]
}

export interface Profile {
  displayName: string
  dayStartHour: number
  eveningRoutineHour: number
  notificationsEnabled: boolean
  wallpaperId: string
}

export interface QuietTimeState {
  doneDates: string[]
}

export interface AppState {
  profile: Profile
  progress: ProgressState
  tasksByDate: Record<string, Task[]>
  collection: CollectionItem[]
  journalByDate: Record<string, JournalEntry>
  quietTime: QuietTimeState
  moodOfDay: Record<string, string>
  createdAt: string
}

export interface RewardEvent {
  id: string
  label: string
  sublabel?: string
  kind: 'xp' | 'levelup' | 'unlock' | 'streak'
}
