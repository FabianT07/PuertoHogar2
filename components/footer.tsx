import { Anchor } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Anchor className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xl font-extrabold">Puerto Hogar</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/80">
              La plataforma que conecta propietarios e interesados en viviendas y locales comerciales
              en Buenaventura, Valle del Cauca.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold">Explorar</h3>
              <ul className="mt-2 space-y-1.5 text-primary-foreground/80">
                <li>Casas en arriendo</li>
                <li>Apartamentos</li>
                <li>Locales comerciales</li>
                <li>Habitaciones</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Puerto Hogar</h3>
              <ul className="mt-2 space-y-1.5 text-primary-foreground/80">
                <li>Publicar gratis</li>
                <li>Cómo funciona</li>
                <li>Contacto</li>
                <li>Buenaventura, Valle</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-5 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Puerto Hogar · Proyecto académico · Universidad del Pacífico
        </div>
      </div>
    </footer>
  )
}
