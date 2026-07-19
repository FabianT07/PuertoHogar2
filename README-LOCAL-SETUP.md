# Cómo correr Puerto Hogar en tu PC (Windows)

## 1. Requisitos
- Node.js LTS instalado (https://nodejs.org) — verifica con `node -v`
- pnpm instalado: abre PowerShell y ejecuta `npm install -g pnpm`

## 2. Base de datos (Neon, gratis)
1. Crea cuenta en https://neon.tech
2. Crea un proyecto nuevo
3. Copia el "Connection string" (algo como
   `postgresql://usuario:pass@ep-xxxx.aws.neon.tech/neondb?sslmode=require`)
4. En el dashboard de Neon, abre el "SQL Editor", pega el contenido del
   archivo `sql/schema.sql` (incluido en este proyecto) y ejecútalo.
   Esto crea las tablas: user, session, account, verification, properties.

## 3. Variables de entorno
Descomprime este proyecto en una carpeta, entra a ella y crea un archivo
llamado `.env.local` (en la raíz, junto a package.json) con este contenido:

```
DATABASE_URL="postgresql://usuario:pass@ep-xxxx.aws.neon.tech/neondb?sslmode=require"
BETTER_AUTH_URL="http://localhost:3000"
```

Reemplaza la primera línea con TU connection string real de Neon.

## 4. Instalar dependencias y correr

Desde PowerShell, dentro de la carpeta del proyecto:

```
pnpm install
pnpm dev
```

Abre http://localhost:3000 en tu navegador.

## 5. Probar
1. Haz clic en "Iniciar sesión" → "Regístrate gratis" → crea una cuenta.
2. Haz clic en "Publicar gratis", llena el formulario, sube una foto real
   y publica. Debe aparecer en el listado con tu foto e info reales.
3. Puedes eliminar tus propios anuncios desde el botón de basurero en la
   tarjeta (solo aparece en anuncios que publicaste tú).

## Problemas comunes
- Si `pnpm dev` da error de conexión a la base de datos, revisa que
  copiaste bien el DATABASE_URL (con `?sslmode=require` al final).
- Si el login no "recuerda" la sesión al recargar, borra las cookies del
  sitio en el navegador y vuelve a intentar.
