"use client"

import { SearchX } from "lucide-react"
import type { Property, PropertyType } from "@/lib/properties"
import { propertyTypeLabels } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"

interface ListingsProps {
  properties: Property[]
  activeFilter: PropertyType | "todos"
  onClearFilter: () => void
  onViewDetails: (p: Property) => void
  currentUserId?: string | null
  onDelete?: (id: string) => void
}

export function Listings({
  properties,
  activeFilter,
  onClearFilter,
  onViewDetails,
  currentUserId,
  onDelete,
}: ListingsProps) {
  return (
    <section id="inmuebles" className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inmuebles destacados</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeFilter === "todos"
              ? "Explora todas las propiedades disponibles en Buenaventura"
              : `Mostrando: ${propertyTypeLabels[activeFilter]}`}
          </p>
        </div>
        {activeFilter !== "todos" && (
          <button
            onClick={onClearFilter}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>

      {properties.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-medium text-foreground">No encontramos inmuebles con esos criterios</p>
          <button onClick={onClearFilter} className="text-sm font-semibold text-accent hover:underline">
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onViewDetails={onViewDetails}
              isOwner={!!currentUserId && p.userId === currentUserId}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
