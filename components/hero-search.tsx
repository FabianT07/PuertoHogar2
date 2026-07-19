"use client"

import { Search } from "lucide-react"
import type { PropertyType } from "@/lib/properties"
import { Button } from "@/components/ui/button"

const tabs: { value: PropertyType; label: string }[] = [
  { value: "casa", label: "Casas" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "local", label: "Locales" },
]

const priceRanges = [
  { label: "Cualquier precio", value: "any" },
  { label: "Hasta $500.000", value: "0-500000" },
  { label: "$500.000 - $1.000.000", value: "500000-1000000" },
  { label: "$1.000.000 - $1.500.000", value: "1000000-1500000" },
  { label: "Más de $1.500.000", value: "1500000-99999999" },
]

interface HeroSearchProps {
  activeTab: PropertyType
  onTabChange: (t: PropertyType) => void
  query: string
  onQueryChange: (q: string) => void
  priceRange: string
  onPriceRangeChange: (p: string) => void
  onSearch: () => void
}

export function HeroSearch({
  activeTab,
  onTabChange,
  query,
  onQueryChange,
  priceRange,
  onPriceRangeChange,
  onSearch,
}: HeroSearchProps) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-buenaventura.png"
          alt="Vista de Buenaventura"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
        <h1 className="text-balance text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
          Encuentra tu próximo arriendo en Buenaventura
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-primary-foreground/85 md:text-lg">
          Casas, apartamentos y locales comerciales en alquiler
        </p>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-card p-4 text-left shadow-xl md:p-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label htmlFor="barrio" className="mb-1 block text-xs font-semibold text-muted-foreground">
                Barrio
              </label>
              <input
                id="barrio"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) onSearch()
                }}
                placeholder="Ej: Centro, Bellavista, Juan XXIII"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="md:w-56">
              <label htmlFor="precio" className="mb-1 block text-xs font-semibold text-muted-foreground">
                Rango de precio
              </label>
              <select
                id="precio"
                value={priceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {priceRanges.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={onSearch}
              className="h-[42px] gap-2 bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
