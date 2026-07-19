"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

interface ToastProps {
  message: string
  onDone: () => void
}

export function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground shadow-xl"
    >
      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      {message}
    </div>
  )
}
