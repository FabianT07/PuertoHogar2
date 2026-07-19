"use client"

import { Bath, BedDouble, Maximize, MessageCircle, Trash2 } from "lucide-react"
import { formatPrice, type Property, propertyTypeLabels } from "@/lib/properties"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  property: Property
  onViewDetails: (p: Property) => void
  isOwner?: boolean
  onDelete?: (id: string) => void
}

export function PropertyCard({ property, onViewDetails, isOwner, onDelete }: PropertyCardProps) {
  const whatsappUrl = `https://wa.me/${property.phone}?text=${encodeURIComponent(
    `Hola, estoy interesado en el inmueble "${property.title}" publicado en Puerto Hogar.`,
  )}`

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          Arriendo
        </span>
        {isOwner && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (confirm("¿Eliminar este anuncio?")) onDelete(property.id)
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-destructive shadow-sm transition-colors hover:bg-destructive/10"
            aria-label="Eliminar anuncio"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-2xl font-extrabold text-primary">
          {formatPrice(property.price)}
          <span className="text-sm font-medium text-muted-foreground"> /mes</span>
        </p>
        <h3 className="mt-1 text-sm font-semibold text-foreground">
          {propertyTypeLabels[property.type]} en {property.neighborhood}, Buenaventura
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          {property.type !== "local" && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" aria-hidden="true" />
              {property.bedrooms} Hab.
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" aria-hidden="true" />
            {property.bathrooms} Baños
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" aria-hidden="true" />
            {property.area} m²
          </span>
        </div>

        <div className="mt-4 flex flex-1 items-end gap-2">
          <Button
            variant="outline"
            onClick={() => onViewDetails(property)}
            className="flex-1 border-primary text-primary hover:bg-primary/5"
          >
            Ver Detalles
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-whatsapp px-3 py-2 text-sm font-semibold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
