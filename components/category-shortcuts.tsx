"use client"

import { Building2, Home, KeyRound, Store } from "lucide-react"
import type { PropertyType } from "@/lib/properties"

const categories: {
  value: PropertyType
  label: string
  icon: typeof Home
}[] = [
  { value: "casa", label: "Casas en Arriendo", icon: Home },
  { value: "apartamento", label: "Apartamentos", icon: Building2 },
  { value: "local", label: "Locales Comerciales", icon: Store },
  { value: "habitacion", label: "Habitaciones", icon: KeyRound },
]

interface CategoryShortcutsProps {
  active: PropertyType | "todos"
  onSelect: (t: PropertyType) => void
}

export function CategoryShortcuts({ active, onSelect }: CategoryShortcutsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = active === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={`flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary"
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-foreground">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
