import type { CollectionItem, Profile, Task, TaskCategory } from '../types'

// Modèles de tâches — pensés pour un cœur sensible et créatif (inspiration INFP) :
// douceur, sens, calme, petits gestes qui comptent — jamais d'injonction.
export const TASK_TEMPLATES: Omit<Task, 'id' | 'done'>[] = [
  {
    title: 'Un petit verre d\u2019eau',
    description: 'Ton corps te remercie en silence. Juste une gorgée, pour commencer.',
    category: 'water',
    xp: 10,
    points: 5
  },
  {
    title: 'Nourrir ton cocon',
    description: 'Un repas ou une collation douce, sans pression, juste pour toi.',
    category: 'food',
    xp: 15,
    points: 8
  },
  {
    title: 'Un moment calme',
    description: 'Bible, prière, silence \u2014 ce que ton c\u0153ur choisit aujourd\u2019hui.',
    category: 'quiet',
    xp: 20,
    points: 10
  },
  {
    title: 'Une toute petite t\u00e2che',
    description: 'Une chose simple, accomplie avec douceur. Pas besoin qu\u2019elle soit grande.',
    category: 'task',
    xp: 15,
    points: 8
  },
  {
    title: 'Étirements tout doux',
    description: 'Quelques mouvements lents pour réveiller ton corps en douceur.',
    category: 'move',
    xp: 12,
    points: 6
  },
  {
    title: 'Pause rêverie',
    description: 'Écrire, dessiner, imaginer \u2014 laisser ton monde intérieur respirer.',
    category: 'creative',
    xp: 15,
    points: 8
  },
  {
    title: 'Un mot tendre à quelqu\u2019un',
    description: 'Un message doux à une personne que tu aimes. Ça réchauffe les deux c\u0153urs.',
    category: 'connect',
    xp: 12,
    points: 6
  },
  {
    title: 'Préparer ton sommeil',
    description: 'Tamiser la lumière, ranger ton nid. Ton corps aime les rituels doux.',
    category: 'sleep',
    xp: 18,
    points: 9
  }
]

export const CATEGORY_LABEL: Record<TaskCategory, string> = {
  water: 'Eau',
  food: 'Nourriture',
  sleep: 'Sommeil',
  quiet: 'Moment calme',
  task: 'Petite mission',
  move: 'Mouvement doux',
  creative: 'Créativité',
  connect: 'Tendresse'
}

export function buildDailyTasks(): Task[] {
  return TASK_TEMPLATES.map((t, i) => ({
    ...t,
    id: `task-${i}-${Math.random().toString(36).slice(2, 8)}`,
    done: false
  }))
}

export const DEFAULT_PROFILE: Profile = {
  displayName: 'douce âme',
  dayStartHour: 7,
  eveningRoutineHour: 21,
  notificationsEnabled: true,
  wallpaperId: 'wallpaper-dawn'
}

// La collection : ce que l'on débloque en avançant, niveau par niveau.
export const COLLECTION_TEMPLATE: Omit<CollectionItem, 'unlocked' | 'placed'>[] = [
  { id: 'flower-daisy', name: 'Petite marguerite', description: 'La toute première fleur de ton jardin.', category: 'flower', emoji: '🌼', unlockAt: 1 },
  { id: 'ribbon-pink', name: 'Ruban fraise', description: 'Un ruban satiné pour les oreilles de StrawBunny.', category: 'ribbon', emoji: '🎀', unlockAt: 2 },
  { id: 'strawberry-charm', name: 'Petite fraise porte-bonheur', description: 'Elle brille doucement dans un coin de la chambre.', category: 'strawberry', emoji: '🍓', unlockAt: 2 },
  { id: 'cup-cocoa', name: 'Tasse de cacao', description: 'Toujours fumante, toujours chaude.', category: 'cup', emoji: '☕', unlockAt: 3 },
  { id: 'candle-vanilla', name: 'Bougie vanille', description: 'Une lumière tremblante et rassurante.', category: 'candle', emoji: '🕯️', unlockAt: 3 },
  { id: 'furniture-shelf', name: 'Étagère en bois clair', description: 'Pour ranger les petits trésors du jour.', category: 'furniture', emoji: '🪵', unlockAt: 4 },
  { id: 'flower-rose', name: 'Rose poudrée', description: 'Elle penche doucement vers la fenêtre.', category: 'flower', emoji: '🌸', unlockAt: 4 },
  { id: 'accessory-scarf', name: 'Écharpe cocon', description: 'StrawBunny s\u2019enroule dedans les jours de pluie.', category: 'accessory', emoji: '🧣', unlockAt: 5 },
  { id: 'sticker-star', name: 'Étoile scintillante', description: 'Un autocollant pour ton carnet secret.', category: 'sticker', emoji: '⭐', unlockAt: 5 },
  { id: 'furniture-bed', name: 'Petit lit douillet', description: 'Couvertures moelleuses, oreiller en nuage.', category: 'furniture', emoji: '🛏️', unlockAt: 6 },
  { id: 'cup-tea', name: 'Thé aux pétales', description: 'Une infusion florale, juste ce qu\u2019il faut.', category: 'cup', emoji: '🍵', unlockAt: 6 },
  { id: 'wallpaper-sunset', name: 'Fond coucher de soleil', description: 'Une nouvelle lumière pour ta chambre.', category: 'wallpaper', emoji: '🌇', unlockAt: 7 },
  { id: 'ribbon-bow', name: 'N\u0153ud de velours', description: 'Un accessoire précieux pour les grands jours.', category: 'ribbon', emoji: '🎗️', unlockAt: 8 },
  { id: 'flower-bouquet', name: 'Bouquet de campanules', description: 'Cueilli dans un jardin imaginaire.', category: 'flower', emoji: '💐', unlockAt: 9 },
  { id: 'accessory-crown', name: 'Petite couronne de fleurs', description: 'Pour ta fierté toute douce.', category: 'accessory', emoji: '👑', unlockAt: 10 },
  { id: 'wallpaper-stars', name: 'Fond ciel étoilé', description: 'Pour les soirées calmes et rêveuses.', category: 'wallpaper', emoji: '✨', unlockAt: 12 }
]
