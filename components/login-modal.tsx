"use client"

import { Anchor, Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onAuthed: (message: string) => void
}

type Mode = "sign-in" | "sign-up"

export function LoginModal({ open, onClose, onAuthed }: LoginModalProps) {
  const [mode, setMode] = useState<Mode>("sign-in")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setMode("sign-in")
      setName("")
      setEmail("")
      setPassword("")
      setError(null)
      setLoading(false)
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === "sign-up") {
      const { error } = await authClient.signUp.email({ email, password, name: name.trim() || "Usuario" })
      if (error) {
        setLoading(false)
        setError(
          error.message?.includes("exists") || error.status === 422
            ? "Ese correo ya está registrado. Inicia sesión."
            : "No se pudo crear la cuenta. La contraseña debe tener al menos 8 caracteres.",
        )
        return
      }
      setLoading(false)
      onAuthed("¡Cuenta creada! Ya puedes publicar tus inmuebles.")
      return
    }

    const { error } = await authClient.signIn.email({ email, password })
    if (error) {
      setLoading(false)
      setError("Correo o contraseña incorrectos.")
      return
    }
    setLoading(false)
    onAuthed("Sesión iniciada correctamente.")
  }

  const isSignUp = mode === "sign-up"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isSignUp ? "Crear cuenta" : "Iniciar sesión"}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Anchor className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-xl font-bold text-primary">
            {isSignUp ? "Crea tu cuenta" : "Bienvenido a Puerto Hogar"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp ? "Regístrate para publicar tus anuncios" : "Ingresa para gestionar tus anuncios"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {isSignUp && (
            <div>
              <label htmlFor="l-name" className="mb-1 block text-xs font-semibold text-foreground">
                Nombre
              </label>
              <input
                id="l-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          )}
          <div>
            <label htmlFor="l-email" className="mb-1 block text-xs font-semibold text-foreground">
              Correo electrónico
            </label>
            <input
              id="l-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="l-pass" className="mb-1 block text-xs font-semibold text-foreground">
              Contraseña
            </label>
            <input
              id="l-pass"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {isSignUp ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
            <button
              type="button"
              onClick={() => {
                setMode(isSignUp ? "sign-in" : "sign-up")
                setError(null)
              }}
              className="font-semibold text-primary hover:underline"
            >
              {isSignUp ? "Inicia sesión" : "Regístrate gratis"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
