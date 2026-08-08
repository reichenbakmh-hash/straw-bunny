import React, { useEffect, useState } from 'react'
import { StarSticker } from './Stickers'

// Capture l'événement natif d'installation PWA (Chrome/Edge/Android).
// Safari iOS ne le supporte pas : on affiche alors une petite astuce manuelle.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'strawbunny.install-dismissed'

function isStandalone(): boolean {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISS_KEY) === '1')
  const [installed, setInstalled] = useState(isStandalone())

  useEffect(() => {
    if (installed) return

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    // Safari iOS ne déclenche jamais beforeinstallprompt : on propose l'astuce manuelle
    if (isIOS() && !isStandalone()) {
      setShowIOSHint(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [installed])

  if (installed || dismissed || (!deferredPrompt && !showIOSHint)) return null

  function handleDismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setInstalled(true)
    }
    setDeferredPrompt(null)
  }

  return (
    <div className="sticky top-0 left-0 right-0 z-40 px-3 pt-[max(10px,env(safe-area-inset-top))] pb-2 animate-driftIn">
      <div className="mx-auto max-w-md bg-white/95 backdrop-blur-md border border-blush-300/60 rounded-cozy shadow-soft px-3.5 py-3 flex items-center gap-3">
        <span className="shrink-0 w-10 h-10 rounded-full bg-blush-200 flex items-center justify-center text-lg">
          🍓
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-display text-[13px] text-ink leading-tight">Garde StrawBunny avec toi</p>
          <p className="font-body text-[11px] text-ink-soft leading-snug">
            {showIOSHint && !deferredPrompt
              ? <>Appuie sur <span className="font-semibold">Partager</span> puis <span className="font-semibold">Sur l’écran d’accueil</span> ✨</>
              : 'Installe-la en un instant, comme une vraie petite appli.'}
          </p>
        </div>

        {deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            className="shrink-0 rounded-full bg-strawberry-500 text-white font-display text-[12px] px-3.5 py-2 shadow-petal active:scale-95 transition-transform whitespace-nowrap"
          >
            Télécharger
          </button>
        ) : (
          <StarSticker size={18} className="shrink-0 animate-sparkle" />
        )}

        <button
          onClick={handleDismiss}
          aria-label="Fermer"
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-ink-soft/70 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt
