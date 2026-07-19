"use client"

import { Bath, BedDouble, MapPin, Maximize, MessageCircle, X } from "lucide-react"
import { useEffect } from "react"
import { formatPrice, type Property, propertyTypeLabels } from "@/lib/properties"

interface PropertyModalProps {
  property: Property | null
  onClose: () => void
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (property) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [property, onClose])

  if (!property) return null

  const whatsappUrl = `https://wa.me/${property.phone}?text=${encodeURIComponent(
    `Hola, estoy interesado en el inmueble "${property.title}" publicado en Puerto Hogar.`,
  )}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={property.title}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm transition-colors hover:bg-secondary"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="h-56 w-full rounded-t-2xl object-cover"
        />

        <div className="p-5 md:p-6">
          <span className="inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
            Arriendo
          </span>
          <h2 className="mt-3 text-xl font-bold text-foreground">{property.title}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {propertyTypeLabels[property.type]} · {property.neighborhood}, Buenaventura
          </p>

          <p className="mt-4 text-3xl font-extrabold text-primary">
            {formatPrice(property.price)}
            <span className="text-base font-medium text-muted-foreground"> /mes</span>
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {property.type !== "local" && (
              <div className="rounded-lg bg-secondary p-3 text-center">
                <BedDouble className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-1 text-sm font-semibold text-foreground">{property.bedrooms}</p>
                <p className="text-xs text-muted-foreground">Habitaciones</p>
              </div>
            )}
            <div className="rounded-lg bg-secondary p-3 text-center">
              <Bath className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-1 text-sm font-semibold text-foreground">{property.bathrooms}</p>
              <p className="text-xs text-muted-foreground">Baños</p>
            </div>
            <div className="rounded-lg bg-secondary p-3 text-center">
              <Maximize className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-1 text-sm font-semibold text-foreground">{property.area}</p>
              <p className="text-xs text-muted-foreground">m² área</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{property.description}</p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
