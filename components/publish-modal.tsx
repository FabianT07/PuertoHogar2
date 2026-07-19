"use client"

import { ImagePlus, Loader2, Upload, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
  neighborhoods,
  type PropertyType,
  propertyTypeLabels,
} from "@/lib/properties"
import type { NewPropertyInput } from "@/app/actions/properties"
import { Button } from "@/components/ui/button"

interface PublishModalProps {
  open: boolean
  onClose: () => void
  onPublish: (p: NewPropertyInput) => Promise<{ ok: boolean; error?: string }> | void
  submitting?: boolean
}

const emptyForm = {
  title: "",
  type: "casa" as PropertyType,
  price: "",
  neighborhood: neighborhoods[0],
  phone: "",
  description: "",
  bedrooms: "2",
  bathrooms: "1",
  area: "",
}

const MAX_IMAGE_BYTES = 4 * 1024 * 1024

export function PublishModal({ open, onClose, onPublish, submitting }: PublishModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setImagePreview(null)
      setImageError(null)
      setFormError(null)
      setBusy(false)
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setImageError(null)
    if (!file) {
      setImagePreview(null)
      return
    }
    if (!file.type.startsWith("image/")) {
      setImageError("Selecciona un archivo de imagen válido.")
      e.target.value = ""
      setImagePreview(null)
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("La imagen es demasiado grande (máx. 4MB).")
      e.target.value = ""
      setImagePreview(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.onerror = () => setImageError("No se pudo leer la imagen, intenta con otra.")
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setBusy(true)
    const result = await onPublish({
      title: form.title.trim() || `${propertyTypeLabels[form.type]} en ${form.neighborhood}`,
      type: form.type,
      price: Number(form.price) || 0,
      neighborhood: form.neighborhood,
      phone: form.phone,
      description: form.description,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 1,
      area: Number(form.area) || 0,
      imageDataUrl: imagePreview ?? undefined,
    })
    setBusy(false)
    if (result && !result.ok) {
      setFormError(result.error ?? "No se pudo publicar el anuncio.")
    }
  }

  const isBusy = busy || submitting

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Publicar inmueble"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-5 md:p-6">
          <h2 className="text-xl font-bold text-primary">Publica tu inmueble gratis</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completa los datos y publica en menos de un minuto.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div>
              <label htmlFor="p-title" className="mb-1 block text-xs font-semibold text-foreground">
                Título del anuncio
              </label>
              <input
                id="p-title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ej: Casa amplia con patio"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="p-type" className="mb-1 block text-xs font-semibold text-foreground">
                  Tipo de inmueble
                </label>
                <select
                  id="p-type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as PropertyType })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  {(Object.keys(propertyTypeLabels) as PropertyType[]).map((t) => (
                    <option key={t} value={t}>
                      {propertyTypeLabels[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="p-price" className="mb-1 block text-xs font-semibold text-foreground">
                  Canon mensual (COP)
                </label>
                <input
                  id="p-price"
                  type="number"
                  required
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="900000"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="p-hood" className="mb-1 block text-xs font-semibold text-foreground">
                Barrio
              </label>
              <select
                id="p-hood"
                value={form.neighborhood}
                onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {form.type !== "local" && (
                <div>
                  <label htmlFor="p-bed" className="mb-1 block text-xs font-semibold text-foreground">
                    Habitaciones
                  </label>
                  <input
                    id="p-bed"
                    type="number"
                    min={0}
                    value={form.bedrooms}
                    onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              )}
              <div>
                <label htmlFor="p-bath" className="mb-1 block text-xs font-semibold text-foreground">
                  Baños
                </label>
                <input
                  id="p-bath"
                  type="number"
                  min={0}
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label htmlFor="p-area" className="mb-1 block text-xs font-semibold text-foreground">
                  Área (m²)
                </label>
                <input
                  id="p-area"
                  type="number"
                  min={0}
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  placeholder="60"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="p-desc" className="mb-1 block text-xs font-semibold text-foreground">
                Descripción
              </label>
              <textarea
                id="p-desc"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Cuéntale al interesado sobre el inmueble: acabados, ubicación, servicios incluidos..."
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label htmlFor="p-phone" className="mb-1 block text-xs font-semibold text-foreground">
                Teléfono de contacto
              </label>
              <input
                id="p-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Ej: 3001112233"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-semibold text-foreground">Foto del inmueble</span>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-secondary/50 px-3 py-5 text-center transition-colors hover:bg-secondary">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="h-24 w-full rounded-md object-cover"
                  />
                ) : (
                  <>
                    <ImagePlus className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="text-xs font-medium text-foreground">Subir foto</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {imageError && <p className="mt-1 text-xs font-medium text-destructive">{imageError}</p>}
              {!imagePreview && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Si no subes una foto se usará una imagen genérica del tipo de inmueble.
                </p>
              )}
            </div>

            {formError && <p className="text-sm font-medium text-destructive">{formError}</p>}

            <Button
              type="submit"
              disabled={isBusy}
              className="mt-1 w-full gap-2 bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
            >
              {isBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Upload className="h-4 w-4" aria-hidden="true" />
              )}
              Publicar Anuncio
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
