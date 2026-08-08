export function todayKey(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function dateKeyOffset(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Niveau n nécessite une somme croissante d'XP : renvoie {level, xpIntoLevel, xpForNextLevel}
export function levelFromXp(totalXp: number): { level: number; xpIntoLevel: number; xpForNextLevel: number } {
  let level = 1
  let remaining = totalXp
  let needed = 60 // XP requis pour passer du niveau 1 au niveau 2

  while (remaining >= needed) {
    remaining -= needed
    level += 1
    needed = Math.round(needed * 1.18)
  }

  return { level, xpIntoLevel: remaining, xpForNextLevel: needed }
}

export function greetingForHour(hour: number, name: string): string {
  if (hour < 5) return `Encore éveillée, ${name} ? Ton StrawBunny veille aussi.`
  if (hour < 11) return `Good morning, strawberry ♡`
  if (hour < 17) return `Un doux après-midi à toi, ${name}.`
  if (hour < 21) return `La soirée s\u2019installe tout doucement.`
  return `Chut... c\u2019est l\u2019heure du cocon.`
}

export function moodFromHourAndProgress(hour: number, ratioDone: number): 'wake' | 'happy' | 'focused' | 'resting' | 'sleepy' | 'proud' | 'cozy' {
  if (ratioDone >= 1) return 'proud'
  if (hour >= 22 || hour < 5) return 'sleepy'
  if (hour < 8) return 'wake'
  if (ratioDone === 0) return 'resting'
  if (ratioDone < 0.5) return 'focused'
  if (hour >= 19) return 'cozy'
  return 'happy'
}
