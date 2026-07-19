"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { properties } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export type PublicProperty = {
  id: string
  title: string
  type: "casa" | "apartamento" | "local" | "habitacion"
  price: number
  neighborhood: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  description: string
  phone: string
  ownerName: string
  userId: string
}

const placeholderImages: Record<string, string> = {
  casa: "/properties/casa-el-jardin.png",
  apartamento: "/properties/apartamento-alfonso.png",
  local: "/properties/local-comercial.png",
  habitacion: "/properties/habitacion-juanxxiii.png",
}

// Límite de tamaño para la imagen subida (se guarda como data URL en la BD).
const MAX_IMAGE_BYTES = 4 * 1024 * 1024 // 4MB

async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

export async function getCurrentUser() {
  const user = await getSessionUser()
  return user ? { id: user.id, name: user.name, email: user.email } : null
}

/** Lista TODAS las viviendas: es un portal público, cualquiera puede verlas. */
export async function getProperties(): Promise<PublicProperty[]> {
  const rows = await db.select().from(properties).orderBy(desc(properties.createdAt))
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type as PublicProperty["type"],
    price: r.price,
    neighborhood: r.neighborhood,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    area: r.area,
    image: r.image,
    description: r.description,
    phone: r.phone,
    ownerName: r.ownerName,
    userId: r.userId,
  }))
}

export type NewPropertyInput = {
  title: string
  type: PublicProperty["type"]
  price: number
  neighborhood: string
  phone: string
  description?: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  /** Data URL (base64) de la imagen subida por el usuario, ej: "data:image/png;base64,...." */
  imageDataUrl?: string
}

/** Crea una vivienda asociada al usuario autenticado, con los datos e imagen reales que envió. */
export async function createProperty(input: NewPropertyInput) {
  const user = await getSessionUser()
  if (!user) return { ok: false as const, error: "Debes iniciar sesión para publicar." }

  const type = input.type
  const cleanPhone = (input.phone || "").replace(/\D/g, "") || "573000000000"

  let image = placeholderImages[type] ?? placeholderImages.casa
  if (input.imageDataUrl) {
    if (!/^data:image\/(png|jpe?g|webp|gif);base64,/.test(input.imageDataUrl)) {
      return { ok: false as const, error: "Formato de imagen no válido." }
    }
    const approxBytes = (input.imageDataUrl.length * 3) / 4
    if (approxBytes > MAX_IMAGE_BYTES) {
      return { ok: false as const, error: "La imagen es demasiado grande (máx. 4MB)." }
    }
    image = input.imageDataUrl
  }

  const defaultBedrooms = type === "local" ? 0 : type === "habitacion" ? 1 : 2

  await db.insert(properties).values({
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userId: user.id,
    ownerName: user.name || "Anunciante",
    title: input.title.trim() || `Inmueble en ${input.neighborhood}`,
    type,
    price: Number(input.price) || 0,
    neighborhood: input.neighborhood,
    bedrooms: input.bedrooms !== undefined ? Number(input.bedrooms) || 0 : defaultBedrooms,
    bathrooms: input.bathrooms !== undefined ? Number(input.bathrooms) || 1 : 1,
    area: input.area !== undefined ? Number(input.area) || 0 : 60,
    image,
    description:
      input.description?.trim() ||
      "Inmueble publicado recientemente por un propietario en Puerto Hogar. Contacta al anunciante para más información y coordinar una visita.",
    phone: cleanPhone,
  })

  revalidatePath("/")
  return { ok: true as const }
}

/** Borra una vivienda SOLO si pertenece al usuario autenticado. */
export async function deleteProperty(id: string) {
  const user = await getSessionUser()
  if (!user) return { ok: false as const, error: "No autorizado." }

  await db.delete(properties).where(and(eq(properties.id, id), eq(properties.userId, user.id)))
  revalidatePath("/")
  return { ok: true as const }
}
