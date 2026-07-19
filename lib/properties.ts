export type PropertyType = "casa" | "apartamento" | "local" | "habitacion"

export interface Property {
  id: string
  title: string
  type: PropertyType
  price: number
  neighborhood: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  description: string
  phone: string
  userId?: string
  ownerName?: string
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  local: "Local comercial",
  habitacion: "Habitación",
}

export const initialProperties: Property[] = [
  {
    id: "1",
    title: "Casa amplia con patio en Bellavista",
    type: "casa",
    price: 1200000,
    neighborhood: "Bellavista",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "/properties/casa-bellavista.png",
    description:
      "Hermosa casa de dos pisos en el barrio Bellavista, con patio trasero, cocina integral y excelente ventilación. Cerca de transporte público y comercios.",
    phone: "573001112233",
  },
  {
    id: "2",
    title: "Apartamento luminoso en el Centro",
    type: "apartamento",
    price: 850000,
    neighborhood: "Centro",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: "/properties/apartamento-centro.png",
    description:
      "Apartamento remodelado en pleno centro de Buenaventura, ideal para parejas o profesionales. Amplios ventanales con mucha luz natural y cercanía a bancos y oficinas.",
    phone: "573002223344",
  },
  {
    id: "3",
    title: "Local comercial sobre vía principal",
    type: "local",
    price: 2000000,
    neighborhood: "Centro",
    bedrooms: 0,
    bathrooms: 1,
    area: 90,
    image: "/properties/local-comercial.png",
    description:
      "Local comercial con excelente ubicación sobre vía principal de alto flujo peatonal. Ideal para tienda, restaurante u oficina. Vitrina amplia y baño incluido.",
    phone: "573003334455",
  },
  {
    id: "4",
    title: "Habitación amoblada en Juan XXIII",
    type: "habitacion",
    price: 400000,
    neighborhood: "Juan XXIII",
    bedrooms: 1,
    bathrooms: 1,
    area: 18,
    image: "/properties/habitacion-juanxxiii.png",
    description:
      "Habitación individual amoblada con baño privado, servicios incluidos e internet. Ambiente familiar y tranquilo en el barrio Juan XXIII.",
    phone: "573004445566",
  },
  {
    id: "5",
    title: "Apartamento familiar en Alfonso López",
    type: "apartamento",
    price: 1100000,
    neighborhood: "Alfonso López",
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    image: "/properties/apartamento-alfonso.png",
    description:
      "Cómodo apartamento en conjunto residencial con vigilancia. Tres habitaciones, balcón y zona de lavandería. Excelente para familias.",
    phone: "573005556677",
  },
  {
    id: "6",
    title: "Casa acogedora en El Jardín",
    type: "casa",
    price: 950000,
    neighborhood: "El Jardín",
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    image: "/properties/casa-el-jardin.png",
    description:
      "Casa de un piso con porche y entrada independiente en el barrio El Jardín. Patio con plantas, sala amplia y cocina funcional. Sector residencial tranquilo.",
    phone: "573006667788",
  },
]

export const neighborhoods = [
  "Centro",
  "Bellavista",
  "Juan XXIII",
  "Alfonso López",
  "El Jardín",
  "La Playita",
  "El Firme",
  "Buenaventura Viejo",
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value)
}
