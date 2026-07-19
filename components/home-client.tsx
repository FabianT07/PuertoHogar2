"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import type { PropertyType } from "@/lib/properties"
import type { PublicProperty } from "@/app/actions/properties"
import { createProperty, deleteProperty, type NewPropertyInput } from "@/app/actions/properties"
import { useSession } from "@/lib/auth-client"
import { Navbar } from "@/components/navbar"
import { HeroSearch } from "@/components/hero-search"
import { CategoryShortcuts } from "@/components/category-shortcuts"
import { Listings } from "@/components/listings"
import { Footer } from "@/components/footer"
import { PropertyModal } from "@/components/property-modal"
import { PublishModal } from "@/components/publish-modal"
import { LoginModal } from "@/components/login-modal"
import { Toast } from "@/components/toast"

function scrollToListings() {
  document.getElementById("inmuebles")?.scrollIntoView({ behavior: "smooth" })
}

interface HomeClientProps {
  initialProperties: PublicProperty[]
}

export function HomeClient({ initialProperties }: HomeClientProps) {
  const [properties, setProperties] = useState<PublicProperty[]>(initialProperties)
  const { data: session } = useSession()
  const router = useRouter()

  // Cuando router.refresh() vuelve a ejecutar el server component (tras publicar o
  // borrar), initialProperties llega actualizado; lo reflejamos en el estado local.
  useEffect(() => {
    setProperties(initialProperties)
  }, [initialProperties])

  // hero search state
  const [heroTab, setHeroTab] = useState<PropertyType>("casa")
  const [query, setQuery] = useState("")
  const [priceRange, setPriceRange] = useState("any")

  // applied filters
  const [typeFilter, setTypeFilter] = useState<PropertyType | "todos">("todos")
  const [appliedQuery, setAppliedQuery] = useState("")
  const [appliedPrice, setAppliedPrice] = useState("any")

  // modals + toast
  const [selected, setSelected] = useState<PublicProperty | null>(null)
  const [publishOpen, setPublishOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (typeFilter !== "todos" && p.type !== typeFilter) return false
      if (appliedQuery && !p.neighborhood.toLowerCase().includes(appliedQuery.toLowerCase())) {
        return false
      }
      if (appliedPrice !== "any") {
        const [min, max] = appliedPrice.split("-").map(Number)
        if (p.price < min || p.price > max) return false
      }
      return true
    })
  }, [properties, typeFilter, appliedQuery, appliedPrice])

  function handleHeroSearch() {
    setTypeFilter(heroTab)
    setAppliedQuery(query.trim())
    setAppliedPrice(priceRange)
    scrollToListings()
  }

  function handleCategorySelect(t: PropertyType) {
    setTypeFilter((prev) => (prev === t ? "todos" : t))
    setAppliedQuery("")
    setAppliedPrice("any")
    scrollToListings()
  }

  function handleClearFilter() {
    setTypeFilter("todos")
    setAppliedQuery("")
    setAppliedPrice("any")
  }

  async function handlePublish(input: NewPropertyInput) {
    if (!session?.user) {
      setPublishOpen(false)
      setLoginOpen(true)
      return { ok: false as const, error: "Debes iniciar sesión para publicar." }
    }

    const result = await createProperty(input)
    if (!result.ok) return result

    // El anuncio ya quedó guardado en la base de datos: refrescamos para traerlo real,
    // con su id definitivo e imagen tal como quedó almacenada.
    router.refresh()
    setPublishOpen(false)
    handleClearFilter()
    setToast("¡Tu anuncio fue publicado con éxito!")
    setTimeout(scrollToListings, 100)
    return result
  }

  async function handleDelete(id: string) {
    const result = await deleteProperty(id)
    if (result.ok) {
      router.refresh()
      setToast("Anuncio eliminado.")
    } else {
      setToast(result.error ?? "No se pudo eliminar el anuncio.")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        onPublishClick={() => (session?.user ? setPublishOpen(true) : setLoginOpen(true))}
        onSearchClick={scrollToListings}
        onLoginClick={() => setLoginOpen(true)}
      />

      <HeroSearch
        activeTab={heroTab}
        onTabChange={setHeroTab}
        query={query}
        onQueryChange={setQuery}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onSearch={handleHeroSearch}
      />

      <CategoryShortcuts active={typeFilter} onSelect={handleCategorySelect} />

      <Listings
        properties={filtered}
        activeFilter={typeFilter}
        onClearFilter={handleClearFilter}
        onViewDetails={setSelected}
        currentUserId={session?.user?.id}
        onDelete={handleDelete}
      />

      <Footer />

      <PropertyModal property={selected} onClose={() => setSelected(null)} />
      <PublishModal open={publishOpen} onClose={() => setPublishOpen(false)} onPublish={handlePublish} />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onAuthed={(message) => {
          setLoginOpen(false)
          setToast(message)
        }}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </main>
  )
}
