"use client"

import { Anchor, LogOut, Menu, Search, X } from "lucide-react"
import { useState } from "react"
import { authClient, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onPublishClick: () => void
  onSearchClick: () => void
  onLoginClick: () => void
}

export function Navbar({ onPublishClick, onSearchClick, onLoginClick }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

  async function handleLogout() {
    await authClient.signOut()
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Anchor className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-primary">
            Puerto Hogar
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={onSearchClick}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Buscar
          </button>
          <Button
            onClick={onPublishClick}
            className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Publicar gratis
          </Button>
          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <span className="text-sm font-medium text-foreground">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Iniciar sesión
            </button>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onSearchClick()
                setOpen(false)
              }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-secondary"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Buscar
            </button>
            <Button
              onClick={() => {
                onPublishClick()
                setOpen(false)
              }}
              className="w-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Publicar gratis
            </Button>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Cerrar sesión ({user.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  onLoginClick()
                  setOpen(false)
                }}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-secondary"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
