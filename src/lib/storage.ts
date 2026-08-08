import type { AppState } from '../types'
import { buildDailyTasks, COLLECTION_TEMPLATE, DEFAULT_PROFILE } from '../data/defaultData'
import { todayKey } from './utils'

const STORAGE_KEY = 'strawbunny.state.v1'

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AppState
      // s'assurer que les tâches du jour existent
      const today = todayKey()
      if (!parsed.tasksByDate[today]) {
        parsed.tasksByDate[today] = buildDailyTasks()
      }
      return parsed
    }
  } catch {
    // silencieux — on repart d'un état neuf, en douceur
  }
  return createInitialState()
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // stockage indisponible — l'app continue de fonctionner en mémoire
  }
}

export function createInitialState(): AppState {
  const today = todayKey()
  return {
    profile: { ...DEFAULT_PROFILE },
    progress: {
      xp: 0,
      level: 1,
      strawberryPoints: 0,
      streak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      completedDays: []
    },
    tasksByDate: {
      [today]: buildDailyTasks()
    },
    collection: COLLECTION_TEMPLATE.map((c) => ({
      ...c,
      unlocked: c.unlockAt <= 1,
      placed: c.unlockAt <= 1
    })),
    journalByDate: {},
    quietTime: { doneDates: [] },
    moodOfDay: {},
    createdAt: new Date().toISOString()
  }
}
